const RepositorioBasico = require('./RepositorioBasico');

class AgendamentosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'agendamentos';
  }

  salvar({
    orcamento, dataMarcada, idCarro,
  }) {
    const colunas = [
      'orcamento',
      'dataMarcada',
      'idEventoCalendario',
      'idCarro',
    ];
    const valores = [
      orcamento,
      dataMarcada,
      idCarro,
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new AgendamentosRepositorio();
