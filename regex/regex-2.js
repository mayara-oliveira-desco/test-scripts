function extractAlternatives(body) {
  console.log('Corpo do texto:', body);
  const regex = /([a-e])\) (.*?)<br>/g;
  const alternatives = [];

  let match;
  while ((match = regex.exec(body)) !== null) {
    alternatives.push({
      letter: match[1],
      text: match[2].trim(),
      position: match[1].charCodeAt(0) - 97
    });
    console.log('Correspondência encontrada:', match);
  }

  return alternatives;
}