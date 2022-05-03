const repositorio = require('../repositorios/ServicosRepositorio');
const CampoInvalido = require('../erros/CampoInvalido');
const SemValores = require('../erros/SemValores');

class ServicosModelo {
  constructor({
    id, nome,
  }) {
    this.id = id;
    this.nome = nome;
  }

  async inserir() {
    this.validar();
    const valoresParaSalvar = {
      nome: this.nome,
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
      'nome',
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

  validar() {
    const campos = ['nome'];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor !== 'string' || valor.trim().length === 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
}

module.exports = ServicosModelo;
