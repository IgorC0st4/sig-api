const router = require('express').Router();
const ServicosModelo = require('../modelos/ServicosModelo');
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

    const servicoModelo = new ServicosModelo(valoresDeBusca);
    const resultadoConsulta = await servicoModelo.buscar(
      colunasDeInteresse,
      Object.keys(valoresDeBusca),
      ordenarPor,
      tipoDeOrdem,
      limite,
    );

    if (!resultadoConsulta) {
      throw new NaoEncontrado('Servico');
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
    const servicoModelo = new ServicosModelo(valoresRegistro);

    const resultado = await servicoModelo.inserir();
    res.status(201);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const valoresParaAtualizar = req.body;

    const servicoComNovosValores = new ServicosModelo(valoresParaAtualizar);
    const resultadoConsulta = await servicoComNovosValores.buscar([], ['id']);
    if (!resultadoConsulta) {
      throw new NaoEncontrado('Servico');
    }

    await servicoComNovosValores.atualizar();

    const servicoAtualizado = Object.assign(resultadoConsulta[0], servicoComNovosValores);

    res.status(204);
    res.json(servicoAtualizado);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
