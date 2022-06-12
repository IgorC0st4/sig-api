const RepositorioBasico = require('./RepositorioBasico');
const executarConsulta = require('../banco/executarConsulta');

class AgendamentoServicosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'agendamento_servicos';
  }

  salvar({
    idAgendamento, idVariacao,
  }) {
    const colunas = [
      'idAgendamento',
      'idVariacao',
    ];
    const valores = [
      idAgendamento,
      idVariacao,
    ];
    return this.inserir(colunas, valores);
  }

  async buscarParaDetalhes(idAgendamento) {
    const sql = `
      SELECT V.valor, S.nome, S.duracao
      FROM (( agendamento_servicos AS A_S 
              INNER JOIN variacoes AS V ON A_S.idVariacao = V.id
            )
              INNER JOIN servicos AS S ON V.idServico = S.id
            )
      WHERE A_S.idAgendamento = ?;
    `;
    const { rows } = await executarConsulta(sql, [idAgendamento]);
    return rows;
  }
}

module.exports = new AgendamentoServicosRepositorio();
