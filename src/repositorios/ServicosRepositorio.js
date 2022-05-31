const RepositorioBasico = require('./RepositorioBasico');

class ServicosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'servicos';
  }

  salvar({ nome, duracao }) {
    const colunas = [
      'nome',
      'duracao',
    ];
    const valores = [
      nome,
      duracao,
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new ServicosRepositorio();
