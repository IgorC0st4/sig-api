const repositorio = require('../repositorios/AgendamentoServicosRepositorio');
const CampoInvalido = require('../erros/CampoInvalido');

class AgendamentosServicosModelo {
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
      idVariacao: this.idVariacao,
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

  buscarParaDetalhes() {
    return repositorio.buscarParaDetalhes(this.idAgendamento);
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

module.exports = AgendamentosServicosModelo;
