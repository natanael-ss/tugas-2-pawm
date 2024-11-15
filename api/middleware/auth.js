// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
        // Periksa apakah header `Authorization` ada
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            // Jika tidak ada, kirim respons error
            return res.status(401).json({ error: 'Authorization header missing' });
        }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth;