const repositorio = require('../repositorios/VariacoesRepositorio');
const CampoInvalido = require('../erros/CampoInvalido');
const SemValores = require('../erros/SemValores');

class VariacoesModelo {
  constructor({
    id, valor, tamanho, idservico,
  }) {
    this.id = id;
    this.valor = valor;
    this.tamanho = tamanho;
    this.idservico = idservico;
  }

  async inserir() {
    this.validar();
    const valoresParaSalvar = {
      valor: this.valor,
      tamanho: this.tamanho,
      idservico: this.idservico,
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
      'valor',
      'tamanho',
    ];

    const valoresParaAtualizar = {};

    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor === 'string' && valor.trim().length > 0) {
        valoresParaAtualizar[campo] = valor;
      }
      if (typeof valor === 'number' && valor >= 0) {
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

  buscarParaAgendamento() {
    return repositorio.buscarParaAgendamento(this.tamanho);
  }

  validar() {
    const campos = ['valor', 'tamanho', 'idservico'];
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

module.exports = VariacoesModelo;
