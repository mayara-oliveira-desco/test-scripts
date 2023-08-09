const fs = require('fs');
const pool = require('./database-configs/dbConfig');

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
  const alternatives = [];
  let content = body;

  const regex = /<p[^>]*>(.*?)<\/p>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const parts = match[1].split('<br>');

    if (parts[0].includes('a alternativa incorreta é:')) {
      parts.shift();
      content = parts.join('<br>');
    }

    for (const part of parts) {
      const alternativeMatch = part.match(/([a-e])\) (.+)/);
      if (!alternativeMatch) continue;
      alternatives.push({
        letter: alternativeMatch[1],
        text: alternativeMatch[2].trim(),
        position: alternativeMatch[1].charCodeAt(0) - 97
      });
    }
  }

  return alternatives;
}



async function processData() {
  const fileContent = fs.readFileSync('text_ids.json', 'utf8');
  const textIdsData = JSON.parse(fileContent);

  const textIds = textIdsData.map(item => item.text_id);

  const data = await queryTextsById(textIds);

  const skippedAlternatives = [];

  data.forEach((item, index) => {
    const alternatives = extractAlternatives(item.body);

    // Verificando se há exatamente 5 alternativas
    if (alternatives.length === 5) {
      textIdsData[index].alternatives = alternatives;
    } else {
      skippedAlternatives.push({
        questionId: textIdsData[index].question_id,
        alternatives: alternatives
      });
    }
  });

  const jsonData = JSON.stringify(textIdsData, null, 2);

  fs.writeFile('text_ids.json', jsonData, (err) => {
    if (err) {
      console.error('Erro ao escrever arquivo:', err);
    } else {
      console.log('Dados salvos em text_ids.json');
    }
  });

  console.log(`Alternativas incluídas: ${textIdsData.length}`);
  console.log(`Alternativas ignoradas: ${skippedAlternatives.length} sao elas:`);
  console.log(JSON.stringify(skippedAlternatives, null, 2));
}

processData();

