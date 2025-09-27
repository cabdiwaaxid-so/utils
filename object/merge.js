/**
 * Merge objects with various strategies
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge
 * @param {Object} [options={}] - Merge options
 * @param {string} [options.mode] - Specific merge mode to use
 * @returns {Object|Object} Merged object or object with different merge strategies
 * @example
 * // Returns shallow merged object
 * merge({ a: 1 }, { b: 2 }, { mode: 'shallow' });
 * 
 * // Returns object with all merge strategies
 * merge({ a: 1 }, { b: 2 });
 */
export function merge(target, source, options = {}) {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  const formats = {
    shallow: { ...target, ...source },
    deep: (function deepMerge(tgt, src) {
      const result = { ...tgt };
      
      for (const key in src) {
        if (src.hasOwnProperty(key)) {
          if (typeof src[key] === 'object' && src[key] !== null && 
              typeof tgt[key] === 'object' && tgt[key] !== null) {
            result[key] = deepMerge(tgt[key], src[key]);
          } else {
            result[key] = src[key];
          }
        }
      }
      return result;
    })(target, source),
    concat: (function() {
      const result = { ...target };
      for (const key in source) {
        if (Array.isArray(target[key]) && Array.isArray(source[key])) {
          result[key] = target[key].concat(source[key]);
        } else {
          result[key] = source[key];
        }
      }
      return result;
    })(),
    overwriteArrays: (function() {
      const result = { ...target };
      for (const key in source) {
        result[key] = source[key];
      }
      return result;
    })()
  };

  if (options.mode && formats[options.mode]) {
    return formats[options.mode];
  }

  return formats;
}