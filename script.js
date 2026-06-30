// --- GAME SETUP & CONSTANTS ---
let scene, camera, renderer;
let player, playerLight;
let platforms = [];
let particles = [];
let stars;

// Physics configuration
const GRAVITY = -0.0035;       // Antigravity (low gravity feel)
const JUMP_FORCE = 0.12;       // Vertical velocity for jump
const SPEED = 0.08;            // Max speed
const LERP_FACTOR = 0.15;      // Smooth movement interpolation

let velocity = { x: 0, y: 0 };
let isGrounded = false;
let wasGrounded = false;

// Procedural generation parameters
let lastPlatformX = 0;
let lastPlatformY = -2;
const PLATFORM_COLORS = [0xff007f, 0x39ff14, 0x00f2fe, 0x7b2cbf, 0xffb703];

// Game State
let gameState = 'PLAYING'; // 'PLAYING' or 'GAMEOVER'
let score = 0;

// Input state
const keys = {
    left: false,
    right: false,
    space: false
};

// --- INITIALIZATION ---
function init() {
    const canvas = document.getElementById('game-canvas');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070714, 0.015);

    // Camera setup - 2.5D Side scrolling view
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8); // Will be updated in loop to follow player

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x070714, 1);
    renderer.shadowMap.enabled = true;

    // --- LIGHTING ---
    // Ambient light - deep space cyber color
    const ambientLight = new THREE.AmbientLight(0x0e0e30, 1.2);
    scene.add(ambientLight);

    // Directional light - creates nice depth on cubes
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // --- BACKGROUND DECORATION ---
    // Grid floor at the bottom
    const gridHelper = new THREE.GridHelper(300, 75, 0x00f2fe, 0x140c30);
    gridHelper.position.y = -8;
    gridHelper.position.z = -5;
    scene.add(gridHelper);

    // Cyber space starfield (particle system)
    createBackgroundStars();

    // --- PLAYER CREATION ---
    const playerGeom = new THREE.BoxGeometry(1, 1, 1);
    const playerMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x003e48,
        roughness: 0.1,
        metalness: 0.9
    });
    player = new THREE.Mesh(playerGeom, playerMat);
    player.position.set(0, 1, 0);
    scene.add(player);

    // Glowing point light attached to player
    playerLight = new THREE.PointLight(0x00f2fe, 2.0, 15, 0.8);
    playerLight.position.set(0, 0, 0.5);
    player.add(playerLight);

    // --- INITIAL PLATFORMS ---
    createInitialPlatforms();

    // --- EVENT LISTENERS ---
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', onWindowResize);

    // Start Game Loop
    animate();
}

// --- BACKGROUND PARTICLE SYSTEM ---
function createBackgroundStars() {
    const starCount = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 150;      // X
        positions[i + 1] = (Math.random() - 0.5) * 60;   // Y
        positions[i + 2] = (Math.random() - 0.5) * 30 - 15; // Z (behind the gameplay plane)
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0xff007f,
        size: 0.18,
        transparent: true,
        opacity: 0.6
    });
    
    stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

// --- PLATFORM CREATION & POOL ---
function createPlatform(x, y, width, height = 0.8) {
    const depth = 2.0;
    const geom = new THREE.BoxGeometry(width, height, depth);
    
    // Choose random neon color
    const color = PLATFORM_COLORS[Math.floor(Math.random() * PLATFORM_COLORS.length)];
    const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: new THREE.Color(color).multiplyScalar(0.35),
        roughness: 0.2,
        metalness: 0.8
    });
    
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y, 0);
    
    // Store size attributes in userData for fast algebraic AABB collisions
    mesh.userData = { width: width, height: height };
    
    scene.add(mesh);
    platforms.push(mesh);
    return mesh;
}

function createInitialPlatforms() {
    // Platform start (right under player)
    createPlatform(0, -2, 10);
    lastPlatformX = 5; // End of platform (0 + 10/2)
    lastPlatformY = -2;

    // Generate next 5 platforms immediately
    for (let i = 0; i < 5; i++) {
        spawnNextPlatform();
    }
}

// --- DELETED FUNCTION (Replaced with spawnNextPlatform inside script) ---

function spawnNextPlatform() {
    const gap = 3.5 + Math.random() * 5.0; // Distance between platforms
    const width = 6.0 + Math.random() * 7.0; // Length of platform
    
    const nextX = lastPlatformX + gap + width / 2;
    
    // Height variation relative to the last platform
    let nextY = lastPlatformY + (Math.random() * 3.5 - 1.75);
    nextY = Math.max(-4.0, Math.min(3.0, nextY)); // Cap Y position
    
    createPlatform(nextX, nextY, width);
    
    lastPlatformX = nextX + width / 2;
    lastPlatformY = nextY;
}

function updatePlatforms() {
    // Generate new platforms ahead of player
    if (player.position.x > lastPlatformX - 40) {
        spawnNextPlatform();
    }

    // Clean up platforms far behind player
    for (let i = platforms.length - 1; i >= 0; i--) {
        const plat = platforms[i];
        if (plat.position.x < player.position.x - 25) {
            scene.remove(plat);
            plat.geometry.dispose();
            plat.material.dispose();
            platforms.splice(i, 1);
        }
    }
}

// --- PARTICLE EFFECTS ---
function spawnJumpParticles(x, y) {
    const particleCount = 8;
    const geom = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    
    for (let i = 0; i < particleCount; i++) {
        // Cyan neon particle
        const mat = new THREE.MeshBasicMaterial({
            color: 0x00f2fe,
            transparent: true,
            opacity: 0.9
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(
            x + (Math.random() - 0.5) * 0.4, 
            y - 0.5, 
            (Math.random() - 0.5) * 0.4
        );
        mesh.userData = {
            vx: (Math.random() - 0.5) * 0.04,
            vy: -Math.random() * 0.03 - 0.01,
            life: 1.0,
            decay: 0.03 + Math.random() * 0.03
        };
        scene.add(mesh);
        particles.push(mesh);
    }
}

function spawnLandingParticles(x, y) {
    const particleCount = 10;
    const geom = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    
    for (let i = 0; i < particleCount; i++) {
        // Green neon particle
        const mat = new THREE.MeshBasicMaterial({
            color: 0x39ff14,
            transparent: true,
            opacity: 0.9
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(
            x + (Math.random() - 0.5) * 0.6, 
            y - 0.5, 
            (Math.random() - 0.5) * 0.6
        );
        mesh.userData = {
            vx: (Math.random() - 0.5) * 0.08,
            vy: Math.random() * 0.04 + 0.01,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.03
        };
        scene.add(mesh);
        particles.push(mesh);
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.position.x += p.userData.vx;
        p.position.y += p.userData.vy;
        p.userData.life -= p.userData.decay;
        p.material.opacity = p.userData.life;
        p.scale.setScalar(p.userData.life);
        
        if (p.userData.life <= 0) {
            scene.remove(p);
            p.geometry.dispose();
            p.material.dispose();
            particles.splice(i, 1);
        }
    }
}

// --- INPUT HANDLERS ---
function handleKeyDown(e) {
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') keys.right = true;
    if (e.key === ' ' || e.code === 'Space') {
        keys.space = true;
        e.preventDefault(); // Prevent page scrolling
    }
    if ((e.key === 'r' || e.key === 'R') && gameState === 'GAMEOVER') {
        resetGame();
    }
}

// --- INPUT HANDLERS UP ---
function handleKeyUp(e) {
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') keys.right = false;
    if (e.key === ' ' || e.code === 'Space') keys.space = false;
}

// --- PHYSICS & COLLISIONS ---
function updatePhysics() {
    // 1. Horizontal Movement (Lerped for smoothness)
    let targetSpeed = 0;
    if (keys.right) targetSpeed = SPEED;
    else if (keys.left) targetSpeed = -SPEED;
    
    velocity.x += (targetSpeed - velocity.x) * LERP_FACTOR;
    player.position.x += velocity.x;


    // AABB Bounds Setup for Player (Width = 1.0, Height = 1.0)
    const pw = 1.0, ph = 1.0;
    let px = player.position.x;
    let py = player.position.y;
    let pMinX = px - pw/2;
    let pMaxX = px + pw/2;
    let pMinY = py - ph/2;
    let pMaxY = py + ph/2;

    // Resolve X Collisions
    for (let platform of platforms) {
        const platX = platform.position.x;
        const platY = platform.position.y;
        const platW = platform.userData.width;
        const platH = platform.userData.height;

        const platMinX = platX - platW/2;
        const platMaxX = platX + platW/2;
        const platMinY = platY - platH/2;
        const platMaxY = platY + platH/2;

        // Collision Check
        if (pMinX < platMaxX && pMaxX > platMinX && pMinY < platMaxY && pMaxY > platMinY) {
            if (velocity.x > 0) {
                player.position.x = platMinX - pw/2;
            } else if (velocity.x < 0) {
                player.position.x = platMaxX + pw/2;
            }
            velocity.x = 0;
            // Update X Bounds
            px = player.position.x;
            pMinX = px - pw/2;
            pMaxX = px + pw/2;
        }
    }

    // 2. Vertical Movement & Gravity
    velocity.y += GRAVITY;
    player.position.y += velocity.y;

    // Update Y Bounds
    py = player.position.y;
    pMinY = py - ph/2;
    pMaxY = py + ph/2;

    isGrounded = false;

    // Resolve Y Collisions
    for (let platform of platforms) {
        const platX = platform.position.x;
        const platY = platform.position.y;
        const platW = platform.userData.width;
        const platH = platform.userData.height;

        const platMinX = platX - platW/2;
        const platMaxX = platX + platW/2;
        const platMinY = platY - platH/2;
        const platMaxY = platY + platH/2;

        if (pMinX < platMaxX && pMaxX > platMinX && pMinY < platMaxY && pMaxY > platMinY) {
            if (velocity.y < 0) {
                // Falling and landing on top of platform
                player.position.y = platMaxY + ph/2;
                velocity.y = 0;
                isGrounded = true;
            } else if (velocity.y > 0) {
                // Jumping and hitting the bottom
                player.position.y = platMinY - ph/2;
                velocity.y = 0;
            }
            // Update Y Bounds
            py = player.position.y;
            pMinY = py - ph/2;
            pMaxY = py + ph/2;
        }
    }

    // Handle Jump Action
    if (keys.space && isGrounded) {
        velocity.y = JUMP_FORCE;
        isGrounded = false;
        spawnJumpParticles(player.position.x, player.position.y);
    }

    // Trigger Landing Particles
    if (isGrounded && !wasGrounded) {
        spawnLandingParticles(player.position.x, player.position.y);
    }
    wasGrounded = isGrounded;

    // Fall below bottom camera/screen limit -> Game Over
    if (player.position.y < -8) {
        gameState = 'GAMEOVER';
        document.getElementById('game-over-screen').classList.remove('hidden');
    }
}

// --- GAME LOOP & ANIMATION ---
function animate() {
    requestAnimationFrame(animate);

    if (gameState === 'PLAYING') {
        // Update Physics & Platforms
        updatePhysics();
        updatePlatforms();
        updateParticles();

        // Update Score (Max X distance player reached)
        score = Math.max(score, Math.floor(player.position.x));
        document.getElementById('score-val').innerText = score;

        // Player Character Rotations & Visual Polish
        if (!isGrounded) {
            // Roll animation in the air
            player.rotation.z -= 0.06;
        } else {
            // Smoothly snap rotation to flat when grounded
            player.rotation.z += (0 - player.rotation.z) * 0.2;
            // Tilt slightly based on X velocity
            player.rotation.y += (velocity.x * 0.5 - player.rotation.y) * 0.1;
        }

        // Camera follow (Smooth interpolation on X & Y)
        camera.position.x += (player.position.x - camera.position.x) * 0.08;
        camera.position.y += ((player.position.y + 1.5) - camera.position.y) * 0.05;
        
        // Point camera to look slightly ahead of the player
        camera.lookAt(camera.position.x + 2.5, camera.position.y - 0.5, 0);

        // Slowly scroll the stars background to simulate depth (Parallax)
        if (stars) {
            stars.position.x = camera.position.x * 0.9;
            stars.position.y = camera.position.y * 0.9;
        }
    }

    renderer.render(scene, camera);
}

// --- RESET GAME ---
function resetGame() {
    gameState = 'PLAYING';
    score = 0;
    document.getElementById('score-val').innerText = '0';
    document.getElementById('game-over-screen').classList.add('hidden');

    // Reset Player
    player.position.set(0, 1, 0);
    player.rotation.set(0, 0, 0);
    velocity = { x: 0, y: 0 };
    isGrounded = false;
    wasGrounded = false;

    // Reset Camera
    camera.position.set(0, 0, 8);

    // Clear and dispose platforms
    for (let platform of platforms) {
        scene.remove(platform);
        platform.geometry.dispose();
        platform.material.dispose();
    }
    platforms = [];

    // Clear particles
    for (let p of particles) {
        scene.remove(p);
        p.geometry.dispose();
        p.material.dispose();
    }
    particles = [];

    // Recreate initial platforms
    createInitialPlatforms();
}

// --- WINDOW RESIZE ---
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start Game
window.onload = init;
