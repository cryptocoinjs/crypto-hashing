# Crypto Hashing

Provides a common interface for cryptographic hash functions commonly used in cryptocoin protocols.

## Usage
If only interested in sub-set of hashes, reference just that function of the exported module:

```js
var sha256 = require('crypto-hashing').sha256;

console.log(sha256('hello'));
console.log(sha256.x2('hello'));
```

Or reference the whole module for all the functions:

```js
var hash = require('crypto-hashing');

console.log(hash.sha256('hello'));
console.log(hash.ripemd160('hello'));
```

## Test

Unit tests are written in [Mocha](http://visionmedia.github.io/mocha/). To run the test suite, install mocha either by installing it globally or installing the development dependencies with NPM. Then, from within the project's folder run `mocha`.



