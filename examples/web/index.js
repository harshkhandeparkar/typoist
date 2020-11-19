const textArea = document.querySelector('p');
const exampleText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis aspernatur voluptatibus laborum saepe, magnam magni commodi! Perferendis, mollitia velit commodi quod sint illo rem alias. Nostrum nam porro necessitatibus corporis.';

const typoist = new Typoist.Typoist({
  appendFunction: (character) => {
    textArea.innerHTML = textArea.innerHTML.slice(0, -1) + character + '|';
  },
  deleteFunction: () => {
    textArea.innerText = textArea.innerText.slice(0, -2) + '|';
  }
})

typoist.setStringToType(exampleText);
typoist.startTyping();
