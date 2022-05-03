const RepositorioBasico = require('./RepositorioBasico');

class ServicosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'servicos';
  }

  salvar({ nome }) {
    const colunas = [
      'nome',
    ];
    const valores = [
      nome,
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new ServicosRepositorio();
