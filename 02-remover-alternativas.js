const fs = require('fs');
const pool = require('./database-configs/dbConfig');


function getTextIdsFromFile() {
  const fileContent = fs.readFileSync('text_ids.json', 'utf8');
  const data = JSON.parse(fileContent);
  return data.map(item => item.text_id);
}

async function queryTextsById(ids) {
  try {
    const result = await pool.query('SELECT id, body FROM texts WHERE id = ANY($1::int[])', [ids]);
    return result.rows;
  } catch (error) {
    console.error('Erro ao realizar consulta:', error.stack);
    return null;
  }
}

function removeAlternatives(body, alternatives) {
  let content = body;

  for (const alternative of alternatives) {
    // Construa uma regex para encontrar a alternativa exata no corpo do texto
    const regex = new RegExp(`${alternative.letter}\\) ${alternative.text}`, 'g');
    content = content.replace(regex, '');
  }

  return content.trim();
}

async function updateDatabase(id, updatedBody) {
  try {
    await pool.query('UPDATE texts SET body = $1 WHERE id = $2', [updatedBody, id]);
    console.log(`Alternativas da questão ${id} removidas.`);
  } catch (error) {
    console.error(`Erro ao atualizar a questão ${id}:`, error.stack);
  }
}

async function processData() {
  const fileContent = fs.readFileSync('text_ids.json', 'utf8');
  const textData = JSON.parse(fileContent);

  // Mapa para guardar os text_id's que serão usados na consulta ao banco de dados
  const textIds = textData.map(item => item.text_id);
  const data = await queryTextsById(textIds);

  for (let i = 0; i < data.length; i++) {
    // Encontre as alternativas correspondentes a este item de dados no arquivo text_ids.json
    const alternatives = textData[i].alternatives;
    const updatedBody = removeAlternatives(data[i].body, alternatives);
    await updateDatabase(data[i].id, updatedBody);
  }

  console.log('Banco de dados atualizado.');
}

processData();