const router = require('express').Router();
const { DateTime } = require('luxon');
const AgendamentosModelo = require('../modelos/AgendamentosModelo');
const AgendamentoServicosModelo = require('../modelos/AgendamentoServicosModelo');
const CarrosModelo = require('../modelos/CarrosModelo');
const UsuariosModelo = require('../modelos/UsuariosModelo');
const NaoEncontrado = require('../erros/NaoEncontrado');
const { inserirNovoEvento } = require('../google/googleCalendar');

router.get('/', async (req, res, next) => {
  try {
    const {
      colunasDeInteresse = [],
      ordenarPor = '',
      tipoDeOrdem = '',
      limite = -1,
      ...valoresDeBusca
    } = req.query;

    const agendamentoModelo = new AgendamentosModelo(valoresDeBusca);
    const resultadoConsulta = await agendamentoModelo.buscar(
      colunasDeInteresse,
      Object.keys(valoresDeBusca),
      ordenarPor,
      tipoDeOrdem,
      limite,
    );

    if (!resultadoConsulta) {
      throw new NaoEncontrado('Agendamento');
    } else {
      res.status(200);
      res.json(resultadoConsulta);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/usuario', async (req, res, next) => {
  try {
    const {
      idusuario,
    } = req.query;

    const agendamentoModelo = new AgendamentosModelo({});
    const resultadoConsulta = await agendamentoModelo.buscarParaUsuario(idusuario);
    res.status(200);
    if (!resultadoConsulta) {
      res.json([]);
    } else {
      res.json(resultadoConsulta);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/admin', async (req, res, next) => {
  try {
    const agendamentoModelo = new AgendamentosModelo({});
    const resultadoConsulta = await agendamentoModelo.buscarParaAdmin();

    res.status(200);
    if (!resultadoConsulta) {
      res.json([]);
    } else {
      res.json(resultadoConsulta);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/usuario/detalhes', async (req, res, next) => {
  try {
    const {
      idagendamento,
    } = req.query;

    const resposta = {};
    let agendamentoModelo = new AgendamentosModelo({ id: idagendamento });
    let resultadoConsulta = await agendamentoModelo.buscar([], ['id']);
    resposta.agendamento = resultadoConsulta[0];
    agendamentoModelo = new AgendamentosModelo(resultadoConsulta[0]);

    const carrosModelo = new CarrosModelo({ id: agendamentoModelo.idcarro });
    resultadoConsulta = await carrosModelo.buscar([], ['id']);
    resposta.carroSelecionado = resultadoConsulta[0];

    const agendamentoServicosModelo = new AgendamentoServicosModelo({
      idagendamento: agendamentoModelo.id,
    });
    resultadoConsulta = await agendamentoServicosModelo.buscarParaDetalhes();
    resposta.servicosSelecionados = resultadoConsulta;

    res.status(200);
    res.json(resposta);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      dataSelecionada,
      carroSelecionado,
      servicosSelecionados,
      orcamento,
      horasservico,
    } = req.body;

    let usuarioModelo = new UsuariosModelo({ id: carroSelecionado.iddono });
    const resultadoConsulta = await usuarioModelo.buscar([], ['id']);
    usuarioModelo = new UsuariosModelo(resultadoConsulta[0]);
    const tempData = new Date(dataSelecionada);
    const inicioDoEvento = DateTime
      .fromISO(tempData.toISOString())
      .startOf('day')
      .plus({ hours: 8 });
    const fimDoEvento = DateTime
      .fromJSDate(inicioDoEvento.toJSDate())
      .plus({ hours: horasservico });
    const descricao = servicosSelecionados.map((servico) => servico.nomeservico);
    descricao.push(`Orçamento: ${orcamento}`);
    descricao.push(`Horas de servico: ${horasservico}`);
    descricao.push(`Telefone: ${usuarioModelo.telefone}`);
    const resultadoInserirNovoEvento = await inserirNovoEvento(
      inicioDoEvento.toJSDate(),
      fimDoEvento.toJSDate(),
      descricao.join('\n'),
      usuarioModelo.nome,
      { nome: usuarioModelo.nome, email: usuarioModelo.email },
    );
    const eventoSalvo = resultadoInserirNovoEvento.data;
    let agendamentoModelo = new AgendamentosModelo({
      datamarcada: inicioDoEvento.toJSDate(),
      idcarro: carroSelecionado.id,
      orcamento,
      ideventocalendario: eventoSalvo.id,
      horasservico,
    });

    await agendamentoModelo.inserir();
    const resultadoConsultaAgendamento = await agendamentoModelo.buscar([], ['ideventocalendario']);
    agendamentoModelo = new AgendamentosModelo(resultadoConsultaAgendamento[0]);

    const promisses = servicosSelecionados.map((servico) => {
      const agendamentoServico = new AgendamentoServicosModelo({
        idagendamento: agendamentoModelo.id,
        idvariacao: servico.idvariacao,
      });
      return agendamentoServico.inserir();
    });

    await Promise.all(promisses);
    res.status(200);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const valoresParaAtualizar = req.body;

    const agendamentoComNovosValores = new AgendamentosModelo(valoresParaAtualizar);
    const resultadoConsulta = await agendamentoComNovosValores.buscar([], ['id']);
    if (!resultadoConsulta) {
      throw new NaoEncontrado('Agendamento');
    }

    await agendamentoComNovosValores.atualizar();

    const agendamentoAtualizado = Object.assign(resultadoConsulta[0], agendamentoComNovosValores);

    res.status(204);
    res.json(agendamentoAtualizado);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
