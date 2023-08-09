const pool = require('./database-configs/dbConfig');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
    pool.end();
  } else {
    console.log('Conexão bem-sucedida. Data e hora atuais:', res.rows[0].now);
    pool.end();
  }
});

// pool.end()
//   .then(() => console.log('Desconectado do banco de dados.'))
//   .catch(err => console.error('Erro ao desconectar do banco de dados.', err));