const RepositorioBasico = require('./RepositorioBasico');

class CarrosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'carros';
  }

  salvar({
    tamanho, cor, placa, idDono,
  }) {
    const colunas = [
      'tamanho',
      'cor',
      'placa',
      'idDono',
    ];
    const valores = [
      tamanho,
      cor,
      placa,
      idDono,
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new CarrosRepositorio();
