const mysql = require('mysql2/promise');

const configuracao = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const conexao = mysql.createPool(configuracao);

module.exports = conexao;
