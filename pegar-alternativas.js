const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

async function queryTextsById(ids) {
  try {
    const result = await pool.query('SELECT id, body FROM texts WHERE id = ANY($1::int[])', [ids]);
    return result.rows;
  } catch (error) {
    console.error('Erro ao realizar consulta:', error.stack);
    return null;
  }
}

function extractAlternatives(body) {
  const regex = /<p>([a-e])\) (.+?)\n?<\/p>/g;
  let match;
  const alternatives = [];

  while ((match = regex.exec(body)) !== null) {
    alternatives.push({
      letter: match[1],
      text: match[2].trim(), // texto
      position: match[1].charCodeAt(0) - 97
    });
  }

  return alternatives;
}

// Função para processar os dados
async function processData() {
  const ids = [2413897, 2413898, 2413899, 2413900, 241390];
  const data = await queryTextsById(ids);

  const processedData = data.map(item => ({
    id: item.id,
    alternatives: extractAlternatives(item.body)
  }));

  console.log(JSON.stringify(processedData, null, 2));

}

processData();
