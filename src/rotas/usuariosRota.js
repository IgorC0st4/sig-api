const router = require('express').Router();
const UsuariosModelo = require('../modelos/UsuariosModelo');
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

    const usuarioModelo = new UsuariosModelo(valoresDeBusca);
    const resultadoConsulta = await usuarioModelo.buscar(
      colunasDeInteresse,
      Object.keys(valoresDeBusca),
      ordenarPor,
      tipoDeOrdem,
      limite,
    );

    if (!resultadoConsulta) {
      throw new NaoEncontrado('Usuario');
    } else {
      const resposta = resultadoConsulta.map((usuario) => {
        const { senha, ...atributos } = usuario;
        return atributos;
      });
      res.status(200);
      res.json(resposta);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/registrar', async (req, res, next) => {
  try {
    const valoresRegistro = req.body;
    const usuarioModelo = new UsuariosModelo(valoresRegistro);

    await usuarioModelo.inserir();
    const resultadoConsulta = await usuarioModelo.buscar([], ['email']);
    console.log({ resultadoConsulta });
    const resposta = resultadoConsulta[0];
    res.status(201);
    res.json(Object.assign(resposta, { senha: '' }));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/entrar', async (req, res, next) => {
  try {
    const valoresEntrar = req.body;
    let usuarioModelo = new UsuariosModelo(valoresEntrar);

    const resultadoConsulta = await usuarioModelo.buscar([], ['email']);

    if (!resultadoConsulta) {
      throw new NaoEncontrado('Usuario');
    }

    usuarioModelo = new UsuariosModelo(resultadoConsulta[0]);
    await usuarioModelo.compararSenhas(valoresEntrar.senha);
    usuarioModelo.senha = '';
    res.status(200);
    res.json(usuarioModelo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const valoresParaAtualizar = req.body;

    const usuarioComNovosValores = new UsuariosModelo(valoresParaAtualizar);
    const resultadoConsulta = await usuarioComNovosValores.buscar([], ['id']);
    if (!resultadoConsulta) {
      throw new NaoEncontrado('Usuario');
    }

    await usuarioComNovosValores.atualizar();

    const usuarioAtualizado = Object.assign(resultadoConsulta[0], usuarioComNovosValores);

    res.status(204);
    res.json(usuarioAtualizado);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
