Berikut adalah draf prompt asas yang anda boleh berikan kepada pelajar kelas anda.

Memandangkan anda menyertakan **Three.js**, permainan ini akan mempunyai elemen 3D atau dimensi 2.5D (pandangan sisi dengan objek 3D). Prompt ini telah direka untuk menghasilkan kod yang kemas, visual yang menarik, dan menggunakan bentuk geometri asas supaya pelajar tidak tersangkut dengan isu memuat naik aset luar.

Anda boleh berikan teks di dalam kotak di bawah untuk pelajar *copy* dan *paste* ke dalam Antigravity-IDE atau Gemini:

---

### 🚀 Prompt Penjanaan Game (HTML5 + CSS3 + JS + Three.js)

> **Tugasan Utama:**
> Bertindak sebagai Pakar Pembangun Permainan Web 3D. Bina prototaip permainan platformer 2.5D mudah di dalam pelayar web yang memfokuskan kepada mekanik "antigraviti".
> **Timbunan Teknologi (Tech Stack):**
> * HTML5
> * CSS3
> * JavaScript (Vanilla)
> * Three.js (Wajib import melalui pautan CDN rasmi terkini di dalam fail HTML)
> 
> 
> **Tema Visual & Estetik:**
> * Gunakan tema *cyberpunk* dan rekaan moden. Latar belakang haruslah berwarna gelap pekat menyerupai ruang angkasa maya.
> * Karakter utama dan platform hanya menggunakan geometri asas Three.js (seperti *BoxGeometry* atau *SphereGeometry*).
> * Berikan material *glowing* atau warna neon terang (contoh: cyan, magenta, atau hijau neon) menggunakan *MeshStandardMaterial* atau *MeshBasicMaterial*.
> * Masukkan pencahayaan asas (*AmbientLight* dan *PointLight*) untuk menaikkan suasana visual 3D tersebut.
> 
> 
> **Mekanik Permainan (Antigraviti):**
> * **Kamera:** Tetapkan kamera pada pandangan sisi (2.5D side-scrolling) yang sentiasa mengekori pergerakan karakter utama ke kanan.
> * **Kawalan Pergerakan:** Gunakan kekunci 'A' (Kiri) dan 'D' (Kanan) atau anak panah untuk bergerak.
> * **Fizik Antigraviti:** Apabila kekunci 'Spacebar' ditekan, karakter akan melompat. Implementasikan fizik graviti yang rendah — karakter melompat lebih tinggi dari biasa dan mengambil masa yang lebih lama untuk jatuh kembali ke platform (kesan terapung).
> * **Cabaran:** Bina beberapa platform rawak di hadapan. Jika karakter jatuh melepasi batas bawah skrin, paparkan teks "Game Over" di atas skrin dan *reset* kedudukan karakter.
> 
> 
> **Arahan Kod & Struktur:**
> * Tuliskan kod yang lengkap dan berfungsi.
> * Pastikan fail CSS menetapkan saiz kanvas kepada skrin penuh (`width: 100vw; height: 100vh; margin: 0; overflow: hidden;`).
> * Untuk mengelakkan masalah *CORS (Cross-Origin Resource Sharing)* bagi pemula, **jangan gunakan sebarang tekstur imej luaran atau model 3D luar (.gltf/.obj)**. Gunakan objek janaan kod Three.js sepenuhnya.
> 
> 

---

### 💡 Nota Tambahan Untuk Kelas Anda

* **Geometri Asas:** Penggunaan objek terbina dalam Three.js (*built-in geometry*) sangat penting untuk pelajar *beginner* kerana jika AI cuba memanggil gambar atau fail 3D dari luar, GitHub Pages selalunya akan menyekat paparan tersebut atas faktor keselamatan (*CORS policy*).
* **Paparan Skrin Penuh:** Arahan CSS di atas memastikan *game canvas* mereka nampak profesional tanpa skrol bar yang menjengkelkan.