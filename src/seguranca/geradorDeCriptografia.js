const { genSalt, hash, compare } = require('bcrypt');

const encriptar = async (senha = '') => {
  const salt = await genSalt(10);
  return hash(senha, salt);
};

const compararSenhas = (senhaLogin, senhaBanco) => compare(senhaLogin, senhaBanco);

module.exports = {
  encriptar,
  compararSenhas,
};
