const RepositorioBasico = require('./RepositorioBasico');
const executarConsulta = require('../banco/executarConsulta');

class AgendamentosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'agendamentos';
  }

  salvar({
    orcamento, datamarcada, horasservico, ideventocalendario, idcarro,
  }) {
    const colunas = [
      'orcamento',
      'datamarcada',
      'horasservico',
      'ideventocalendario',
      'idcarro',
    ];
    const valores = [
      orcamento,
      datamarcada,
      horasservico,
      ideventocalendario,
      parseInt(idcarro, 10),
    ];
    return this.inserir(colunas, valores);
  }

  async buscarParaUsuario(idUsuario) {
    const sql = `
      SELECT A.*
      FROM agendamentos AS A
      INNER JOIN carros AS C ON C.id = A.idcarro
      WHERE C.iddono = $1
      ORDER BY A.datamarcada DESC;
    `;
    const { rows } = await executarConsulta(sql, [idUsuario]);
    return rows;
  }

  async buscarParaAdmin() {
    const sql = `
    SELECT A.*, U.nome AS nomeCliente
    FROM (( agendamentos AS A 
            INNER JOIN carros AS C ON A.idcarro = C.id
          )
            INNER JOIN usuarios AS U ON C.iddono = U.id
    )
    ORDER BY A.datamarcada DESC;
    `;
    const { rows } = await executarConsulta(sql);
    return rows;
  }
}

module.exports = new AgendamentosRepositorio();
