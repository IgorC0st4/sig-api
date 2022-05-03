const RepositorioBasico = require('./RepositorioBasico');

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
}

module.exports = new AgendamentoServicosRepositorio();
