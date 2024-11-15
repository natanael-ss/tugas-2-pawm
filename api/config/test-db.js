// test-db.js
const pool = require('./config/database');

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connection successful!');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

testConnection();