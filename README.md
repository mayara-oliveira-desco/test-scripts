# Conversão de questões ENADE pra P&R objetivo
Este projeto contém scripts para converter questões do modelo antigo do ENADE para um formato objetivo.
🔎 [Task de discovery](https://app.shortcut.com/teamassessments/story/100405/importa%C3%A7%C3%A3o-dos-enunciados-das-quest%C3%B5es-dissertativas-para-m%C3%BAltipla-escolha)
📝 [Task mao na massa](https://app.shortcut.com/teamassessments/story/104131/cria%C3%A7%C3%A3o-do-script-para-converter-p-rs-discursivos-em-objetivos)

## Alguns pontos importantes sobre o script
1. Identificar as questões que vão mudar o modelo [planilha](https://docs.google.com/spreadsheets/d/15An1yKe3-HSyns_x9evzcUhJVYBQxkgTSO0FeD94ftI/edit#gid=0)
Os IDs das questões que precisam ser convertidas devem ser fornecidos nesta planilha, juntamente com o gabarito das questoes.

2. Pegar as alternativas do body das antigas ENADEs, tabela `texts`
Utilizando os scripts [01-pegar-alternativas](./01-pegar-alternativas.js) e [02-remover-alternativas](./02-remover-alternativas.js) para extrair o texto das alternativas das questões selecionadas a partir da tabela texts, e tambem salvar as alternativas.

3. As alternativas extraídas são inseridas nas tabelas `assertions` e `texts` utilizando IDs gerados aleatoriamente.
Os textos das alternativas são inseridos na tabela `texts` ([04-inserir-alternativas-texts](./04-inserir-alternativas-texts.js)), e a relacao inseridas na tabela `assertions` ([03-criar-campo-assertions](./03-criar-campo-assertions.js)).

4. Remover as alternativas do `body` das questões que mudaram de modelo
As alternativas extraídas das questões antigas sao removidas [02-remover-alternativas](./02-remover-alternativas.js).

## Vale ressaltar
É difícil (se não impossível) definir um único regex para capturar todas as alternativas, pois cada tutor formata o enunciado de um jeito. Portanto, provavelmente, será necessário reprocessar com outro padrão regex.

## Instruções para execução dos scripts
- Adicionar no arquivo [questionIds](./questionIds.js) os `dexExerciseId` das questoes que vao ser alteradas de modelo.
- Adicionar no arquivo [corrects](./corrects.js) as `positions` das respostas corretas.
- Adicionar no arquivo [idsHygraph](./idsHygraph.js) os `ids` dos exercicios.
### Ordem
1. 00-pegar-textId
2. 01-pegar-alternativas
3. 02-remover-alternativas
4. 03-criar-campo-assertions
5. 04-inserir-alternativas-texts
6. 05-insere-contents

**E atualizar o tipo no Hygraph :)**