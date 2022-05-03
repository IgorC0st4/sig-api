const RepositorioBasico = require('./RepositorioBasico');

class UsuariosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'usuarios';
  }

  salvar({ email, senha, telefone }) {
    const colunas = [
      'email',
      'senha',
      'telefone',
    ];
    const valores = [
      email,
      senha,
      telefone,
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new UsuariosRepositorio();
