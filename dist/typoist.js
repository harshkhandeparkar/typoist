(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Typoist = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var randomCharacter = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generateRandomCharacter = void 0;
	// Thank you stack overflow users!  ↓↓
	exports.generateRandomCharacter = function () {
	    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/\\'\"-_+={}()|`*-?[]<>!%$#@&^:;,. ";
	    return characters[Math.min(characters.length - 1, Math.floor(Math.random() * (characters.length + 1)))];
	};
	// Thank you stack overflow users!  ↑↑
	});

	var typoist = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Typoist = exports.TypoistDefaults = void 0;

	exports.TypoistDefaults = {
	    speed: 10,
	    mistakeProbability: 0.1,
	    mistakeLength: 3,
	    appendFunction: function (char) { },
	    deleteFunction: function () { }
	};
	var Typoist = /** @class */ (function () {
	    function Typoist(settings) {
	        var _this = this;
	        this.currentTypingLocation = 0;
	        this.isTyping = false;
	        this.manipulateQueue = [];
	        this.pasteFunc = function () {
	            if (_this.currentTypingLocation < _this.stringToType.length && _this.isTyping) {
	                if (Math.random() >= 1 - _this.mistakeProbability) {
	                    var backspaceLen = Math.random() * _this.mistakeLength;
	                    for (var j = 1; j <= backspaceLen; j++) {
	                        _this.manipulateQueue.push({
	                            operation: 'append',
	                            character: randomCharacter.generateRandomCharacter()
	                        });
	                    }
	                    for (var j = backspaceLen; j >= 1; j--)
	                        _this.manipulateQueue.push({ operation: 'delete' });
	                }
	                else {
	                    _this.manipulateQueue.push({
	                        operation: 'append',
	                        character: _this.stringToType[_this.currentTypingLocation++]
	                    });
	                }
	            }
	        };
	        this.manipulatorLoop = function () {
	            if (_this.isTyping && _this.manipulateQueue.length > 0) {
	                var manipulation = _this.manipulateQueue.shift();
	                if (manipulation.operation === 'delete')
	                    _this.deleteFunction();
	                else if (manipulation.operation === 'append')
	                    _this.appendFunction(manipulation.character);
	            }
	            else
	                _this.pasteFunc();
	            if (_this.currentTypingLocation >= _this.stringToType.length && _this.manipulateQueue.length === 0) {
	                _this.stopTyping();
	                if (_this.onComplete)
	                    _this.onComplete();
	            }
	            else
	                _this.manipulatorTimeOut = setTimeout(_this.manipulatorLoop, _this.typingDelay * Math.random());
	        };
	        this.settings = __assign(__assign({}, exports.TypoistDefaults), settings);
	        this.speed = this.settings.speed;
	        this.typingDelay = 1000 / this.speed;
	        this.mistakeProbability = this.settings.mistakeProbability;
	        this.mistakeLength = this.settings.mistakeLength;
	        this.appendFunction = this.settings.appendFunction;
	        this.deleteFunction = this.settings.deleteFunction;
	        this.onComplete = this.settings.onComplete;
	    }
	    /**
	     * Set the string to be typed.
	     * @param stringToType The string to type.
	     */
	    Typoist.prototype.setStringToType = function (stringToType) {
	        this.stringToType = stringToType;
	        return this;
	    };
	    Typoist.prototype.startTyping = function () {
	        if (!this.isTyping) {
	            this.isTyping = true;
	            this.manipulatorLoop();
	        }
	        return this;
	    };
	    Typoist.prototype.stopTyping = function () {
	        if (this.isTyping) {
	            this.isTyping = false;
	            clearTimeout(this.manipulatorTimeOut);
	        }
	        return this;
	    };
	    return Typoist;
	}());
	exports.Typoist = Typoist;
	});

	var typoist$1 = /*@__PURE__*/getDefaultExportFromCjs(typoist);

	return typoist$1;

})));
