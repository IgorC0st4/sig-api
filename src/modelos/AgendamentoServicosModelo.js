const repositorio = require('../repositorios/AgendamentosRepositorio');
const CampoInvalido = require('../erros/CampoInvalido');

class AgendamentosModelo {
  constructor({
    id, idAgendamento, idVariacao,
  }) {
    this.id = id;
    this.idAgendamento = idAgendamento;
    this.idVariacao = idVariacao;
  }

  async inserir() {
    this.validar();
    const valoresParaSalvar = {
      idAgendamento: this.idAgendamento,
      idvariacao: this.idVariacao,
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

  validar() {
    const campos = ['idAgendamento', 'idVariacao'];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor !== 'number' || valor <= 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
}

module.exports = AgendamentosModelo;
