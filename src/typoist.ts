import { generateRandomCharacter } from './util/random-character';

export interface ITypoistSettings {
  /** The maximum typing speed in characters per second. */
  speed?: number;
  /** Probability of making a mistake. */
  mistakeProbability?: number;
  /** The maximum number of wrong characters typed during a mistake. */
  mistakeLength?: number;
  /** A function that is fired each time a character is to be appended to the output. */
  appendFunction?: (character: string) => void;
  /** A function that is fired each time the last character in the final output is to be removed. */
  deleteFunction?: () => void;
}

export const TypoistDefaults: ITypoistSettings = {
  speed: 10,
  mistakeProbability: 0.1,
  mistakeLength: 3,
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
  mistakeLength: number;
  appendFunction: (character: string) => void;
  deleteFunction: () => void;
  settings: ITypoistSettings;

  constructor(settings: ITypoistSettings) {
    this.settings = {
      ...TypoistDefaults,
      ...settings
    }

    this.speed = this.settings.speed;
    this.typingDelay = 1000 / this.speed;
    this.mistakeProbability = this.settings.mistakeProbability;
    this.mistakeLength = this.settings.mistakeLength;
    this.appendFunction = this.settings.appendFunction;
    this.deleteFunction = this.settings.deleteFunction;
  }

  pasteFunc = () => {
    if (this.currentTypingLocation < this.stringToType.length && this.isTyping) {
      if (Math.random() >= 1 - this.mistakeProbability) {
        const backspaceLen = Math.random() * this.mistakeLength;

        for (let j = 1; j <= backspaceLen; j++) {
          setTimeout(
            () => {
              this.appendFunction(generateRandomCharacter());
            }, j * this.typingDelay * Math.random()
          )
        }

        for (let j = backspaceLen; j >= 1; j--) {
          setTimeout(
            () => {
              this.deleteFunction();
            }, (j + backspaceLen) * this.typingDelay * Math.random()
          )
        }

        setTimeout(this.pasteFunc, this.typingDelay * (2 * backspaceLen + 1));
      }
      else {
        this.appendFunction(this.stringToType[this.currentTypingLocation++]);

        setTimeout(this.pasteFunc, this.typingDelay * Math.random());
      }
    }
  }

  /**
   * Set the string to be typed.
   * @param stringToType The string to type.
   */
  setStringToType(stringToType: string) {
    this.stringToType = stringToType;
  }

  startTyping() {
    this.isTyping = true;
    this.pasteFunc();
  }

  stopTyping() {
    this.isTyping = false;
  }
}
