'use strict';

const peserta = [
 { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
 { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];
const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
    const nama = calon.nama.trim();

    const validNama = nama.length >= 3;
    const validProdi = calon.prodi !== '';

    return {
        valid: validNama && validProdi,
        errorNama: validNama ? '' : 'Nama minimal 3 karakter.',
        errorProdi: validProdi ? '' : 'Program studi wajib dipilih.',
    };
}

function buatKartuPeserta(item) {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    article.classList.add('kartu');

    h2.textContent = item.nama;
    p.textContent = item.prodi;

    article.append(h2, p);

    return article;
}

function renderPeserta(data) {
 daftar.replaceChildren();

    if (data.length === 0) {
        status.textContent = 'Tidak ada peserta';
        return;
    }

    data.forEach((item) => {
        daftar.append(buatKartuPeserta(item));
    });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const calon = {
    nama: namaInput.value.trim(),
    prodi: prodiInput.value
  };

  const hasil = validasiPeserta(calon);

  namaInput.setAttribute(
    'aria-invalid',
    String(hasil.errorNama !== '')
  );

  prodiInput.setAttribute(
    'aria-invalid',
    String(hasil.errorProdi !== '')
  );

  errorNama.textContent = hasil.errorNama;
  errorProdi.textContent = hasil.errorProdi;

  if (!hasil.valid) {
    return;
  }

  peserta.push({
    id: Date.now(),
    nama: calon.nama,
    prodi: calon.prodi
  });

  form.reset();
  errorNama.textContent = '';
  errorProdi.textContent = '';
  namaInput.setAttribute('aria-invalid', 'false');
  prodiInput.setAttribute('aria-invalid', 'false');

  renderPeserta(peserta);
});

filterInput.addEventListener('change', () => {
  const nilaiFilter = filterInput.value;

  if (nilaiFilter === 'semua') {
    renderPeserta(peserta);
    return;
  }

  const hasilFilter = peserta.filter(
    (item) => item.prodi === nilaiFilter
  );

  renderPeserta(hasilFilter);
});
renderPeserta(peserta);