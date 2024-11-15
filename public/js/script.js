// Pilih semua header yang bisa di-toggle
const toggleHeaders = document.querySelectorAll('.toggle-header');

// Loop melalui semua header dan tambahkan event listener
toggleHeaders.forEach(header => {
    const btn = header.querySelector('.toggle-btn');
    const content = header.nextElementSibling;

    // Ketika tombol diklik, tampilkan atau sembunyikan konten
    btn.addEventListener('click', () => {
        content.classList.toggle('show');
        btn.classList.toggle('active');
    });
});


