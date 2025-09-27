/**
 * Truncate a string with various options
 * @param {string} str - The string to truncate
 * @param {Object} [options={}] - Truncation options
 * @param {number} [options.length=50] - Maximum length of truncated string
 * @param {string} [options.omission='...'] - String to indicate truncation
 * @param {string} [options.position='end'] - Position of truncation
 * @param {string} [options.mode] - Specific truncation mode to use
 * @param {string} [options.pattern] - Custom pattern for smart truncation
 * @returns {string|Object} Truncated string or object with different truncation methods
 * @example
 * // Returns 'This is a long...'
 * truncate('This is a long string that needs truncation', { mode: 'end', length: 15 });
 * 
 * // Returns object with all truncation methods
 * truncate('This is a long string');
 */
export function truncate(str, options = {}) {
  if (typeof str !== 'string') return str;

  const {
    length = 50,
    omission = '...',
    position = 'end'
  } = options;

  if (str.length <= length) return str;

  const formats = {
    end: str.slice(0, length) + omission,
    start: omission + str.slice(str.length - length),
    middle: str.slice(0, Math.floor(length / 2)) + omission + str.slice(str.length - Math.floor(length / 2)),
    smart: (function() {
      if (str.lastIndexOf(' ') > 0) {
        const truncated = str.slice(0, length);
        return truncated.slice(0, truncated.lastIndexOf(' ')) + omission;
      }
      return str.slice(0, length) + omission;
    })()
  };

  if (options.mode && formats[options.mode]) {
    return formats[options.mode];
  }

  return formats;
}