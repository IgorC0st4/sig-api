const executarConsulta = require('../banco/executarConsulta');

class RepositorioBasico {
  async inserir(colunas = [], valores = []) {
    const valoresWildCards = [];
    valores.forEach((valor, index) => {
      valoresWildCards.push(`$${index + 1}`);
    });
    const sql = [
      'INSERT INTO',
      this.nomeTabela,
      '(',
      colunas.join(','),
      ')',
      'VALUES (',
      valoresWildCards.join(','),
      ');',
    ];
    return executarConsulta(sql.join(' '), valores);
  }

  async buscar(
    colunasDeInteresse = [],
    colunasCondicoes = [],
    valoresCondicoes = [],
    ordenarPor = '',
    tipoDeOrdem = 'ASC',
    limite = -1,
  ) {
    const sql = [
      'SELECT',
    ];
    if (colunasDeInteresse.length > 0) {
      sql.push(colunasDeInteresse.join(', '));
    } else {
      sql.push('*');
    }
    sql.push('FROM');
    sql.push(this.nomeTabela);

    if (colunasCondicoes.length > 0) {
      const condicoesWildCards = colunasCondicoes.map((coluna, index) => `${coluna}=$${index + 1}`);
      sql.push('WHERE');
      sql.push(condicoesWildCards.join(' AND '));
    }

    if (ordenarPor) {
      sql.push('ORDER BY');
      sql.push(ordenarPor);
      sql.push(tipoDeOrdem);
    }

    if (limite > -1) {
      sql.push('LIMIT');
      sql.push(limite);
    }

    sql.push(';');
    const { rows } = await executarConsulta(sql.join(' '), valoresCondicoes);
    return rows;
  }

  atualizar(colunas = [], valores = []) {
    const setWildCards = colunas.map((coluna, index) => `${coluna}=$${index + 1}`);
    const sql = [
      'UPDATE',
      this.nomeTabela,
      'SET',
      setWildCards.join(', '),
      `WHERE id = $${valores.length + 1};`,
    ];
    return executarConsulta(sql.join(' '), valores);
  }

  excluir(id) {
    const sql = [
      'DELETE FROM',
      this.nomeTabela,
      'WHERE id = $1;',
    ];

    return executarConsulta(sql.join(' '), [id]);
  }
}

module.exports = RepositorioBasico;
