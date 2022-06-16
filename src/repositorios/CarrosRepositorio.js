const RepositorioBasico = require('./RepositorioBasico');

class CarrosRepositorio extends RepositorioBasico {
  constructor() {
    super();
    this.nomeTabela = 'carros';
  }

  salvar({
    tamanho, cor, placa, modelo, iddono,
  }) {
    const colunas = [
      'tamanho',
      'cor',
      'placa',
      'modelo',
      'iddono',
    ];
    const valores = [
      tamanho,
      cor,
      placa,
      modelo,
      parseInt(iddono, 10),
    ];
    return this.inserir(colunas, valores);
  }
}

module.exports = new CarrosRepositorio();
