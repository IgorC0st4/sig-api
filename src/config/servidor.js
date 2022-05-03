const express = require('express');
const cors = require('cors');

const CampoInvalido = require('../erros/CampoInvalido');
const NaoEncontrado = require('../erros/NaoEncontrado');
const SemValores = require('../erros/SemValores');

const usuariosRota = require('../rotas/usuariosRota');

const servidor = express();

servidor.use(cors());
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

servidor.use('/usuarios', usuariosRota);

// eslint-disable-next-line no-unused-vars
servidor.use((error, req, res, next) => {
  let status = 500;
  if (error instanceof CampoInvalido
    || error instanceof SemValores) {
    status = 400;
  }
  if (error instanceof NaoEncontrado) {
    status = 404;
  }

  res.status(status);
  res.send({
    id: error.idError,
    message: error.message,
  });
});

module.exports = servidor;
