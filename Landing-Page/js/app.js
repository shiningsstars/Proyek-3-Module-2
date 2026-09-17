'use strict';

const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

const daftarProyek = document.querySelector('#daftar-proyek');
const filterProyek = document.querySelector('#filter-proyek');


const proyek = [
    {
        nama: 'Interactive Profile Card',
        kategori: 'Web',
        deskripsi: 'Website profil interaktif menggunakan HTML, CSS, dan JavaScript.'
    },
    {
        nama: 'CatatUsaha',
        kategori: 'Web',
        deskripsi: 'Landing page untuk memperkenalkan aplikasi pencatatan usaha.'
    }
];

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');

    const menuTerbuka = navMenu.classList.contains('is-open');

    menuToggle.setAttribute(
        'aria-expanded',
        String(menuTerbuka)
    );
});

function renderProyek(data) {
    daftarProyek.replaceChildren();

    data.forEach((item) => {
        const article = document.createElement('article');
        const h3 = document.createElement('h3');
        const kategori = document.createElement('p');
        const deskripsi = document.createElement('p');

        article.classList.add('project-card');
        kategori.classList.add('project-category');

        h3.textContent = item.nama;
        kategori.textContent = item.kategori;
        deskripsi.textContent = item.deskripsi;

        article.append(
            h3,
            kategori,
            deskripsi
        );

        daftarProyek.append(article);
    });
}

filterProyek.addEventListener('change', () => {
    const kategori = filterProyek.value;

    if (kategori === 'semua') {
        renderProyek(proyek);
        return;
    }

    const hasilFilter = proyek.filter(
        (item) => item.kategori === kategori
    );

    renderProyek(hasilFilter);
});

renderProyek(proyek);