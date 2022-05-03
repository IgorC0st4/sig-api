const conexao = require('./conexao');

const executarConsulta = (consulta = '', valores = []) => {
  console.log({ consulta, valores });
  return conexao.execute(consulta, valores);
};

module.exports = executarConsulta;
