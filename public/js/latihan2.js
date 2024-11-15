let currentQuestion = 1;
const totalQuestions = 4;
const correctAnswers = {
    1: "menari",
    2: "penambang",
    3: "terpercayakan",
    4: "menyepakati"
};
let userAnswers = [];
let correctCount = 0;


function checkAnswer() {
    const dropArea = document.getElementById(`drop-area-${currentQuestion}`);
    const userAnswer = dropArea.textContent.trim();
    const correctAnswer = correctAnswers[currentQuestion];
    const notification = document.getElementById('notification');

    if (userAnswer === '') {
        dropArea.style.border = '2px solid red';  // Penanda jika belum diisi
        notification.innerHTML = `<span style="color: red;">Soal ${currentQuestion} belum diisi. Silakan pilih jawaban.</span>`;
    } else {
        dropArea.style.border = '2px solid green';  // Reset border setelah diisi
        userAnswers[currentQuestion - 1] = userAnswer;
        if (userAnswer === correctAnswer) {
            correctCount++;
            notification.innerHTML = `<span class="notification-success">Jawaban benar!</span>`;
        } else {
            notification.innerHTML = `<span class="notification-wrong">Jawaban salah. Jawaban yang benar: ${correctAnswer}</span>`;
        }

        // Sembunyikan tombol submit setelah jawaban diberikan
        document.getElementById('submit-btn').style.display = 'none';

        // Lanjutkan ke soal berikutnya
        setTimeout(() => {
            notification.innerHTML = '';  // Bersihkan notifikasi
            nextQuestion();
        }, 2000);  // Delay 2 detik sebelum lanjut ke soal berikutnya
    }
}

// Tambahkan fungsi saveResults
async function saveResults(finalScore) {
    try {
        const response = await fetch('api/latihan/save-latihan2', {
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
        document.getElementById('result').innerHTML = "<h3 class='result-message'>Latihan selesai! Terima kasih.</h3> <p>Nilai Anda: ${finalScore}</p>";
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

        const response = await fetch('api/latihan/check-latihan2-status', {
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
                <p>Nilai Anda: ${data.score}</p>`;
                document.getElementById('back-to-material').style.display='block'
            ;
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


function goBackToMaterial() {
    // Ganti ini dengan link halaman materi, misalnya ke homepage atau halaman materi
    window.location.href = 'tatakataMateri.html';
}
// Fungsi drag-and-drop tetap sama
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.textContent);
    });
});

document.querySelectorAll('.drop-area').forEach((area, index) => {
    area.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    area.addEventListener('drop', (e) => {
        const data = e.dataTransfer.getData('text');
        e.target.textContent = data;
    });
});
