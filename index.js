require('dotenv/config');

const criarTabelas = require('./src/banco/criarTabelas');
const servidor = require('./src/config/servidor');

const { PORTA } = process.env;

console.log('CRIANDO TABELAS');
criarTabelas()
  .then(() => {
    console.log('TABELAS CRIADAS COM SUCESSO');
    servidor.listen(PORTA, () => {
      console.log(`SERVIDOR ONLINE NA PORTA ${PORTA}`);
    });
  }).catch((error) => {
    console.error('ERRO AO INICIAR SERVIDOR');
    console.error(error);
    process.exit(1);
  });
