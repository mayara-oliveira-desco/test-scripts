// Exemplo de dados iniciais:
// Exemplo de como a alternativa vai estar no body da questão:
let contents = [
  {
    id: 1,
    body: '<p style="text-align: justify">A seguir, leia um trecho do texto da nossa aula:</p>...<p style="text-align: justify">a) 4, 1, 3, 2, 5. <br>b) 3, 1, 5, 2, 4. <br>c) 4, 5, 3, 2, 1. <br>d) 5, 2, 1, 3, 4. <br>e) 1, 3, 5, 2, 4.</p>...',
    // ... 
  },
  // ... 
];

// Exemplo de uma assertion 
let assertions = [
  {
    id: 2477673,
    question_id: 508637,
    created_at: newDate(),
    updated_at: newDate(),
    position: 4,
    correct: false,
  },
  // ... 
];

// Exemplo de um text
let texts = [
  {
    id: 6410252,
    created_at: newDate(),
    updated_at: newDate(),
    source: {},
    body: '<p>​Permite a manipulação em estruturas diferentes e com metodologias avançadas​<br></p>',
  },
  // ...
];

// Da pra identificar as alternativas c regex
function extractAlternatives(body) {
  const regex = /<p style="text-align: justify">([a-e])\) (.+?) <br><\/p>/g;
  let match;
  const alternatives = [];

  while ((match = regex.exec(body)) !== null) {
    alternatives.push({
      letter: match[1], //letra
      text: match[2], //texto
    });
  }

  return alternatives;
}

// criar novas entradas nas tabelas assertions e texts
function processQuestion(content) {
  const alternatives = extractAlternatives(content.body);

  alternatives.forEach((alternative, index) => {
    // nova entrada na tabela assertions
    const newAssertion = {
      id: Math.floor(Math.random() * 1000000), // gerar ID aleatório
      question_id: content.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      position: index + 1,
      correct: false,
    };
    assertions.push(newAssertion);

    // nova entrada na tabela texts
    const newText = {
      id: Math.floor(Math.random() * 1000000), // gerar ID aleatório
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: {},
      body: `<p>${alternative.text}</p>`,
    };
    texts.push(newText);
  });

  // Remover as alternativas do body da questão
  content.body = content.body.replace(/<p style="text-align: justify">[a-e]\) .+? <br><\/p>/g, '');
}

// Processar cada questão
contents.forEach(processQuestion);

// INSERT INTO assertions..
// INSERT INTO texts..
