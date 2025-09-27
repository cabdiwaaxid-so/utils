/**
 * Remove duplicates from an array with various strategies
 * @param {Array} arr - The array to remove duplicates from
 * @param {Object} [options={}] - Deduplication options
 * @param {string} [options.mode] - Specific deduplication mode to use
 * @returns {Array|Object} Deduplicated array or object with different deduplication methods
 * @example
 * // Returns array with duplicates removed (simple method)
 * unique([1, 2, 2, 3], { mode: 'simple' });
 * 
 * // Returns object with all deduplication methods
 * unique([1, 2, 2, 3]);
 */
export function unique(arr, options = {}) {
  if (!Array.isArray(arr)) return [];

  const formats = {
    simple: [...new Set(arr)], 
    sorted: [...new Set(arr)].sort(),
  };

  if (options.mode && formats[options.mode]) {
    return formats[options.mode];
  }

  return formats;
}