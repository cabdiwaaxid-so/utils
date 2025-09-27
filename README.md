# @cabdi_waaxid/utils

A comprehensive collection of reusable JavaScript utility functions with multi-option modes. This library provides flexible, well-documented functions for string manipulation, array operations, object handling, mathematical calculations, and date formatting.

## Features

- 🎯 **Multi-mode functions** - Each function can return a specific result or all available formats
- 📚 **Comprehensive JSDoc** - Full documentation with examples and type definitions
- 🔧 **Tree-shakable** - Only import what you need
- 🎪 **Flexible options** - Customize behavior with intuitive options objects
- 💪 **Type-safe** - Written with JSDoc for better IDE support
- 🚀 **Zero dependencies** - Lightweight and fast

## Installation

```bash
npm install @cabdi_waaxid/utils
```

## Quick Start

```javascript
import { capitalize, arrayUtils, deepClone } from '@cabdi_waaxid/utils';

// Simple usage with specific mode
const result = capitalize('hello world', { mode: 'firstUpper' });
console.log(result); // 'Hello world'

// Get all available formats
const formats = capitalize('hello world');
console.log(formats.titleCase); // 'Hello World'
console.log(formats.allUpper);  // 'HELLO WORLD'

// Array operations
const shuffled = arrayUtils([1, 2, 3, 4], { mode: 'shuffle' });
console.log(shuffled); // [3, 1, 4, 2] (random order)

// Deep cloning
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original, { mode: 'json' });
```

## API Reference

### String Utilities

#### `capitalize(str, options)`

Capitalize strings with various formatting options.

```javascript
import { capitalize } from '@cabdi_waaxid/utils';

// Basic capitalization
capitalize('hello world', { mode: 'firstUpper' }); // 'Hello world'

// Title case
capitalize('hello world', { mode: 'titleCase' }); // 'Hello World'

// All uppercase
capitalize('hello world', { mode: 'allUpper' }); // 'HELLO WORLD'

// Get all formats
const formats = capitalize('hello world');
console.log(formats.firstUpper); // 'Hello world'
console.log(formats.titleCase);  // 'Hello World'
console.log(formats.allLower);   // 'hello world'
```

**Options:**
- `mode`: 'firstUpper' | 'allUpper' | 'allLower' | 'titleCase' | 'upperByIndex' | 'lowerByIndex'
- `index`: Index for character/word operations (default: 0)
- `char`: Operate on characters (boolean)
- `word`: Operate on words (boolean)
- `every`: Apply to every occurrence (boolean)

#### `truncate(str, options)`

Truncate strings with various strategies.

```javascript
import { truncate } from '@cabdi_waaxid/utils';

// End truncation
truncate('This is a very long string', { 
  mode: 'end', 
  length: 10 
}); // 'This is a...'

// Middle truncation
truncate('This is a very long string', {
  mode: 'middle',
  length: 15
}); // 'This is...string'

// Smart truncation (at word boundary)
truncate('This is a very long string', {
  mode: 'smart', 
  length: 12
}); // 'This is a...'

// Custom omission
truncate('Long text here', {
  mode: 'end',
  length: 8,
  omission: ' […]'
}); // 'Long tex […]'
```

**Options:**
- `mode`: 'end' | 'start' | 'middle' | 'smart'
- `length`: Maximum length (default: 50)
- `omission`: Truncation indicator (default: '...')
- `position\**: Truncation position

### Array Utilities

#### `arrayUtils(arr, options)`

Perform various array operations.

```javascript
import { arrayUtils } from '@cabdi_waaxid/utils';

const numbers = [1, 2, 3, 4, 5];

// Reverse array
arrayUtils(numbers, { mode: 'reverse' }); // [5, 4, 3, 2, 1]

// Shuffle array
arrayUtils(numbers, { mode: 'shuffle' }); // [3, 1, 5, 2, 4] (random)

// Get first element
arrayUtils(numbers, { mode: 'first' }); // 1

// Get random element
arrayUtils(numbers, { mode: 'random' }); // 3 (random)

// All operations at once
const formats = arrayUtils(numbers);
console.log(formats.reverse); // [5, 4, 3, 2, 1]
console.log(formats.shuffle); // [2, 5, 1, 4, 3]
console.log(formats.first);   // 1
```

#### `unique(arr, options)`

Remove duplicates from arrays.

```javascript
import { unique } from '@cabdi_waaxid/utils';

const withDuplicates = [1, 2, 2, 3, 4, 4, 4, 1];

// Simple deduplication
unique(withDuplicates, { mode: 'simple' }); // [1, 2, 3, 4]

// Sorted deduplication
unique(withDuplicates, { mode: 'sorted' }); // [1, 2, 3, 4] (sorted)

const formats = unique(withDuplicates);
console.log(formats.simple); // [1, 2, 3, 4]
console.log(formats.sorted); // [1, 2, 3, 4]
```

#### `chunk(arr, options)`

Split arrays into chunks.

```javascript
import { chunk } from '@cabdi_waaxid/utils';

const array = [1, 2, 3, 4, 5, 6, 7];

// Fixed-size chunks
chunk(array, { mode: 'fixed', size: 2 }); // [[1, 2], [3, 4], [5, 6], [7]]

// Overlapping chunks
chunk(array, { mode: 'overlapping', size: 3 }); 
// [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]

// Fill incomplete chunks
chunk(array, { mode: 'fill', size: 3, fillValue: 0 });
// [[1, 2, 3], [4, 5, 6], [7, 0, 0]]
```

**Options:**
- `mode`: 'fixed' | 'overlapping' | 'fill'
- `size\**: Chunk size (default: 2)
- `fillValue\**: Value to fill incomplete chunks

### Object Utilities

#### `deepClone(obj, options)`

Create deep clones of objects.

```javascript
import { deepClone } from '@cabdi_waaxid/utils';

const original = { 
  a: 1, 
  b: { 
    c: 2,
    d: [3, 4, 5]
  } 
};

// JSON-based clone
deepClone(original, { mode: 'json' });

// Structured clone (if available)
deepClone(original, { mode: 'structured' });

// Recursive clone
deepClone(original, { mode: 'recursive' });

// Compare all methods
const formats = deepClone(original);
console.log(formats.json);       // JSON method
console.log(formats.structured); // structuredClone API
console.log(formats.recursive);  // Custom recursive
```

#### `merge(target, source, options)`

Merge objects with various strategies.

```javascript
import { merge } from '@cabdi_waaxid/utils';

const obj1 = { a: 1, b: { c: 2 }, d: [1, 2] };
const obj2 = { b: { d: 3 }, e: 4, d: [3, 4] };

// Shallow merge
merge(obj1, obj2, { mode: 'shallow' });
// { a: 1, b: { d: 3 }, d: [3, 4], e: 4 }

// Deep merge
merge(obj1, obj2, { mode: 'deep' });
// { a: 1, b: { c: 2, d: 3 }, d: [3, 4], e: 4 }

// Array concatenation
merge(obj1, obj2, { mode: 'concat' });
// { a: 1, b: { d: 3 }, d: [1, 2, 3, 4], e: 4 }
```

### Math Utilities

#### `random(options)`

Generate random values with various distributions.

```javascript
import { random } from '@cabdi_waaxid/utils';

// Random integer
random({ mode: 'integer', min: 1, max: 100 }); // 42

// Random float
random({ mode: 'uniform', min: 0, max: 1 }); // 0.754

// Boolean
random({ mode: 'boolean' }); // true

// Normal distribution
random({ mode: 'normal', min: 0, max: 100 }); // 54.32

// Pick from array
random({ 
  mode: 'pickFromArray', 
  array: ['apple', 'banana', 'orange'] 
}); // 'banana'

// All distributions
const formats = random({ min: 0, max: 100 });
console.log(formats.uniform);    // Uniform distribution
console.log(formats.normal);     // Normal distribution
console.log(formats.integer);    // Integer
console.log(formats.boolean);    // Boolean
```

### Date Utilities

#### `formatDate(date, options)`

Format dates with various patterns.

```javascript
import { formatDate } from '@cabdi_waaxid/utils';

const date = new Date('2023-10-15T14:30:00Z');

// ISO format
formatDate(date, { mode: 'iso' }); // '2023-10-15T14:30:00.000Z'

// Locale format
formatDate(date, { mode: 'locale' }); // '10/15/2023'

// Relative time
formatDate(new Date(Date.now() - 300000), { mode: 'relative' }); // '5 minutes ago'

// Custom format
formatDate(date, { 
  mode: 'custom', 
  pattern: 'YYYY-MM-DD HH:mm:ss' 
}); // '2023-10-15 14:30:00'

// All formats
const formats = formatDate(date);
console.log(formats.iso);      // ISO string
console.log(formats.locale);   // Localized date
console.log(formats.relative); // Relative time
console.log(formats.custom);   // Custom format
```

## Advanced Usage

### Function Composition

```javascript
import { capitalize, truncate } from '@cabdi_waaxid/utils';

const processText = (text) => {
  const capitalized = capitalize(text, { mode: 'titleCase' });
  return truncate(capitalized, { mode: 'end', length: 20 });
};

processText('this is a very long text that needs processing');
// 'This Is A Very Long...'
```

### Batch Processing

```javascript
import { arrayUtils, chunk } from '@cabdi_waaxid/utils';

const processInBatches = (data, batchSize = 10) => {
  const batches = chunk(data, { mode: 'fixed', size: batchSize });
  
  return batches.map(batch => 
    arrayUtils(batch, { mode: 'shuffle' })
  );
};
```

## Contributing

We welcome contributions!

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Cabdi Waaxid Siciid**

- GitHub: [@cabdiwaaxid-so](https://github.com/cabdiwaaxid-so)
- Email: [Cabdi Waaxid Siciid](cabdiwaaxidsiciid100@gmail.com)

## Support

If you find this library useful, please give it a star on GitHub!