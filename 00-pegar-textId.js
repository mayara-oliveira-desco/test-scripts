const fs = require('fs');
const pool = require('./database-configs/dbConfig');
const questionIds = require('./questionIds');

async function updateQuestions() {
  for (const questionId of questionIds) {
    try {
      await pool.query(
        'UPDATE questions SET alternatives = $1, mode = $2 WHERE id = $3',
        [5, 'objective', questionId]
      );
      console.log(`Atualizado questão com ID ${questionId}`);
    } catch (error) {
      console.error(`Erro ao atualizar a questão com ID ${questionId}:`, error.stack);
    }
  }

  pool.end();
}

async function queryTextsById(questionIds) {
  try {
    const result = await pool.query('SELECT question_id, text_id FROM contents WHERE question_id = ANY($1::int[])', [questionIds]);
    return result.rows;
  } catch (error) {
    console.error('Erro ao realizar consulta:', error.stack);
    return null;
  }
}

async function processData() {
  const data = await queryTextsById(questionIds);

  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile('text_ids.json', jsonData, (err) => {
    if (err) {
      console.error('Erro ao escrever arquivo:', err);
    } else {
      console.log('Dados salvos em text_ids.json');
    }
  });

  console.log(jsonData);
}

updateQuestions();
processData();