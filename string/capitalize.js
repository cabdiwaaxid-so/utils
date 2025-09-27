/**
 * Capitalize a string with various formatting options
 * @param {string} str - The string to capitalize
 * @param {Object} [option={}] - Capitalization options
 * @param {string} [option.mode] - Specific mode to return directly
 * @param {number} [option.index=0] - Index for character/word operations
 * @param {boolean} [option.char=false] - Operate on characters
 * @param {boolean} [option.word=false] - Operate on words
 * @param {boolean} [option.every=false] - Apply to every occurrence
 * @returns {string|Object} Formatted string or object with all capitalization formats
 * @example
 * // Returns 'hello world' with first character uppercase
 * capitalize('hello world', { mode: 'firstUpper' });
 * 
 * // Returns object with all capitalization formats
 * capitalize('hello world');
 */
export function capitalize(str, option = {}) {
  if(!str) return '';
  const formats = {
    firstUpper: str.charAt(0).toUpperCase() + str.slice(1),
    upperByIndex: ({ index = 0, char = false, word = false, every = false }) => {
      if (char) {
        if (every) {
          return str
            .split(' ')
            .map(word => {
              if (index < word.length) {
                return word.slice(0, index) + word[index].toUpperCase() + word.slice(index + 1);
              }
              return word;
            })
            .join(' ');
        } else {
          if (index < 0 || index >= str.length) return str;
          return str.slice(0, index) + str[index].toUpperCase() + str.slice(index + 1);
        }
      }

      if (word) {
        const words = str.split(' ');
        if (every) {
          return words.map((w, i) => {
            if (i === index) return w.toUpperCase();
            return w;
          }).join(' ');
        } else {
          return words.map((w, i) => (i === index ? w.toUpperCase() : w)).join(' ');
        }
      }

      return str;
    },
    lowerByIndex: ({ index = 0, char = false, word = false, every = false }) => {
      if (char) {
        if (every) {
          return str
            .split(' ')
            .map(word => {
              if (index < word.length) {
                return word.slice(0, index) + word[index].toLowerCase() + word.slice(index + 1);
              }
              return word;
            })
            .join(' ');
        } else {
          if (index < 0 || index >= str.length) return str;
          return str.slice(0, index) + str[index].toLowerCase() + str.slice(index + 1);
        }
      }

      if (word) {
        const words = str.split(' ');
        if (every) {
          return words.map((w, i) => {
            if (i === index) return w.toLowerCase();
            return w;
          }).join(' ');
        } else {
          return words.map((w, i) => (i === index ? w.toLowerCase() : w)).join(' ');
        }
      }

      return str;
    },
    allUpper: str.toUpperCase(),
    allLower: str.toLowerCase(),
    titleCase: str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
  };
  if(option.mode && formats[option.mode]) {
    if(option.mode === 'upperByIndex') {
      return formats.upperByIndex(option);
    }
    return formats[option.mode];
  };
  return formats;
}