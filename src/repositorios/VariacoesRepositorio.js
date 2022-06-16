const RepositorioBasico = require('./RepositorioBasico');
const executarConsulta = require('../banco/executarConsulta');

class VariacoesRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'variacoes';
  }

  salvar({
    valor, tamanho, idservico,
  }) {
    const colunas = [
      'valor',
      'tamanho',
      'idservico',
    ];
    const valores = [
      valor,
      tamanho,
      parseInt(idservico, 10),
    ];
    return this.inserir(colunas, valores);
  }

  async buscarParaAgendamento(tamanho) {
    const sql = `
    SELECT S.nome AS nomeServico, S.duracao AS duracaoServico, V.id AS idvariacao, V.valor
    FROM servicos AS S
    INNER JOIN variacoes AS V
    ON S.id = V.idservico
    WHERE V.tamanho = $1;
    `;
    const { rows } = await executarConsulta(sql, [tamanho]);
    return rows;
  }
}

module.exports = new VariacoesRepositorio();
