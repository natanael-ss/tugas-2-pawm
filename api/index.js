// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
let initialPath = path.join(__dirname, "..", "public");
app.use(express.static(initialPath));
// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000','http://127.0.0.1:3001','http://localhost:3001'], // ganti dengan URL frontend Anda jika berbeda
    credentials: true // Mengizinkan cookie disertakan dalam request
}));
app.use(express.json());



// Routes
app.use('/api/auth', require('./routes/auth'));

// app.get('/',(req,res) => {
//     res.json("Halo") ;
// })

app.get('/', (req,res) => {
    res.sendFile(path.join(initialPath,"/html/index.html"));
})


// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

const latihanRoutes = require('./routes/latihan');
app.use('/api/latihan', latihanRoutes);
// app.use('/api/latihan', require('./routes/auth'));

const PORT = process.env.PORT ;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

module.exports= app;

