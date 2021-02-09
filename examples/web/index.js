const typeIt = (selector, text, options) => {
  const textArea = document.querySelector(selector);

  const typoist = new Typoist.Typoist({
    ...options,
    appendFunction: (character) => {
      textArea.innerHTML += character;
    },
    deleteFunction: () => {
      textArea.innerText = textArea.innerText.slice(0, -1)
    }
  })

  typoist.setStringToType(text);
  typoist.startTyping();
}

const typeFeatures = () => {
  typeIt('#feat-typo', 'It can make random tpyoes while typing and correct them.', { speed: 15, mistakeProbability: 0 });
  typeIt('#feat-lots-of-mistakes', 'Lots of typos.', { mistakeProbability: 0.8, speed: 30 });
  typeIt('#feat-no-mistakes', 'Or no typos at all.', { mistakeProbability: 0, speed: 3 });
  typeIt('#feat-speed', 'Adjustable Speed.', { speed: 1 });
}

const typeDesc = () => {
  typeIt('#desc', 'A fun library that can be used to fake fast typing or create typing time-lapses.', { speed: 45, onComplete: typeFeatures });
}

typeIt('#title', 'Typoist', {
  speed: 8,
  mistakeProbability: 0.3,
  onComplete: typeDesc
})
