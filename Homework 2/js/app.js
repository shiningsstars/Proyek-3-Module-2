'use strict';

const status = document.querySelector('#status');
const nama = document.querySelector('#nama');
const deskripsi = document.querySelector('#deskripsi');
const email = document.querySelector('#email');
const prodi = document.querySelector('#prodi');
const kelas = document.querySelector('#kelas');

const detail = document.querySelector('#detail');
const tombolDetail = document.querySelector('#tombol-detail');
const tombolTema = document.querySelector('#ubah-tema');

const formSkill = document.querySelector('#form-skill');
const skillInput = document.querySelector('#skill');
const errorSkill = document.querySelector('#error-skill');
const daftarSkill = document.querySelector('#daftar-skill');

let keterampilan = [];

function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;
}

async function ambilProfil() {
    const response = await fetch('data/profil.json');

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

function renderKeterampilan() {
    daftarSkill.replaceChildren();

    keterampilan.forEach((skill, index) => {
        const li = document.createElement('li');
        const teks = document.createElement('span');
        const tombolHapus = document.createElement('button');

        teks.textContent = skill;

        tombolHapus.textContent = 'Hapus';
        tombolHapus.type = 'button';

        tombolHapus.addEventListener('click', () => {
            keterampilan.splice(index, 1);
            renderKeterampilan();
        });

        li.append(teks, tombolHapus);
        daftarSkill.append(li);
    });

    if (keterampilan.length === 0) {
        aturState('empty', 'Belum ada keterampilan.');
    }
}

async function muatProfil() {
    aturState('loading', 'Memuat data...');
    daftarSkill.replaceChildren();

    try {
        const data = await ambilProfil();

        if (Object.keys(data).length === 0) {
            aturState('empty', 'Data profil kosong.');
            return;
        }

        nama.textContent = data.nama;
        deskripsi.textContent = data.deskripsi;
        email.textContent = data.email;
        prodi.textContent = data.prodi;
        kelas.textContent = data.kelas;

        keterampilan = data.keterampilan;
        renderKeterampilan();

        if (keterampilan.length === 0) {
            aturState('empty', 'Belum ada keterampilan.');
        } else {
            aturState('success', 'Profil berhasil dimuat.');
        }

    } catch (error) {
        console.error(error);

        aturState(
            'error',
            `Gagal memuat data: ${error.message}. Coba lagi.`
        );
    }
}

tombolDetail.addEventListener('click', () => {
    detail.classList.toggle('is-open');

    const terbuka = detail.classList.contains('is-open');

    tombolDetail.setAttribute(
        'aria-expanded',
        String(terbuka)
    );
});

tombolTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

formSkill.addEventListener('submit', (event) => {
    event.preventDefault();

    const skillBaru = skillInput.value.trim();

    if (skillBaru === '') {
        errorSkill.textContent = 'Keterampilan tidak boleh kosong.';
        return;
    }

    errorSkill.textContent = '';

    keterampilan.push(skillBaru);
    skillInput.value = '';

    renderKeterampilan();
});

muatProfil();