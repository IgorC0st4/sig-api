const repositorio = require('../repositorios/AgendamentoServicosRepositorio');
const CampoInvalido = require('../erros/CampoInvalido');

class AgendamentosServicosModelo {
  constructor({
    id, idagendamento, idvariacao,
  }) {
    this.id = id;
    this.idagendamento = idagendamento;
    this.idvariacao = idvariacao;
  }

  async inserir() {
    this.validar();
    const valoresParaSalvar = {
      idagendamento: this.idagendamento,
      idvariacao: this.idvariacao,
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
    return repositorio.buscarParaDetalhes(this.idagendamento);
  }

  validar() {
    const campos = ['idagendamento', 'idvariacao'];
    campos.forEach((campo) => {
      const valor = this[campo];
      if (typeof valor !== 'number' || valor <= 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
}

module.exports = AgendamentosServicosModelo;
