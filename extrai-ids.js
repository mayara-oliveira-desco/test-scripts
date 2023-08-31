const fs = require('fs');

// cole aqui o objeto de saída do hygraph depois que vc inserir os ids
const object = {
  "data": {
    "faculExercises": [
      {
        "id": "cll550g1p0yjd0ck08hbeehzi",
        "dexExerciseId": 240476
      },
      {
        "id": "cll5515o10z100ck0wqq06kes",
        "dexExerciseId": 240477
      },
      {
        "id": "cll556y3v10sb0biyu97k7ls3",
        "dexExerciseId": 240478
      },
      {
        "id": "cll558j2s119y0biy5f6fnn2q",
        "dexExerciseId": 240479
      },
      {
        "id": "cll559x6s132x0aixzc1b7qzx",
        "dexExerciseId": 240480
      },
    ]
  }
};

try {
  const questionIds = object.data.faculExercises.map(item => {
    if (typeof item.dexExerciseId !== 'number') {
      throw new Error('Failed to extract dexExerciseId for item: ' + JSON.stringify(item));
    }
    return item.dexExerciseId;
  });

  const contentQuestionIds = `const questionIds = [\n  ${questionIds.join(',\n  ')}\n];\n\nmodule.exports = questionIds;`;

  fs.writeFile('questionIds.js', contentQuestionIds, (err) => {
    if (err) throw err;
    console.log('The file questionIds.js has been saved!');
  });

  const idsHygraph = object.data.faculExercises.map(item => {
    if (typeof item.id !== 'string') {
      throw new Error('Failed to extract id for item: ' + JSON.stringify(item));
    }
    return `"${item.id}"`;
  });

  const contentIdsHygraph = `const idsHygraph = [\n  ${idsHygraph.join(',\n  ')}\n];\n\nmodule.exports = idsHygraph;`;

  fs.writeFile('idsHygraph.js', contentIdsHygraph, (err) => {
    if (err) throw err;
    console.log('The file idsHygraph.js has been saved!');
  });

} catch (error) {
  console.error('An error occurred:', error.message);
}