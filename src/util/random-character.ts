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
