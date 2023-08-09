const fs = require('fs');
const idsHygraph = require('./idsHygraph');

const objects = idsHygraph.map((id) => ({
  id: id,
  type: "PENSAR_RESPONDER_OBJETIVO"
}));

const jsonContent = JSON.stringify(objects, null, 2);

fs.writeFile('output.json', jsonContent, (err) => {
  if (err) {
    console.error('Erro ao escrever arquivo:', err);
  } else {
    console.log('Arquivo output.json criado com sucesso.');
  }
});