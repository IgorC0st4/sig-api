const conexao = require('./conexao');

const executarConsulta = (consulta = '', valores = []) => conexao.execute(consulta, valores);

module.exports = executarConsulta;
