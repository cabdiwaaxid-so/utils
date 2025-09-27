import { unique } from './unique.js';

/**
 * Utility functions for array manipulation with multiple modes
 * @param {Array} arr - The array to process
 * @param {Object} [options={}] - Processing options
 * @param {string} [options.mode] - Specific mode to return directly
 * @returns {Array|*} Processed array or object with all utility functions
 * @example
 * // Returns reversed array
 * arrayUtils([1, 2, 3], { mode: 'reverse' });
 * 
 * // Returns object with all utility results
 * arrayUtils([1, 2, 3]);
 */
export function arrayUtils(arr, options = {}) {
  if (!Array.isArray(arr)) return [];

  const formats = {
    reverse: [...arr].reverse(),
    shuffle: [...arr].sort(() => Math.random() - 0.5),
    first: arr[0],
    last: arr[arr.length - 1],
    random: arr[Math.floor(Math.random() * arr.length)],
    unique: unique(arr, options)
  };

  if (options.mode && formats[options.mode]) {
    return formats[options.mode];
  }

  return formats;
}