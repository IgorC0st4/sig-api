const RepositorioBasico = require('./RepositorioBasico');

class UsuariosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'usuarios';
  }

  salvar({
    nome, email, senha, telefone,
  }) {
    const colunas = [
      'nome',
      'email',
      'senha',
      'telefone',
    ];
    const valores = [
      nome,
      email,
      senha,
      telefone,
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new UsuariosRepositorio();
