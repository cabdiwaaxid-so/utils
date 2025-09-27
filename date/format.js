/**
 * Format dates with various patterns
 * @param {Date|string} date - Date to format
 * @param {Object} [options={}] - Formatting options
 * @param {string} [options.mode] - Specific formatting mode to use
 * @param {string} [options.pattern] - Custom pattern for formatting (uses YYYY, MM, DD, HH, mm, ss)
 * @returns {string|Object} Formatted date or object with different format patterns
 * @example
 * // Returns '2025-9-27'
 * formatDate(new Date(), { mode: 'custom', pattern: 'YYYY-MM-DD' });
 * 
 * // Returns object with all format patterns
 * formatDate(new Date());
 */
export function formatDate(date, options = {}) {
  const d = date instanceof Date ? date : new Date(date);
  
  if (isNaN(d.getTime())) return 'Invalid Date';

  const formats = {
    iso: d.toISOString(),
    locale: d.toLocaleDateString(),
    full: d.toLocaleString(),
    time: d.toLocaleTimeString(),
    custom: (function() {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      
      return options.pattern 
        ? options.pattern
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds)
        : `${year}-${month}-${day}`;
    })(),
    relative: (function() {
      const now = new Date();
      const diffMs = now - d;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return 'just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      
      return formatDate(d, { mode: 'custom', pattern: 'YYYY-MM-DD' });
    })()
  };

  if (options.mode && formats[options.mode]) {
    return formats[options.mode];
  }

  return formats;
}