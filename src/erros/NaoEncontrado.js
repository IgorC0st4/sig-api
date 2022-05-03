class NaoEncontrado extends Error {
  constructor(nomeModelo) {
    super(`${nomeModelo} não foi encontrado`);
    this.name = 'NaoEncontrado';
  }
}

module.exports = NaoEncontrado;
