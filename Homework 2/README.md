# Interactive Profile Card
Project ini merupakan halaman profil interaktif menggunakan HTML, CSS, dan JavaScript. Data profil dan keterampilan awal diambil dari file `data/profile.json`.

## Struktur Folder
Pastikan folder project memiliki susunan seperti berikut:

```text
Interactive Profile Card/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── app.js
└── data/
    └── profile.json

### Cara Menjalankan
Project perlu dijalankan melalui local server karena menggunakan `fetch()` untuk mengambil data JSON. Berikut langkah-langkahnya:

1. Buka folder project di VS Code.
2. Pastikan extension **Live Server** sudah terpasang.
3. Buka file `index.html`.
4. Klik kanan pada `index.html`, lalu pilih **Open with Live Server** atau klik **Go Live** di bagian kanan bawah VS Code untuk menjalankan local server.
5. Halaman akan terbuka di browser melalui alamat seperti `http://127.0.0.1:5500/`.

Setelah halaman terbuka, project dapat digunakan dan fitur-fitur interaktif dapat dicoba.

[!] Jangan membuka `index.html` secara langsung dengan klik dua kali (`file://`), karena data dari `data/profile.json` menggunakan `fetch()` dan membutuhkan local server.