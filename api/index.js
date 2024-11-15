// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
let initialPath = path.join(__dirname, "..", "public");
app.use(express.static(initialPath));
// Middleware
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://127.0.0.1:3000','http://127.0.0.1:3001','http://localhost:3001'], // ganti dengan URL frontend Anda jika berbeda
//     credentials: true // Mengizinkan cookie disertakan dalam request
// }));

app.use(cors());
app.use(express.json());


app.get('/', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/index.html"));
})
//tambahan
app.get('/landing.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/landing.html"));
})

app.get('/homepage.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/homepage.html"));
})

app.get('/index.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/index.html"));
})

app.get('/ejaanMateri.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/ejaanMateri.html"));
})

app.get('/tatakataMateri.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/tatakataMateri.html"));
})

app.get('/tatakalimatMateri.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/tatakalimatMateri.html"));
})

app.get('/latihan_Ejaan.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/latihan_Ejaan.html"));
})

app.get('/latihan_TataKata.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/latihan_TataKata.html"));
})

app.get('/latihan_TataKalimat.html', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/latihan_TataKalimat.html"));
})

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));

const latihanRoutes = require('./routes/latihan');
app.use('/api/latihan', latihanRoutes);

const PORT = process.env.PORT ;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports= app;

