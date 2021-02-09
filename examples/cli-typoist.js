const { question, questionInt, questionFloat } = require('readline-sync');
const fs = require('fs');
const { Typoist, TypoistDefaults } = require('../build/typoist');

const input = question('Enter the input file path: ');
if (!fs.existsSync(input)) {
  throw new Error('Input file does not exist.');
}

const output = question('Enter the output the file path: ');
if (!fs.existsSync(output)) {
  throw new Error('Output file does not exist. Please create an empty file first.');
}

const speed = questionInt(`Enter typing speed in characters per second: `);
const mistakeProbability = questionFloat(`Enter mistake making probability: `);

const typoist = new Typoist({
  speed,
  mistakeProbability,
  appendFunction: (character) => fs.appendFileSync(output, character),
  deleteFunction: () => fs.writeFileSync(output, fs.readFileSync(output).toString().slice(0, -1))
})

typoist.setStringToType(fs.readFileSync(input).toString()).startTyping();
