const RepositorioBasico = require('./RepositorioBasico');

class CarrosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'carros';
  }

  salvar({
    tamanho, cor, placa, modelo, idDono,
  }) {
    const colunas = [
      'tamanho',
      'cor',
      'placa',
      'modelo',
      'idDono',
    ];
    const valores = [
      tamanho,
      cor,
      placa,
      modelo,
      idDono,
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new CarrosRepositorio();
