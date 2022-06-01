const RepositorioBasico = require('./RepositorioBasico');
const executarConsulta = require('../banco/executarConsulta');

class VariacoesRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'variacoes';
  }

  salvar({
    valor, tamanho, idServico,
  }) {
    const colunas = [
      'valor',
      'tamanho',
      'idServico',
    ];
    const valores = [
      valor,
      tamanho,
      idServico,
    ];
    return this.inserir(colunas, valores);
  }

  async buscarParaAgendamento(tamanho) {
    const sql = `
    SELECT S.nome AS nomeServico, S.duracao AS duracaoServico, V.id AS idVariacao, V.valor
    FROM servicos AS S
    INNER JOIN variacoes AS V
    ON S.id = V.idServico
    WHERE V.tamanho = ?;
    `;
    const resultado = await executarConsulta(sql, [tamanho]);
    return resultado[0];
  }
}

module.exports = new VariacoesRepositorio();
