const { Pool } = require('pg');

const conexao = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = conexao;
