// Thank you stack overflow users!  ↓↓
export const generateRandomCharacter = () => {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/\\'"-_+={}()|\`*-?[]<>!%$#@&^:;,. `;

  return characters[
    Math.min(
      characters.length - 1,
      Math.floor(
        Math.random() * (characters.length + 1)
      )
    )
  ]
}
// Thank you stack overflow users!  ↑↑


const QWERTYkeyboardRows: [string, string][][] = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+']],
  [['\t', '\t'], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}'], ['\\', '|']],
  [['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [';', ':'], ['\'', '"'], ['\n', '\n']],
  [['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?']],
  [['', '']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']], [[' ', ' ']]
]
