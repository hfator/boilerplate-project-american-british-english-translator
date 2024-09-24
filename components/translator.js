const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
    constructor() {
        this.americanOnly = americanOnly;
        this.americanToBritishSpelling = americanToBritishSpelling;
        this.americanToBritishTitles = americanToBritishTitles;
        this.britishOnly = britishOnly;
        this.britishToAmericanSpelling = this.invertObject(americanToBritishSpelling);
        this.britishToAmericanTitles = this.invertObject(americanToBritishTitles);
    }

    invertObject(obj) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    translate(text, dictionaries, direction, options = { highlight: true }) {
        let translatedText = text;
        dictionaries.forEach(dict => {
            let entries = Object.entries(dict);
            entries.sort((a, b) => b[0].length - a[0].length);
            entries.forEach(([key, value]) => {
                let escapedKey = this.escapeRegex(key);
                let regex;
                if (dict === this.americanToBritishTitles || dict === this.britishToAmericanTitles) {
                    regex = new RegExp(`\\b${escapedKey}\\.?(?=\\s|$)`, 'gi');
                    translatedText = translatedText.replace(regex, (match) => {
                        let replacement = this.preserveCapitalization(match, value);
                        if (dict === this.britishToAmericanTitles && !replacement.endsWith('.')) {
                            replacement += '.';
                        } else if (dict === this.americanToBritishTitles) {
                            replacement = replacement.replace(/\./g, '');
                        }
                        if (options.highlight) {
                            replacement = `<span class="highlight">${replacement}</span>`;
                        }
                        return replacement;
                    });
                } else {
                    regex = new RegExp(`(?<!\\w)${escapedKey}(?!\\w)`, 'gi');
                    translatedText = translatedText.replace(regex, (match) => {
                        let replacement = this.preserveCapitalization(match, value);
                        if (options.highlight) {
                            replacement = `<span class="highlight">${replacement}</span>`;
                        }
                        return replacement;
                    });
                }
            });
        });
        return translatedText;
    }

    americanToBritish(text, options = {}) {
        options.highlight = options.highlight !== undefined ? options.highlight : true;
        text = this.translate(text, [
            this.americanToBritishTitles,
            this.americanToBritishSpelling,
            this.americanOnly
        ], 'americanToBritish', options);
        text = this.convertTime(text, 'americanToBritish', options);
        return text;
    }

    britishToAmerican(text, options = {}) {
        options.highlight = options.highlight !== undefined ? options.highlight : true;
        text = this.translate(text, [
            this.britishToAmericanTitles,
            this.britishToAmericanSpelling,
            this.britishOnly
        ], 'britishToAmerican', options);
        text = this.convertTime(text, 'britishToAmerican', options);
        return text;
    }

    preserveCapitalization(original, translated) {
        let origNoPeriod = original.replace('.', '');
        if (origNoPeriod === origNoPeriod.toUpperCase()) {
            return translated.toUpperCase();
        } else if (origNoPeriod[0] === origNoPeriod[0].toUpperCase()) {
            return translated.charAt(0).toUpperCase() + translated.slice(1);
        }
        return translated;
    }

    convertTime(text, direction, options = { highlight: true }) {
        let timeRegex;
        if (direction === 'americanToBritish') {
            timeRegex = /(\d{1,2}):(\d{2})/g;
            text = text.replace(timeRegex, (match, p1, p2) => {
                let replacement = `${p1}.${p2}`;
                if (options.highlight) {
                    replacement = `<span class="highlight">${replacement}</span>`;
                }
                return replacement;
            });
        } else if (direction === 'britishToAmerican') {
            timeRegex = /(\d{1,2})\.(\d{2})/g;
            text = text.replace(timeRegex, (match, p1, p2) => {
                let replacement = `${p1}:${p2}`;
                if (options.highlight) {
                    replacement = `<span class="highlight">${replacement}</span>`;
                }
                return replacement;
            });
        }
        return text;
    }
}

module.exports = Translator;
