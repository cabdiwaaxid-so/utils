/**
 * Create a deep clone of an object using various methods
 * @param {*} obj - The value to clone (object, array, or primitive)
 * @param {Object} [options={}] - Cloning options
 * @param {string} [options.mode] - Specific cloning mode to use
 * @returns {*} Deep cloned value or object with different cloning methods
 * @example
 * // Returns object cloned using JSON method
 * deepClone({ a: 1 }, { mode: 'json' });
 * 
 * // Returns object with all cloning methods
 * deepClone({ a: 1 });
 */
export function deepClone(obj, options = {}) {
  if (obj === null || typeof obj !== 'object') return obj;

  const formats = {
    json: JSON.parse(JSON.stringify(obj)),
    structured: typeof structuredClone === 'function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)), 
    recursive: (function clone(o) {
      if (o === null || typeof o !== 'object') return o;
      if (Array.isArray(o)) return o.map(clone);
      const res = {};
      for (const key in o) res[key] = clone(o[key]);
      return res;
    })(obj)
  };

  if (options.mode && formats[options.mode]) {
    return formats[options.mode];
  }

  return formats;
}