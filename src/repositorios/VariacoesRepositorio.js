const RepositorioBasico = require('./RepositorioBasico');

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
}

module.exports = new VariacoesRepositorio();
