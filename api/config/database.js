const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect((err) => {
  if (err) throw err
  console.log("Sukses connect psql")
})

module.exports = pool;