'use strict';

const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

const daftarProyek = document.querySelector('#daftar-proyek');
const filterProyek = document.querySelector('#filter-proyek');

const faqQuestions = document.querySelectorAll('.faq-question');

const formKontak = document.querySelector('#form-kontak');
const namaKontak = document.querySelector('#nama-kontak');
const emailKontak = document.querySelector('#email-kontak');
const pesanKontak = document.querySelector('#pesan-kontak');

const errorNama = document.querySelector('#error-nama');
const errorEmail = document.querySelector('#error-email');
const errorPesan = document.querySelector('#error-pesan');
const pesanBerhasil = document.querySelector('#pesan-berhasil');

const tombolAtas = document.querySelector('#kembali-atas');
const tombolTema = document.querySelector('#ubah-tema');

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
    },
    {
        nama: 'Alamort',
        kategori: 'IoT',
        deskripsi: 'Proyek Internet of Things untuk membuat sistem yang terhubung dengan perangkat.'
    }
];

function renderProyek(data) {
    daftarProyek.replaceChildren();

    data.forEach((item) => {
        const article = document.createElement('article');
        const judul = document.createElement('h3');
        const kategori = document.createElement('p');
        const deskripsi = document.createElement('p');

        article.classList.add('project-card');
        kategori.classList.add('project-category');

        judul.textContent = item.nama;
        kategori.textContent = item.kategori;
        deskripsi.textContent = item.deskripsi;

        article.append(judul, kategori, deskripsi);
        daftarProyek.append(article);
    });
}

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');

    const menuTerbuka = navMenu.classList.contains('is-open');

    menuToggle.setAttribute(
        'aria-expanded',
        String(menuTerbuka)
    );
});

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

faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
        faqQuestions.forEach((item) => {
            const answer = item.nextElementSibling;

            answer.classList.remove('is-open');
            item.setAttribute('aria-expanded', 'false');
        });

        const answer = question.nextElementSibling;
        const sedangTerbuka = question.getAttribute('aria-expanded') === 'true';

        if (!sedangTerbuka) {
            answer.classList.add('is-open');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

formKontak.addEventListener('submit', (event) => {
    event.preventDefault();

    const nama = namaKontak.value.trim();
    const email = emailKontak.value.trim();
    const pesan = pesanKontak.value.trim();

    errorNama.textContent = '';
    errorEmail.textContent = '';
    errorPesan.textContent = '';
    pesanBerhasil.textContent = '';

    let valid = true;

    if (nama === '') {
        errorNama.textContent = 'Nama wajib diisi.';
        valid = false;
    }

    if (email === '') {
        errorEmail.textContent = 'Email wajib diisi.';
        valid = false;
    }

    if (pesan === '') {
        errorPesan.textContent = 'Pesan wajib diisi.';
        valid = false;
    }

    if (!valid) {
        return;
    }

    pesanBerhasil.textContent = 'Pesan berhasil dikirim.';
    formKontak.reset();
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        tombolAtas.classList.add('is-visible');
    } else {
        tombolAtas.classList.remove('is-visible');
    }
});

tombolAtas.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

tombolTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

renderProyek(proyek);