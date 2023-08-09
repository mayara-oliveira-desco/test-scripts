function extractAlternatives(body) {
  const alternatives = [];
  let content = body;

  const specialMatch = body.match(/alternativa incorreta é:<br>(.*?)<\/p>/);
  if (specialMatch) {
    content = specialMatch[1];
  }

  const regex = /<p[^>]*>(.*?)<\/p>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const parts = match[1].split('<br>');
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