# Product Requirements Document (PRD)
**Nama Projek:** Game Platformer Antigraviti 2.5D
**Versi:** 1.0.0
**Platform:** Pelayar Web (Web Browser)

## 1. Pengenalan
Projek ini bertujuan untuk membina sebuah prototaip permainan web 2.5D berasaskan pelayar yang memfokuskan kepada mekanik "antigraviti". Permainan ini akan dibina sepenuhnya menggunakan penjanaan AI (Zero-coding) dan berfungsi sebagai projek asas bagi membuktikan integrasi teknologi web moden dengan grafik 3D.

## 2. Timbunan Teknologi (Tech Stack)
* **Struktur:** HTML5
* **Gaya Visual:** CSS3
* **Logik Permainan:** JavaScript (Vanilla)
* **Enjin Render 3D:** Three.js (Diimport melalui pautan CDN secara terus dalam fail HTML)

## 3. Tema Visual & Antaramuka (UI/UX)
* **Estetik Keseluruhan:** Tema *Cyberpunk*. Latar belakang hendaklah berwarna gelap pekat yang mewakili ruang angkasa maya (*cyberspace*).
* **Elemen UI (Paparan Markah & Status):** Elemen antaramuka (seperti markah dan teks 'Game Over') mesti menggunakan rekaan *glassmorphism* (kesan kaca separuh lutsinar dengan *blur* latar belakang). Posisikan UI ini menggunakan gaya *Top Navigation with Overlapping Header Card* di bahagian atas tengah skrin.
* **Aset 3D:** Untuk memastikan tiada ralat *CORS (Cross-Origin Resource Sharing)* semasa diterbitkan:
  * Karakter Utama: Menggunakan `BoxGeometry` (Bentuk kiub).
  * Platform: Menggunakan `BoxGeometry` (Bentuk segi empat tepat memanjang).
* **Material & Pencahayaan:** Semua objek 3D mesti menggunakan warna neon yang terang (seperti Cyan, Magenta, atau Hijau Neon). Gunakan `MeshStandardMaterial` dengan gabungan `AmbientLight` dan `PointLight` untuk mencipta kesan *glowing* 3D yang moden.

## 4. Mekanik Permainan (Gameplay Mechanics)
* **Perspektif Kamera:** Kamera diletakkan dalam mod pandangan sisi (2.5D *Side-scrolling*). Kamera sentiasa statik pada paksi-Y tetapi mengekori pergerakan karakter utama pada paksi-X (ke kanan).
* **Kawalan Pemain:**
  * Kiri/Kanan: Kekunci 'A' dan 'D' (atau Anak Panah Kiri/Kanan).
  * Lompat: Kekunci 'Spacebar'.
* **Fizik Antigraviti:** 
  * Tarikan graviti (paksi-Y ke bawah) ditetapkan pada nilai yang rendah.
  * Apabila pemain melompat, karakter akan naik dengan pantas tetapi mengambil masa yang lebih lama untuk melayang turun kembali ke platform, memberikan ilusi berada di angkasa.
* **Penjanaan Persekitaran:** Platform mesti dijana secara automatik dan berterusan di hadapan karakter pada jarak dan ketinggian yang sedikit rawak untuk mencipta cabaran berterusan (*infinite runner*).

## 5. Keadaan Tamat Permainan (Game Over)
* Jika koordinat-Y karakter jatuh melepasi had bawah kamera/skrin (terjatuh dari platform), permainan ditamatkan.
* Paparkan teks "GAME OVER - Tekan 'R' untuk Mula Semula" di dalam kad *glassmorphism* di tengah skrin.
* Menekan kekunci 'R' akan menetapkan semula (*reset*) posisi karakter dan platform ke keadaan asal.

## 6. Syarat Penerbitan (Deployment)
* Permainan mesti boleh dijalankan dalam satu fail `index.html` tunggal (dengan kod CSS dan JS dibenamkan di dalam, atau diasingkan ke `style.css` dan `script.js` dalam folder yang sama).
* Tiada fail aset luaran (.png, .jpg, .gltf, .obj) dibenarkan untuk dimuat naik bagi mengelakkan isu laluan fail (file path) semasa diterbitkan.
* Projek akan di-*commit* dan di-*push* ke GitHub dan dihoskan secara percuma menggunakan **GitHub Pages**.