const repositorio = require('../repositorios/UsuariosRepositorio');
const { compararSenhas, encriptar } = require('../seguranca/geradorDeCriptografia');
const CampoInvalido = require('../erros/CampoInvalido');
const SemValores = require('../erros/SemValores');

class UsuariosModelo {
  constructor({
    id, nome, email, senha, tipo, telefone,
  }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
    this.telefone = telefone;
  }

  async inserir() {
    this.validar();
    const senhaEncriptada = await encriptar(this.senha);
    const valoresParaSalvar = {
      nome: this.nome,
      email: this.email,
      senha: senhaEncriptada,
      telefone: this.telefone,
    };
    return repositorio.salvar(valoresParaSalvar);
  }

  buscar(
    colunasDeInteresse = [],
    colunasCondicoes = [],
    ordenarPor = '',
    tipoDeOrdem = 'ASC',
    limite = -1,
  ) {
    const valoresCondicoes = [];
    if (colunasCondicoes.length > 0) {
      colunasCondicoes.forEach((coluna) => {
        valoresCondicoes.push(this[coluna]);
      });
    }
    return repositorio.buscar(
      colunasDeInteresse,
      colunasCondicoes,
      valoresCondicoes,
      ordenarPor,
      tipoDeOrdem,
      limite,
    );
  }

  async atualizar() {
    const campos = [
      'senha',
      'telefone',
    ];

    const valoresParaAtualizar = {};

    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor === 'string' && valor.trim().length > 0) {
        valoresParaAtualizar[campo] = valor;
      }
    });

    if (Object.keys(valoresParaAtualizar).length === 0) {
      throw new SemValores();
    }

    return repositorio.atualizar(
      Object.keys(valoresParaAtualizar),
      [...Object.values(valoresParaAtualizar), this.id],
    );
  }

  async compararSenhas(senhaLogin) {
    const senhasSaoIguais = await compararSenhas(senhaLogin, this.senha);
    if (!senhasSaoIguais) {
      throw new CampoInvalido('senha');
    }
  }

  validar() {
    const campos = ['nome', 'email', 'senha', 'telefone'];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor !== 'string' || valor.trim().length === 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
}

module.exports = UsuariosModelo;
