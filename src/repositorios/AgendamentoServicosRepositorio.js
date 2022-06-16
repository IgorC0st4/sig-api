const RepositorioBasico = require('./RepositorioBasico');
const executarConsulta = require('../banco/executarConsulta');

class AgendamentoServicosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'agendamento_servicos';
  }

  salvar({
    idagendamento, idvariacao,
  }) {
    const colunas = [
      'idagendamento',
      'idvariacao',
    ];
    const valores = [
      parseInt(idagendamento, 10),
      parseInt(idvariacao, 10),
    ];
    return this.inserir(colunas, valores);
  }

  async buscarParaDetalhes(idagendamento) {
    const sql = `
      SELECT V.valor, S.nome, S.duracao
      FROM (( agendamento_servicos AS A_S 
              INNER JOIN variacoes AS V ON A_S.idvariacao = V.id
            )
              INNER JOIN servicos AS S ON V.idservico = S.id
            )
      WHERE A_S.idagendamento = $1;
    `;
    const { rows } = await executarConsulta(sql, [parseInt(idagendamento, 10)]);
    return rows;
  }
}

module.exports = new AgendamentoServicosRepositorio();
