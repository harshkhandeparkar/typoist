const textArea = document.querySelector('#type-box');
const exampleText = document.querySelector('#example-lorem').innerHTML;

const typoist = new Typoist.Typoist({
  speed: 15,
  appendFunction: (character) => {
    textArea.innerHTML += character;
  },
  deleteFunction: () => {
    textArea.innerText = textArea.innerText.slice(0, -1)
  }
})

typoist.setStringToType(exampleText);
typoist.startTyping();
