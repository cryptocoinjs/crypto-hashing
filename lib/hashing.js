'use strict'
var crypto = require('crypto');
var binstring = require('binstring');

var doCrypto = function doCrypto(algo, message, options) {
  options = options || {};
  if (!options.out) options.out = 'buffer';
  var c = crypto.createHash(algo);
  var tmp = { out: 'buffer' };
  if (typeof options.in !== 'undefined') {
    tmp.in = options.in;
  }
  message = binstring(message, tmp); // Convert input into Buffer
  c.update(message);
  var rs = c.digest().slice(0);
  return binstring(rs, {out: options.out});
};

var sha256 = exports.sha256 = function sha256(message, options) {
  return doCrypto('sha256', message, options);
};

sha256.x2 = function x2(message, options) {
  options = options || {};
  var inner = { out: 'buffer' };
  if (typeof options.in !== 'undefined') {
    inner.in = options.in;
  }
  var outer = { in: 'buffer' };
  if (typeof options.out !== 'undefined') {
    outer.out = options.out;
  }
  return sha256(sha256(message, inner), outer);
};

var sha512 = exports.sha512 = function sha512(message, options) {
  return doCrypto('sha512', message, options);
};

var ripemd160 = exports.ripemd160 = function ripemd160(message, options) {
  return doCrypto('ripemd160', message, options);
};
