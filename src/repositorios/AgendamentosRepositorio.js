const RepositorioBasico = require('./RepositorioBasico');
const executarConsulta = require('../banco/executarConsulta');

class AgendamentosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'agendamentos';
  }

  salvar({
    orcamento, dataMarcada, horasServico, idEventoCalendario, idCarro,
  }) {
    const colunas = [
      'orcamento',
      'dataMarcada',
      'horasServico',
      'idEventoCalendario',
      'idCarro',
    ];
    const valores = [
      orcamento,
      dataMarcada,
      horasServico,
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
      WHERE C.idDono = ?
      ORDER BY A.dataMarcada DESC;
    `;
    const resultadoConsulta = await executarConsulta(sql, [idUsuario]);
    return resultadoConsulta[0];
  }

  async buscarParaAdmin() {
    const sql = `
    SELECT A.*, U.nome AS nomeCliente
    FROM (( agendamentos AS A 
            INNER JOIN carros AS C ON A.idCarro = C.id
          )
            INNER JOIN usuarios AS U ON C.idDono = U.id
    )
    ORDER BY A.dataMarcada DESC;
    `;
    const resultadoConsulta = await executarConsulta(sql);
    return resultadoConsulta[0];
  }
}

module.exports = new AgendamentosRepositorio();
