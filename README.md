# Discovery de conversão de questões ENADE pra objetiva
Apenas um script de exemplo da [task](https://app.shortcut.com/teamassessments/story/100405/importa%C3%A7%C3%A3o-dos-enunciados-das-quest%C3%B5es-dissertativas-para-m%C3%BAltipla-escolha) de discovery de conversão de discursiva pra objetiva. 

## Alguns pontos importantes sobre o que o script deve fazer
- Identificar as questões que vão o mudar o modelo (planilha);

- Pegar as alternativas do `body` das antigas ENADEs, tabela `texts`:
Da pra usar regex pra identificar as alternativas `/\(\s*([a-zA-Z])\s*\)(.*?)<br>/g`

- Criar as alternativas na tabela `assertions` e `texts`;
Vamos precisar gerar ids aleatórios pra cada nova alternativa e ter os valores da coluna `correct`  (planilha)
- Remover as alternativas do `body` das questões que mudaram de modelo.

## Vale ressaltar
Eu nao possuo acesso ao banco do Dex, entao nao consegui testar.. de qualquer forma o código vai ter que ser adaptado.

obs: Este script modifica os arrays 'assertions' e 'texts' em memória.
O código tem que ser adaptado para que essas mudancas reflitam no banco.
