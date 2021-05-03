import { generateTypoCharacter } from './util/typo-character';

export interface ITypoistSettings {
  /** The maximum typing speed in characters per second. */
  speed?: number;
  /** Probability of making a mistake. */
  mistakeProbability?: number;
  /** A function that is fired each time a character is to be appended to the output. */
  appendFunction: (character: string) => Promise<void>;
  /** A function that is fired each time the last character in the final output is to be removed. */
  deleteFunction: () => Promise<void>;
  /** A callback that is fired when typing is complete. */
  onComplete?: () => void;
}

export const TypoistDefaults: ITypoistSettings = {
  speed: 10,
  mistakeProbability: 0.1,
  appendFunction: async (char: string) => {},
  deleteFunction: async () => {}
}

export class Typoist {
  isTyping: boolean = false;
  stringToType: string;
  speed: number; // Characters per second
  typingDelay: number; // Maximum delay between each character typed, in ms
  mistakeProbability: number;
  appendFunction: (character: string) => Promise<void>;
  deleteFunction: () => Promise<void>;
  onComplete: () => void;
  settings: ITypoistSettings;
  typedIndex: number = -1;

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

  type(string: string) {
    if (!this.isTyping) {
      this.stringToType = string;
      this.typedIndex = 0;
      this.startTyping();
    }
  }

  async typeLoop() {
    if (this.isTyping) {
      if (this.typedIndex < this.stringToType.length - 1) {
        // typing left

        if (Math.random() >= 1 - this.mistakeProbability) {
          // mistake
          await this.appendFunction(generateTypoCharacter(this.stringToType[this.typedIndex + 1]));

          this.afterRandomDelay(async () => {
            await this.deleteFunction();
            this.afterRandomDelay(async () => await this.typeLoop());
          })
        }
        else {
          // normal type
          this.typedIndex++;
          await this.appendFunction(this.stringToType[this.typedIndex]);

          this.afterRandomDelay(async () => {
            await this.typeLoop();
          })
        }
      }
      else {
        // typing done
        this.isTyping = false;
        this.onComplete();
      }
    }
  }

  async afterRandomDelay(cb: Function) {
    setTimeout(cb, this.typingDelay * Math.random());
  }

  startTyping() {
    if (!this.isTyping) {
      this.isTyping = true;
      this.typeLoop();
    }

    return this;
  }

  stopTyping() {
    if (this.isTyping) {
      this.isTyping = false;
    }

    return this;
  }
}
