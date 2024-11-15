let currentQuestion = 1;
const totalQuestions = 3; // Update if you have more questions
const correctAnswers = {
    1: "Saya akan pergi ke tujuan",  // Example answer for question 1
    2: "Budi pergi ke Bandung besok", // Example for question 2
    3: "Kami mau makan ayam goreng"  // Example for question 3
};
let userAnswers = [];
let correctCount = 0;

function checkAnswer() {
    const optionContainer = document.querySelector(`#question-${currentQuestion} .option-containerX`);
    const userAnswer = Array.from(optionContainer.children).map(option => option.textContent.trim()).join(" ");
    const correctAnswer = correctAnswers[currentQuestion];
    const notification = document.getElementById('notification');

    if (userAnswer === '') {
        notification.innerHTML = `<span style="color: red;">Soal ${currentQuestion} belum diisi. Silakan pilih jawaban.</span>`;
    } else {
        userAnswers[currentQuestion - 1] =userAnswer;
        if (userAnswer === correctAnswer) {
            correctCount++;
            notification.innerHTML = `<span class="notification-success">Jawaban benar!</span>`;

            // Sembunyikan tombol submit dan lanjutkan ke soal berikutnya setelah delay
            setTimeout(() => {
                notification.innerHTML = '';  // Bersihkan notifikasi
                nextQuestion();
            }, 2000);  // Delay 2 detik sebelum lanjut ke soal berikutnya

        } else {
            notification.innerHTML = `<span class="notification-wrong">Jawaban salah. Ayo coba lagi!</span>`;
        }
    }
}

// Tambahkan fungsi saveResults
async function saveResults(finalScore) {
    try {
        const response = await fetch('http://localhost:5000/api/latihan/save-latihan3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                score: finalScore
            })
        });
        
        if (!response.ok) {
            throw new Error('Gagal menyimpan hasil');
        }
        
        const data = await response.json();
        console.log('Hasil berhasil disimpan:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function nextQuestion() {
    // Sembunyikan soal yang sekarang
    document.getElementById(`question-${currentQuestion}`).style.display = 'none';

    // Tampilkan soal selanjutnya
    currentQuestion++;

    if (currentQuestion <= totalQuestions) {
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
        document.getElementById('submit-btn').style.display = 'inline-block';  // Tampilkan lagi tombol submit
    } else {
        const finalScore = (correctCount / totalQuestions) * 100 ;

        //simpan hasil database
        saveResults(finalScore);
        // Jika semua soal selesai
        document.getElementById('result').innerHTML = "<h3 class='result-message'>Latihan selesai! Terima kasih.</h3>";
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('back-to-material').style.display='block';
    }

}

async function checkLatihanStatus() {
    try {
        const token = localStorage.getItem('token');
        //console.log('Token:', token);
        if (!token) {
            throw new Error('Token tidak ditemukan');
        }

        const response = await fetch('http://localhost:5000/api/latihan/check-latihan3-status', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error detail:', errorData);
            throw new Error('Gagal mengambil status latihan');
        }
        
        const data = await response.json();
        
        if (data.completed) {
            document.getElementById('quiz-container').innerHTML = `
                <h3>Anda sudah mengerjakan latihan ini</h3>
                <p>Nilai Anda: ${data.score}</p>
                <button onclick="goBackToMaterial()">Kembali ke Materi</button>

            `;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Tambahkan event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        checkLatihanStatus();
    } else {
        window.location.href = '/login';
    }
});


document.querySelectorAll('.optionX').forEach(option => {
    option.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.textContent);
    });
});

document.querySelectorAll('.option-containerX').forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
        const data = e.dataTransfer.getData('text');
        const draggedElement = Array.from(container.children).find(child => child.textContent === data);
        const targetElement = e.target;

        if (targetElement.classList.contains('optionX')) {
            // Swap the elements
            [draggedElement.textContent, targetElement.textContent] = [targetElement.textContent, draggedElement.textContent];
        }
    });
});

function goBackToMaterial() {
    // Ganti ini dengan link halaman materi, misalnya ke homepage atau halaman materi
    window.location.href = 'tatakalimatMateri.html';
}