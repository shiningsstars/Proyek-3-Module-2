'use strict';

const status = document.querySelector('#status');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');
const hasil = document.querySelector('#hasil');

function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;

    tombolCobaLagi.hidden = state !== 'error';
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function ambilData() {
    const waktu = Math.floor(Math.random() * 1001) + 500;

    await delay(waktu);

    if (Math.random() < 0.3) {
        throw new Error('Simulasi gagal memuat data.');
    }

    const response = await fetch('data/data.json');

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

function renderData(data) {
    hasil.replaceChildren();

    const index = Math.floor(Math.random() * data.length);
    const item = data[index];

    const article = document.createElement('article');
    const judul = document.createElement('h2');
    const deskripsi = document.createElement('p');

    judul.textContent = item.judul;
    deskripsi.textContent = item.deskripsi;

    article.append(judul, deskripsi);
    hasil.append(article);
}

async function muatData() {

    tombolMuat.disabled = true;
    tombolCobaLagi.disabled = true;

    hasil.replaceChildren();

    aturState('loading', 'Memuat data...');

    try {

        const data = await ambilData();

        if (data.length === 0) {
            aturState('empty', 'Data kosong.');
            return;
        }

        renderData(data);

        aturState('success', 'Data berhasil dimuat.');

    } catch (error) {

        console.error(error);

        aturState(
            'error',
            `Gagal memuat data. ${error.message} Coba lagi.`
        );

    } finally {

        tombolMuat.disabled = false;
        tombolCobaLagi.disabled = false;

    }
}

tombolMuat.addEventListener('click', muatData);

tombolCobaLagi.addEventListener('click', muatData);