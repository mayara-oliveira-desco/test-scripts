<<<<<<< HEAD
// testes iniciais
=======
// Como nao tenho acesso ao banco do Dex, eu fiz só alguns testes aqui no console mesmo.
// entao vai ter que ser adaptado.
>>>>>>> origin/main


// Supondo que a pergunta seja:
const input = {
  "data": {
    "allContents": {
      "nodes": [
        {
          "id": 6536199,
          "textByTextId": {
            "body": "<div style='font-family: Arial; font-size: 20px;'><p><strong>(ENADE 2021)</strong><br>Atualmente, nós utilizamos um sistema de numeração decimal, isto é, de base 10, que é dito posicional, ou seja, cada algarismo, além de seu valor, possui um peso dado através da posição que ocupa. Os sistemas de numeração mais utilizados na informática são o de base 2 também conhecido como sistema binário composto pelos numerais 0 e 1, o de base 16 também conhecido como sistema hexadecimal que é composto de 16 algarismos, representados por 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E e F.\n<br><br>Considerando as informações apresentadas sobre os sistemas de numeração mais utilizados atualmente, avalie as afirmativas abaixo e assinale a opção correta:\n<br>I.\tOs endereços IPv4 são expressos na base decimal, mas são divididos em conjuntos de oito bits e interpretados pelo computador utilizando a base octal.</p><p>II.\tOs endereços IPv6 são compostos de 128 bits e para facilitar sua representação, é utilizado o sistema hexadecimal.</p><p>III.\tOs endereços físicos são compostos de 6 octetos representados por 12 dígitos no sistema hexadecimal. \n<br><br>a)\tApenas I e II estão corretas\n<br>b)\tApenas II e III estão corretas\n<br>c)\tApenas I e III estão corretas\n<br>d)\tApenas a II está correta\n<br>e)\tTodas estão corretas\n<br><br></p></div>"
          },
          "questionByQuestionId": {
            "id": 482175,
            "assertionsByQuestionId": {
              "nodes": []
            }
          }
        }
      ]
    }
  }
};

// Pega as alternativas e as letras
const regex = /<br>\s*([a-e])\)\t([^<]+)/g;
const afirmativas = [];
let match;
while ((match = regex.exec(input.data.allContents.nodes[0].textByTextId.body)) !== null) {
  const letra = match[1].toUpperCase();
  const afirmativa = match[2].trim();
  afirmativas.push({ letra, afirmativa });
}

// Remove as alternativas do body (da pergunta )
const bodyWithoutAlternativas = input.data.allContents.nodes[0].textByTextId.body.replace(regex, '');

// Cria as alternativas 
const alternativas = afirmativas.map((afirmativa, index) => {
  return {
    position: index,
    correct: false,
    contentsByAssertionId: {
      nodes: [
        {
          textByTextId: {
            body: `<div style='font-family: Arial; font-size: 20px;'><p>${afirmativa.afirmativa}</p></div>`
          }
        }
      ]
    }
  };
});

// Cria um json com a alternativa correta
const output = {
  data: {
    allContents: {
      nodes: [
        {
          id: 6604285,
          textByTextId: {
            body: bodyWithoutAlternativas
          },
          questionByQuestionId: {
            id: 490126,
            assertionsByQuestionId: {
              nodes: alternativas
            }
          }
        }
      ]
    }
  }
};

console.log(JSON.stringify(output));
