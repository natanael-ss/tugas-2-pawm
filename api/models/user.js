// models/user.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email;
    `;
    const values = [username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
  static async updateLatihan1(userId, score) {
    const query = `
      UPDATE users 
      SET latihan1 = $1, nilai1 = $2 
      WHERE id = $3 
      RETURNING *;
    `;
    const values = [true, score, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
}

static async getLatihan1Status(userId) {
    const query = `
      SELECT latihan1, nilai1
      FROM users 
      WHERE id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
}

  static async updateLatihan2(userId, score) {
    const query = `
      UPDATE users 
      SET latihan2 = $1, nilai2 = $2 
      WHERE id = $3 
      RETURNING *;
    `;
    const values = [true, score, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getLatihan2Status(userId) {
    const query = `
      SELECT latihan2, nilai2
      FROM users 
      WHERE id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async updateLatihan3(userId, score) {
    const query = `
      UPDATE users 
      SET latihan3 = $1, nilai3 = $2 
      WHERE id = $3 
      RETURNING *;
    `;
    const values = [true, score, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getLatihan3Status(userId) {
    const query = `
      SELECT latihan3, nilai3
      FROM users 
      WHERE id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = User;