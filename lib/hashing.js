'use strict'
var crypto = require('crypto');
var binstring = require('binstring');

var doCrypto = function doCrypto(algo, message, options) {
  options = options || {};
  if (!options.out) options.out = 'buffer';

  var tmp = { out: 'buffer' };
  if (typeof options.in !== 'undefined') {
    tmp.in = options.in;
  }
  message = binstring(message, tmp); // Convert input into Buffer

  if (algo === 'ripemd160' && process.browser) { //browserify doesn't support ripemd160 yet
    var ripe160 = require('ripemd160'); //use our own ripemd160
    return binstring(ripe160(message), {out: options.out});
  } else {
    var c = crypto.createHash(algo);
    
    c.update(message);
    var rs = c.digest().slice(0);
    return binstring(rs, {out: options.out});
  }
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

//BitcoinJS doesn't have the "md" in their equivalent function
var sha256ripe160 = exports.sha256ripe160 = function sha256ripe160(message, options) {
  options = options || {};
  var shaData = doCrypto('sha256', message, {in: options.in, out: 'buffer'});
  var ripeData = doCrypto('ripemd160', shaData, {in: 'buffer', out: options.out});
  return ripeData;
}
exports.sha256ripemd160 = exports.sha256ripe160;
