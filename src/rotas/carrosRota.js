const router = require('express').Router();
const CarrosModelo = require('../modelos/CarrosModelo');
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

    const carroModelo = new CarrosModelo(valoresDeBusca);
    const resultadoConsulta = await carroModelo.buscar(
      colunasDeInteresse,
      Object.keys(valoresDeBusca),
      ordenarPor,
      tipoDeOrdem,
      limite,
    );

    if (!resultadoConsulta) {
      throw new NaoEncontrado('Carro');
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
    const carroModelo = new CarrosModelo(valoresRegistro);

    await carroModelo.inserir();
    const resultadoConsulta = await carroModelo.buscar([], ['idDono'], 'id', 'DESC', 1);
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

    const carroComNovosValores = new CarrosModelo(valoresParaAtualizar);
    const resultadoConsulta = await carroComNovosValores.buscar([], ['id']);
    if (!resultadoConsulta) {
      throw new NaoEncontrado('Carro');
    }

    await carroComNovosValores.atualizar();

    const carroAtualizado = Object.assign(resultadoConsulta[0], carroComNovosValores);

    res.status(204);
    res.json(carroAtualizado);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;