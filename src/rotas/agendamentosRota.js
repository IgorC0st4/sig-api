const router = require('express').Router();
const AgendamentosModelo = require('../modelos/AgendamentosModelo');
const NaoEncontrado = require('../erros/NaoEncontrado');

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

router.post('/', async (req, res, next) => {
  try {
    const valoresRegistro = req.body;
    const agendamentoModelo = new AgendamentosModelo(valoresRegistro);

    await agendamentoModelo.inserir();
    const resultadoConsulta = await agendamentoModelo.buscar([], ['idCarro'], 'id', 'DESC', 1);
    const resposta = resultadoConsulta[0];
    res.status(201);
    res.json(resposta);
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
