// tudo deve ser adaptado 🤪🫡

// npm install csv-parser fs  
const fs = require('fs');
const csv = require('csv-parser');

// Le o arquivo CSV 
fs.createReadStream('exemplo-de-planilha.csv')
  .pipe(csv())
  .on('data', (data) => {
    const disciplineInstanceId = data.id;
    const correctAnswer = data.resposta;

    // Atualizar a resposta correta no db
    const updateQuery = `UPDATE perguntas SET resposta_correta = '${correctAnswer}' WHERE id = ${disciplineInstanceId}`;

    // Remover as alternativas do campo body da pergunta
    const removeAlternativasQuery = `UPDATE perguntas SET body = REGEXP_REPLACE(body, '<br>\\s*[a-e]\\)\\t[^<]+', '') WHERE id = ${disciplineInstanceId}`;

    console.log(`Atualizado: Questão ${disciplineInstanceId} - Resposta Correta: ${correctAnswer}`);
  })
  .on('end', () => {
    console.log('Alteracao finalizada!');
  });
