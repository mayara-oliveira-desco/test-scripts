const fs = require('fs');
const pool = require('./database-configs/dbConfig');

const userId = '1321599'; // User ID fixo
const position = 0; // Position fixa

async function insertContents() {
  const fileContent = fs.readFileSync('text_ids.json', 'utf8');
  const data = JSON.parse(fileContent);

  for (const item of data) {
    for (const alternative of item.alternatives) {
      const textId = alternative.text_id;
      const assertionId = alternative.assertion_id;
      const id = "7" + String(Math.floor(Math.random() * 900000) + 100000);

      try {
        await pool.query(
          'INSERT INTO contents (id, user_id, text_id, assertion_id, position) VALUES ($1, $2, $3, $4, $5)',
          [id, userId, textId, assertionId, position]
        );
        console.log(`Inserido conteúdo com textId ${textId}, assertionId ${assertionId}`);
      } catch (error) {
        console.error(`Erro ao inserir conteúdo com textId ${textId}, assertionId ${assertionId}:`, error.stack);
      }
    }
  }

  console.log('Inserção concluída.');
  pool.end();
}

insertContents();
