const repositorio = require('../repositorios/CarrosRepositorio');
const CampoInvalido = require('../erros/CampoInvalido');
const SemValores = require('../erros/SemValores');

class CarrosModelo {
  constructor({
    id, tamanho, cor, placa, modelo, idDono,
  }) {
    this.id = id;
    this.tamanho = tamanho;
    this.cor = cor;
    this.placa = placa;
    this.modelo = modelo;
    this.idDono = idDono;
  }

  async inserir() {
    this.validar();
    const valoresParaSalvar = {
      tamanho: this.tamanho,
      cor: this.cor,
      placa: this.placa,
      modelo: this.modelo,
      idDono: this.idDono,
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
      'cor',
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

  excluir() {
    return repositorio.excluir(this.id);
  }

  validar() {
    const campos = ['tamanho', 'cor', 'placa', 'modelo', 'idDono'];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor === 'string' && valor.trim().length === 0) {
        throw new CampoInvalido(campo);
      }
      if (typeof valor === 'number' && valor <= 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
}

module.exports = CarrosModelo;
