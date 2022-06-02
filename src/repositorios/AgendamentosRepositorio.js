const RepositorioBasico = require('./RepositorioBasico');
const executarConsulta = require('../banco/executarConsulta');

class AgendamentosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'agendamentos';
  }

  salvar({
    orcamento, dataMarcada, idEventoCalendario, idCarro,
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
      idEventoCalendario,
      idCarro,
    ];
    return this.inserir(colunas, valores);
  }

  async buscarParaUsuario(idUsuario) {
    const sql = `
      SELECT A.*
      FROM agendamentos AS A
      INNER JOIN carros AS C ON C.id = A.idCarro
      WHERE C.idDono = ?;
    `;
    const resultadoConsulta = await executarConsulta(sql, [idUsuario]);
    return resultadoConsulta[0];
  }
}

module.exports = new AgendamentosRepositorio();
