const executarConsulta = require('./executarConsulta');

const criarTabelaUsuarios = () => {
  const sql = `CREATE TABLE IF NOT EXISTS usuarios (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        tipo ENUM('CLIENTE','ADMIN') DEFAULT 'CLIENTE' NOT NULL,
        telefone VARCHAR(12) NOT NULL
    );`;

  return executarConsulta(sql);
};

const criarTabelaCarros = () => {
  const sql = `CREATE TABLE IF NOT EXISTS carros (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        tamanho ENUM('PEQUENO','MEDIO', 'GRANDE') NOT NULL,
        cor VARCHAR(30) NOT NULL,
        placa VARCHAR(30) NOT NULL UNIQUE,
        modelo VARCHAR(255) NOT NULL,
        idDono INT NOT NULL,
        FOREIGN KEY (idDono) 
            REFERENCES usuarios (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    );`;

  return executarConsulta(sql);
};

const criarTabelaServicos = () => {
  const sql = `CREATE TABLE IF NOT EXISTS servicos (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        nome VARCHAR(50) NOT NULL,
        duracao INT NOT NULL
    );`;

  return executarConsulta(sql);
};

const criarTabelaVariacoes = () => {
  const sql = `CREATE TABLE IF NOT EXISTS variacoes (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        valor FLOAT NOT NULL,
        tamanho ENUM('PEQUENO','MEDIO', 'GRANDE') NOT NULL,
        idServico INT NOT NULL,
        FOREIGN KEY (idServico) 
            REFERENCES servicos (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    );`;

  return executarConsulta(sql);
};

const criarTabelaAgendamentos = () => {
  const sql = `CREATE TABLE IF NOT EXISTS agendamentos (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        orcamento FLOAT NOT NULL,
        dataMarcada DATETIME NOT NULL,
        situacao ENUM('MARCADO','FINALIZADO', 'CANCELADO') DEFAULT 'MARCADO' NOT NULL,
        idEventoCalendario VARCHAR(255) NOT NULL UNIQUE,
        idCarro INT NOT NULL,
        FOREIGN KEY (idCarro) 
            REFERENCES carros (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    );`;

  return executarConsulta(sql);
};

const criarTabelaAgendamentoServicos = () => {
  const sql = `CREATE TABLE IF NOT EXISTS agendamento_servicos (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        idAgendamento INT NOT NULL,
        idVariacao INT NOT NULL,
        FOREIGN KEY (idAgendamento) 
            REFERENCES agendamentos (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
        FOREIGN KEY (idVariacao) 
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
