const fs = require('fs');
const pool = require('./database-configs/dbConfig');
const corrects = require('./corrects');

async function insertAssertions(textId, questionId, alternatives, correctPosition) {
  const userId = '1321599';

  if (correctPosition < 0 || correctPosition >= alternatives.length) {
    console.error(`Erro: Posição correta inválida para question_id ${questionId}. Ignorando esta questão.`);
    return;
  }

  for (const alternative of alternatives) {
    const assertion_id = "55" + String(Math.floor(Math.random() * 90000) + 10000);
    const correct = alternative.position === correctPosition; // Determinando o valor correto com base na posição

    try {
      await pool.query(
        'INSERT INTO assertions (id, question_id, user_id, position, correct) VALUES ($1, $2, $3, $4, $5)',
        [assertion_id, questionId, userId, alternative.position, correct]
      );

      alternative.assertion_id = assertion_id;
      alternative.correct = correct;

    } catch (error) {
      console.error(`Erro ao inserir as alternativas do textId: ${textId} na tabela assertions:`, error.stack);
    }
  }
}

async function processData() {
  const textIdsContent = fs.readFileSync('text_ids.json', 'utf8');
  const textIdsData = JSON.parse(textIdsContent);

  for (let i = 0; i < textIdsData.length; i++) {
    const item = textIdsData[i];
    const correctPosition = corrects[i];
    await insertAssertions(item.text_id, item.question_id, item.alternatives, correctPosition);
  }

  fs.writeFileSync('text_ids.json', JSON.stringify(textIdsData, null, 2));

  console.log('Inserção concluída.');
  pool.end();
}

processData();
