const router = require('express').Router();
const VariacoesModelo = require('../modelos/VariacoesModelo');
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

    const variacaoModelo = new VariacoesModelo(valoresDeBusca);
    const resultadoConsulta = await variacaoModelo.buscar(
      colunasDeInteresse,
      Object.keys(valoresDeBusca),
      ordenarPor,
      tipoDeOrdem,
      limite,
    );

    if (!resultadoConsulta) {
      throw new NaoEncontrado('Variacao');
    } else {
      res.status(200);
      res.json(resultadoConsulta);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/agendamento', async (req, res, next) => {
  try {
    const { tamanho } = req.query;
    const variacaoModelo = new VariacoesModelo({ tamanho });
    const resultadoConsulta = await variacaoModelo.buscarParaAgendamento();
    console.log({ resultadoConsulta });
    res.status(200);
    res.json(resultadoConsulta);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const valoresRegistro = req.body;
    const variacaoModelo = new VariacoesModelo(valoresRegistro);

    await variacaoModelo.inserir();
    const resultadoConsulta = await variacaoModelo.buscar([], ['idServico'], 'id', 'DESC', 1);
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

    const variacaoComNovosValores = new VariacoesModelo(valoresParaAtualizar);
    const resultadoConsulta = await variacaoComNovosValores.buscar([], ['id']);
    if (!resultadoConsulta) {
      throw new NaoEncontrado('Variacao');
    }

    await variacaoComNovosValores.atualizar();

    const variacaoAtualizado = Object.assign(resultadoConsulta[0], variacaoComNovosValores);

    res.status(204);
    res.json(variacaoAtualizado);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
