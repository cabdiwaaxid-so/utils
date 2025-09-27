/**
 * Generate random numbers with various distributions
 * @param {Object} [options={}] - Random generation options
 * @param {number} [options.min=0] - Minimum value
 * @param {number} [options.max=1] - Maximum value
 * @param {boolean} [options.integer=false] - Whether to return integer
 * @param {string} [options.mode] - Specific random generation mode
 * @param {Array} [options.array] - Array to pick random element from
 * @returns {number|boolean|*|Object} Random value or object with different random generation methods
 * @example
 * // Returns random integer between 1 and 10
 * random({ mode: 'integer', min: 1, max: 10 });
 * 
 * // Returns object with all random generation methods
 * random({ min: 0, max: 100 });
 */
export function random(options = {}) {
  const {
    min = 0,
    max = 1,
    integer = false,
    mode
  } = options;

  const formats = {
    uniform: (function() {
      const num = Math.random() * (max - min) + min;
      return integer ? Math.floor(num) : num;
    })(),
    normal: (function() {
      // Box-Muller transform for normal distribution
      let u = 0, v = 0;
      while(u === 0) u = Math.random();
      while(v === 0) v = Math.random();
      const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      // Scale to desired range
      const scaled = (num / 3) * (max - min) + (min + max) / 2;
      return integer ? Math.floor(scaled) : scaled;
    })(),
    integer: Math.floor(Math.random() * (max - min + 1)) + min,
    boolean: Math.random() > 0.5,
    pickFromArray: (function() {
      if (options.array && Array.isArray(options.array)) {
        return options.array[Math.floor(Math.random() * options.array.length)];
      }
      return null;
    })()
  };

  if (mode && formats[mode]) {
    return formats[mode];
  }

  return formats;
}