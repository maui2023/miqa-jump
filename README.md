# 🚀 Miqa Jump - Game Platformer Antigraviti 2.5D

Sebuah prototaip permainan platformer 2.5D berasaskan pelayar web (*web browser*) dengan mekanik fizik **antigraviti** (graviti rendah) yang dibina menggunakan enjin render 3D **Three.js** dan JavaScript Vanilla. Projek ini direka bentuk supaya mudah dihoskan dan dimainkan tanpa memerlukan sebarang muat turun aset luaran bagi mengelakkan isu CORS.

---

## 🎮 Mekanik Permainan

* **Pandangan Kamera 2.5D:** Kamera diposisikan dari sudut pandangan sisi (*side-scrolling*). Kamera akan mengekori pergerakan karakter utama secara dinamik pada paksi-X (ke kanan) tetapi kekal statik pada paksi-Y.
* **Fizik Antigraviti:** Karakter melompat dengan pantas tetapi melayang turun secara perlahan-lahan ke bawah (memberikan ilusi terapung di angkasa lepas).
* **Penjanaan Platform Infiniti (*Infinite Runner*):** Platform baru akan dijana secara rawak (jarak dan ketinggian) di hadapan laluan karakter untuk cabaran yang berterusan.
* **Keadaan Tamat Permainan (*Game Over*):** Jika karakter jatuh melepasi batas bawah skrin, permainan akan tamat dan pemain boleh memulakannya semula secara serta-merta.

---

## 🎹 Kawalan Permainan

| Kekunci | Tindakan |
| :--- | :--- |
| **A** / **Anak Panah Kiri** | Bergerak ke Kiri |
| **D** / **Anak Panah Kanan** | Bergerak ke Kanan |
| **Spacebar** | Melompat (Fizik Terapung) |
| **R** | Mula Semula (Semasa Game Over) |

---

## 🎨 Tema Visual & UI/UX

* **Estetik Cyberpunk:** Latar belakang ruang angkasa maya (*cyberspace*) yang gelap gelita dengan pencahayaan neon terang.
* **Glow & Neon:** Karakter utama (kiub neon) dan platform menggunakan material `MeshStandardMaterial` dengan warna neon terang (Cyan, Magenta, Hijau Neon) yang disinari oleh `AmbientLight` dan `PointLight`.
* **Antaramuka Glassmorphism:** Paparan markah dan skrin *Game Over* dibina dengan kesan kaca separuh lutsinar (*backdrop-filter blur*) menggunakan rekaan *Top Navigation with Overlapping Header Card*.

---

## 🛠️ Timbunan Teknologi (Tech Stack)

* **Struktur Halaman:** HTML5
* **Gaya & Layout:** CSS3 (Vanilla)
* **Logik Permainan:** JavaScript (ES6+ Vanilla)
* **Grafik 3D:** Three.js (diimport secara terus melalui CDN)

---

## 📂 Struktur Projek

Cadangan struktur fail adalah seperti berikut untuk memastikan kesederhanaan dan kemudahan penerbitan:

```text
miqa-jump/
├── index.html       # Struktur HTML dan kemasukan skrip Three.js
├── style.css        # Gaya rekaan cyberpunk & antaramuka glassmorphism
├── script.js        # Logik permainan, setup Three.js, dan fizik antigraviti
├── PRD.md           # Product Requirements Document
├── idea.md          # Draf idea asal projek
└── README.md        # Fail dokumentasi ini
```

---

## 🚀 Cara Menjalankan Projek

1. Klon repositori ini atau muat turun fail projek.
2. Buka fail `index.html` menggunakan mana-mana pelayar web moden (Chrome, Edge, Firefox, Safari).
3. Anda juga boleh menggunakan sambungan *Live Server* di VS Code atau Antigravity-IDE untuk pembangunan yang lebih lancar.

---

## 🌐 Penerbitan (Deployment)

Projek ini direka tanpa menggunakan aset imej atau model 3D luaran (.gltf/.obj) bagi mengelakkan ralat CORS. Oleh itu, ia boleh diterbitkan terus ke **GitHub Pages** dengan mudah:
1. *Push* kod anda ke repositori GitHub.
2. Pergi ke **Settings** > **Pages** di repositori tersebut.
3. Pilih *branch* `main` dan tekan **Save**.
