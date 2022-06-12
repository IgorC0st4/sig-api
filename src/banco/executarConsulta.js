const conexao = require('./conexao');

const executarConsulta = (sql = '', valores = []) => {
  console.log({ sql, valores });
  return conexao.query(sql, valores);
};

module.exports = executarConsulta;
