'use strict'
var test = require('tape').test
var vectors = require('hash-test-vectors')
var cryptoHash = require('../')

vectors.forEach(function (vector, i) {
  var input = new Buffer(vector.input, 'base64')

  var algs = ['ripemd160', 'sha1', 'sha256', 'sha512']
  algs.forEach(function (alg) {
    test(alg + '#' + i, function (t) {
      t.same(cryptoHash(alg, input).toString('hex'), vector[alg])
      t.end()
    })
  })

  test('hash160#' + i, function (t) {
    var expected = cryptoHash('ripemd160', cryptoHash('sha256', input))
    t.same(cryptoHash('hash160', input), expected)
    t.end()
  })

  test('hash256#' + i, function (t) {
    var expected = cryptoHash('sha256', cryptoHash('sha256', input))
    t.same(cryptoHash('hash256', input), expected)
    t.end()
  })
})
