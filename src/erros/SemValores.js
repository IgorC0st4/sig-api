class SemValores extends Error {
  constructor() {
    super('Não foram fornecidos dados para atualizar');
    this.name = 'SemValores';
  }
}

module.exports = SemValores;
