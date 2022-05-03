class CampoInvalido extends Error {
  constructor(campo) {
    super(`O campo ${campo} está inválido`);
    this.name = 'CampoInvalido';
  }
}

module.exports = CampoInvalido;
