const repositorio = require('../repositorios/AgendamentosRepositorio');
const CampoInvalido = require('../erros/CampoInvalido');
const SemValores = require('../erros/SemValores');

class AgendamentosModelo {
  constructor({
    id, orcamento, datamarcada, horasservico,
    ideventocalendario, situacao, idcarro,
  }) {
    this.id = id;
    this.orcamento = orcamento;
    this.datamarcada = datamarcada;
    this.horasservico = horasservico;
    this.ideventocalendario = ideventocalendario;
    this.situacao = situacao;
    this.idcarro = idcarro;
  }

  async inserir() {
    this.validar();
    const valoresParaSalvar = {
      orcamento: this.orcamento,
      datamarcada: this.datamarcada,
      horasservico: this.horasservico,
      ideventocalendario: this.ideventocalendario,
      idcarro: this.idcarro,
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

  buscarParaUsuario(idUsuario) {
    return repositorio.buscarParaUsuario(idUsuario);
  }

  buscarParaAdmin() {
    return repositorio.buscarParaAdmin();
  }

  async atualizar() {
    const campos = [
      'orcamento',
      'datamarcada',
      'situacao',
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
      if (typeof valor === 'object' && valor) {
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
    const campos = ['orcamento', 'horasservico', 'datamarcada', 'idcarro'];
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

module.exports = AgendamentosModelo;
