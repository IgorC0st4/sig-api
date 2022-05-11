const express = require('express');
const cors = require('cors');

const CampoInvalido = require('../erros/CampoInvalido');
const NaoEncontrado = require('../erros/NaoEncontrado');
const SemValores = require('../erros/SemValores');

const agendamentosRota = require('../rotas/agendamentosRota');
const carrosRota = require('../rotas/carrosRota');
const servicosRota = require('../rotas/servicosRota');
const usuariosRota = require('../rotas/usuariosRota');
const variacoesRota = require('../rotas/variacoesRota');

const servidor = express();

servidor.use(cors());
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

servidor.use('/agendamentos', agendamentosRota);
servidor.use('/carros', carrosRota);
servidor.use('/servicos', servicosRota);
servidor.use('/usuarios', usuariosRota);
servidor.use('/variacoes', variacoesRota);

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
