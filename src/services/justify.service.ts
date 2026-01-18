export function justifyText(text: string, lineLength: number = 80): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  
  if (words.length === 0) return "";

  const lines: string[] = [];
  let currentLine: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    const wordLength = word.length;
    const spaceNeeded = currentLine.length > 0 ? 1 : 0; 

    if (currentLength + spaceNeeded + wordLength <= lineLength) {
      currentLine.push(word);
      currentLength += spaceNeeded + wordLength;
    } else {
      if (currentLine.length > 0) {
        lines.push(justifyLine(currentLine, lineLength, false));
      }
      currentLine = [word];
      currentLength = wordLength;
    }
  }

  // Last line (not justified, left-aligned)
  if (currentLine.length > 0) {
    lines.push(currentLine.join(" "));
  }

  return lines.join("\n");
}

function justifyLine(words: string[], lineLength: number, isLastLine: boolean): string {
  if (isLastLine || words.length === 1) {
    return words.join(" ");
  }

  const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
  const totalSpaces = lineLength - totalWordLength;
  const gaps = words.length - 1;
  const spacesPerGap = Math.floor(totalSpaces / gaps);
  const extraSpaces = totalSpaces % gaps;

  let result = "";
  for (let i = 0; i < words.length; i++) {
    result += words[i];
    if (i < words.length - 1) {
      const spaces = spacesPerGap + (i < extraSpaces ? 1 : 0);
      result += " ".repeat(spaces);
    }
  }

  return result;
}
