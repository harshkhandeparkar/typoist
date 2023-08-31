const typeIt = (selector, text, options) => {
  const textArea = document.querySelector(selector);

  const typoist = new Typoist.Typoist({
    ...options,
    appendFunction: async (character) => textArea.innerText += character,
    deleteFunction: async () => textArea.innerText = textArea.innerText.slice(0, -1)
  })

  typoist.type(text);
}

const typeFeatures = () => {
  typeIt('#feat-typo', 'It can make random tpyoes while typing and correct them.', { speed: 10, mistakeProbability: 0, onComplete: () => console.log('done') });
  typeIt('#feat-lots-of-mistakes', 'Lots of typos.', { mistakeProbability: 0.8, speed: 15, onComplete: () => console.log('done') });
  typeIt('#feat-no-mistakes', 'Or no typos at all.', { mistakeProbability: 0, speed: 3, onComplete: () => console.log('done') });
  typeIt('#feat-speed', 'Adjustable Speed.', { speed: 1 });
}

const typeDesc = () => {
  typeIt('#desc', 'A fun library that can be used to fake fast typing or create typing time-lapses.', { speed: 20, onComplete: typeFeatures });
}

typeIt('#title', 'Typoist', {
  speed: 8,
  mistakeProbability: 0.3,
  onComplete: typeDesc
})
