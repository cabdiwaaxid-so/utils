/**
 * Split array into chunks of specified size
 * @param {Array} arr - Array to chunk
 * @param {Object} [options={}] - Chunking options
 * @param {number} [options.size=2] - Size of each chunk
 * @param {string} [options.mode] - Specific chunking mode to use
 * @param {*} [options.fillValue] - Value to fill incomplete chunks
 * @returns {Array|Object} Chunked array or object with different chunking methods
 * @example
 * // Returns [[1, 2], [3, 4]]
 * chunk([1, 2, 3, 4], { mode: 'fixed', size: 2 });
 * 
 * // Returns object with all chunking methods
 * chunk([1, 2, 3, 4, 5], { size: 2 });
 */
export function chunk(arr, options = {}) {
  if (!Array.isArray(arr)) return [];

  const { size = 2, mode } = options;

  if (size <= 0) return arr;

  const formats = {
    fixed: (function() {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    })(),
    overlapping: (function() {
      const chunks = [];
      for (let i = 0; i <= arr.length - size; i++) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    })(),
    fill: (function() {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
        const chunk = arr.slice(i, i + size);
        while (chunk.length < size) {
          chunk.push(options.fillValue);
        }
        chunks.push(chunk);
      }
      return chunks;
    })()
  };

  if (mode && formats[mode]) {
    return formats[mode];
  }

  return formats;
}