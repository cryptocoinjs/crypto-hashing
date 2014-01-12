'use strict'
var crypto = require('crypto');
var binstring = require('binstring');

function bufferToBytes(data) {
  var rs = [];
  for (var i = 0; i < data.length; i++) {
    rs.push(data[i]);
  }
  return rs;
}

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
  var rs = c.digest();
  switch (options.out) {
    case 'buffer':
      return rs;
    case 'hex':
      return rs.toString('hex');
    case 'binary':
      return rs.toString('binary');
    case 'utf8':
      return rs.toString('utf8');
    case 'bytes':
      return bufferToBytes(rs);
    default:
      throw new Error('Output format "'+options.out+'" not understood');
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

var ripemd160 = exports.ripemd160 = function ripemd160(message, options) {
  return doCrypto('ripemd160', message, options);
};
