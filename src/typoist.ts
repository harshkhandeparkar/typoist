import { generateRandomCharacter } from './util/random-character';

export interface ITypoistSettings {
  /** The maximum typing speed in characters per second. */
  speed?: number;
  /** Probability of making a mistake. */
  mistakeProbability?: number;
  /** A function that is fired each time a character is to be appended to the output. */
  appendFunction: (character: string) => void;
  /** A function that is fired each time the last character in the final output is to be removed. */
  deleteFunction: () => void;
  /** A callback that is fired when typing is complete. */
  onComplete?: () => void
}

export const TypoistDefaults: ITypoistSettings = {
  speed: 10,
  mistakeProbability: 0.1,
  appendFunction: (char: string) => {},
  deleteFunction: () => {}
}

export class Typoist {
  currentTypingLocation: number = 0;
  isTyping: boolean = false;
  stringToType: string;
  speed: number; // Characters per second
  typingDelay: number; // Maximum delay between each character typed, in ms
  mistakeProbability: number;
  appendFunction: (character: string) => void;
  deleteFunction: () => void;
  onComplete: () => void;
  settings: ITypoistSettings;
  manipulatorTimeOut: NodeJS.Timeout;
  manipulateQueue: {
    operation: 'delete' | 'append',
    character?: string
  }[] = [];

  constructor(settings: ITypoistSettings) {
    this.settings = {
      ...TypoistDefaults,
      ...settings
    }

    this.speed = this.settings.speed;
    this.typingDelay = 1000 / this.speed;
    this.mistakeProbability = this.settings.mistakeProbability;
    this.appendFunction = this.settings.appendFunction;
    this.deleteFunction = this.settings.deleteFunction;
    this.onComplete = this.settings.onComplete;
  }

  pasteFunc = () => {
    if (this.currentTypingLocation < this.stringToType.length && this.isTyping) {
      if (Math.random() >= 1 - this.mistakeProbability) {
        this.manipulateQueue.push({
          operation: 'append',
          character: generateRandomCharacter(this.stringToType[this.currentTypingLocation])
        })

        this.manipulateQueue.push({ operation: 'delete' });
      }
      else {
        this.manipulateQueue.push({
          operation: 'append',
          character: this.stringToType[this.currentTypingLocation++]
        })
      }
    }
  }

  manipulatorLoop = () => {
    if (this.isTyping && this.manipulateQueue.length > 0) {
      const manipulation = this.manipulateQueue.shift();

      if (manipulation.operation === 'delete') this.deleteFunction();
      else if (manipulation.operation === 'append') this.appendFunction(manipulation.character);
    }
    else this.pasteFunc();

    if (this.currentTypingLocation >= this.stringToType.length && this.manipulateQueue.length === 0) {
      this.stopTyping();
      if (this.onComplete) this.onComplete();
    }
    else this.manipulatorTimeOut = setTimeout(this.manipulatorLoop, this.typingDelay * Math.random());
  }

  /**
   * Set the string to be typed.
   * @param stringToType The string to type.
   */
  setStringToType(stringToType: string) {
    this.stringToType = stringToType;

    return this;
  }

  startTyping() {
    if (!this.isTyping) {
      this.isTyping = true;
      this.manipulatorLoop();
    }

    return this;
  }

  stopTyping() {
    if (this.isTyping) {
      this.isTyping = false;
      clearTimeout(this.manipulatorTimeOut);
    }

    return this;
  }
}
