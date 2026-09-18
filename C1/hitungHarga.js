function hitungSubtotal(harga, jumlah) {
    if (harga <= 0 || jumlah <= 0) {
        return 0;
    }

    return harga * jumlah;
}

function hitungDiskon(subtotal, anggota) {
    if (subtotal <= 0) {
        return 0;
    }

    let diskon = 0;

    if (subtotal >= 200000) {
        diskon = 20;
    } else if (subtotal >= 100000) {
        diskon = 10;
    }

    if (anggota === true) {
        diskon += 5;
    }

    if (diskon > 25) {
        diskon = 25;
    }

    return diskon;
}

function hitungTotal(subtotal, diskon) {
    const potongan = subtotal * diskon / 100;
    return subtotal - potongan;
}

function hitungHarga(harga, jumlah, anggota) {
    if (harga <= 0 || jumlah <= 0) {
        return {
            valid: false,
            pesan: 'Harga dan jumlah harus lebih dari 0.'
        };
    }

    const subtotal = hitungSubtotal(harga, jumlah);
    const diskon = hitungDiskon(subtotal, anggota);
    const total = hitungTotal(subtotal, diskon);

    return {
        valid: true,
        harga: harga,
        jumlah: jumlah,
        anggota: anggota,
        subtotal: subtotal,
        diskon: diskon,
        total: total
    };
}

console.log(hitungHarga(50000, 1, false));
console.log(hitungHarga(100000, 1, false));
console.log(hitungHarga(200000, 1, false));
console.log(hitungHarga(100000, 2, true));
console.log(hitungHarga(0, 2, false));