const executarConsulta = require('./executarConsulta');

const criarTabelaUsuarios = () => {
  const sql = `CREATE TABLE IF NOT EXISTS usuarios (
        id  SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        tipo VARCHAR(255) DEFAULT 'CLIENTE' NOT NULL,
        telefone VARCHAR(12) NOT NULL
    );`;

  return executarConsulta(sql);
};

const criarTabelaCarros = () => {
  const sql = `CREATE TABLE IF NOT EXISTS carros (
        id  SERIAL PRIMARY KEY,
        tamanho VARCHAR(255) NOT NULL,
        cor VARCHAR(30) NOT NULL,
        placa VARCHAR(30) NOT NULL UNIQUE,
        modelo VARCHAR(255) NOT NULL,
        iddono INT NOT NULL,
        FOREIGN KEY (iddono) 
            REFERENCES usuarios (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    );`;

  return executarConsulta(sql);
};

const criarTabelaServicos = () => {
  const sql = `CREATE TABLE IF NOT EXISTS servicos (
        id  SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        duracao INT NOT NULL
    );`;

  return executarConsulta(sql);
};

const criarTabelaVariacoes = () => {
  const sql = `CREATE TABLE IF NOT EXISTS variacoes (
        id  SERIAL PRIMARY KEY,
        valor FLOAT NOT NULL,
        tamanho VARCHAR(255) NOT NULL,
        idservico INT NOT NULL,
        FOREIGN KEY (idservico) 
            REFERENCES servicos (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    );`;

  return executarConsulta(sql);
};

const criarTabelaAgendamentos = () => {
  const sql = `CREATE TABLE IF NOT EXISTS agendamentos (
        id  SERIAL PRIMARY KEY,
        orcamento FLOAT NOT NULL,
        datamarcada DATE NOT NULL,
        situacao VARCHAR(255) DEFAULT 'MARCADO' NOT NULL,
        horasservico INT NOT NULL,
        ideventocalendario VARCHAR(255) NOT NULL UNIQUE,
        idcarro INT NOT NULL,
        FOREIGN KEY (idcarro) 
            REFERENCES carros (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    );`;

  return executarConsulta(sql);
};

const criarTabelaAgendamentoServicos = () => {
  const sql = `CREATE TABLE IF NOT EXISTS agendamento_servicos (
        id  SERIAL PRIMARY KEY,
        idagendamento INT NOT NULL,
        idvariacao INT NOT NULL,
        FOREIGN KEY (idagendamento) 
            REFERENCES agendamentos (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
        FOREIGN KEY (idvariacao) 
            REFERENCES variacoes (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    );`;

  return executarConsulta(sql);
};

const criarTabelas = async () => {
  await criarTabelaUsuarios();
  await criarTabelaCarros();
  await criarTabelaServicos();
  await criarTabelaVariacoes();
  await criarTabelaAgendamentos();
  await criarTabelaAgendamentoServicos();
};

module.exports = criarTabelas;
