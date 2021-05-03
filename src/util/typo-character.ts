const QWERTYkeyboardRows: [string, string][][] = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+']],
  [['\t', '\t'], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}'], ['\\', '|']],
  [['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [';', ':'], ['\'', '"'], ['\n', '\n']],
  [['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?']],
  [['', '']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']]
]

export const generateTypoCharacter = (inputCharacter) => {
  for (let row = 0; row < QWERTYkeyboardRows.length; row++) {
    for (let col = 0; col < QWERTYkeyboardRows[row].length; col++) {
      for (let shift = 0; shift < 2; shift++) {
        if (QWERTYkeyboardRows[row][col][shift] === inputCharacter) {
          let newRow = row, newCol = col;
          const rowRandomSeed = Math.random();
          const colRandomSeed = Math.random();

          if (rowRandomSeed <= 1/3) newRow++;
          else if (rowRandomSeed >= 2/3) newRow--;

          if (colRandomSeed <= 1/3) newCol++;
          else if (colRandomSeed >= 2/3) newCol--;

          newRow = Math.max(0, Math.min(newRow, QWERTYkeyboardRows.length - 1));
          newCol = Math.max(0, Math.min(newCol, QWERTYkeyboardRows[newRow].length - 1));

          return QWERTYkeyboardRows[newRow][newCol][shift];
        }
      }
    }
  }

  return inputCharacter;
}
