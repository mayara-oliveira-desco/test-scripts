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

function removeAlternatives(body) {
  const regex = /<p>([a-e])\) (.+?)\n?<\/p>/g;
  return body.replace(regex, '').trim();
}

async function updateDatabase(id, body) {
  try {
    await pool.query('UPDATE texts SET body = $1 WHERE id = $2', [body, id]);
  } catch (error) {
    console.error('Erro ao atualizar o banco de dados:', error.stack);
  }
}

async function processData() {
  const ids = [2413897];
  const data = await queryTextsById(ids);

  for (const item of data) {
    const updatedBody = removeAlternatives(item.body);
    await updateDatabase(item.id, updatedBody);
  }

  console.log('Banco de dados atualizado.');
}

processData();