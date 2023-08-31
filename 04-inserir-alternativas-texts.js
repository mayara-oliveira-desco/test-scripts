const fs = require('fs');
const pool = require('./database-configs/dbConfig');

async function insertTexts(textIdsData) {
  const userId = '1321599'; // User ID fixo (esse é o meu :) )

  for (const item of textIdsData) {
    const questionId = item.question_id;
    const alternatives = item.alternatives;

    for (const alternative of alternatives) {
      const text_id = "33" + String(Math.floor(Math.random() * 90000) + 10000);
      const body = alternative.text;

      try {
        await pool.query(
          'INSERT INTO texts (id, user_id, body) VALUES ($1, $2, $3)',
          [text_id, userId, body]
        );

        alternative.text_id = text_id;

        console.log(`Inserido texto para a questão ${questionId}, alternativa ${alternative.letter}`);
      } catch (error) {
        console.error(`Erro ao inserir o texto para a questão ${questionId}, alternativa ${alternative.letter}:`, error.stack);
      }
    }
  }

  console.log('Inserção concluída.');
}

async function processData() {
  const fileContent = fs.readFileSync('text_ids.json', 'utf8');
  const textIdsData = JSON.parse(fileContent);

  await insertTexts(textIdsData);

  pool.end();

  fs.writeFile('text_ids.json', JSON.stringify(textIdsData, null, 2), (err) => {
    if (err) {
      console.error('Erro ao atualizar arquivo:', err);
    } else {
      console.log('Arquivo text_ids.json atualizado com sucesso.');
    }
  });
}

processData();
