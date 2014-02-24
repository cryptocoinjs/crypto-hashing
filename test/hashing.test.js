var hash = require('../lib/hashing.js');
var assert = require('assert');

describe('Hashing library', function() {
  describe('SHA256()', function() {
    it('should hash byte array', function() {
      assert.equal(hash.sha256([1,2,3,4,5]).toString('hex'), '74f81fe167d99b4cb41d6d0ccda82278caee9f3e2f25d5e5a3936ff3dcec60d0');
    });
    it('should hash a buffer', function() {
      assert.equal(hash.sha256(new Buffer([1,2,3,4,5])).toString('hex'), '74f81fe167d99b4cb41d6d0ccda82278caee9f3e2f25d5e5a3936ff3dcec60d0');
    });
    it('should hash hex string', function() {
      assert.equal(hash.sha256('0102030405', {in:'hex'}).toString('hex'), '74f81fe167d99b4cb41d6d0ccda82278caee9f3e2f25d5e5a3936ff3dcec60d0');
    });
    it('should hash "0x"-prefixed hex string', function() {
      assert.equal(hash.sha256('0x0102030405').toString('hex'), '74f81fe167d99b4cb41d6d0ccda82278caee9f3e2f25d5e5a3936ff3dcec60d0');
    });
    it('should hash binary string', function() {
      // printf "hello" | shasum -a 256
      assert.equal(hash.sha256('hello').toString('hex'), '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
    })
    it('should output a hex string', function() {
      assert.equal(hash.sha256('0102030405', {in:'hex', out:'hex'}), '74f81fe167d99b4cb41d6d0ccda82278caee9f3e2f25d5e5a3936ff3dcec60d0');
    });
    it('should output a byte array', function() {
      assert.equal(hash.sha256('0102030405', {in:'hex', out:'bytes'}).join(','), '116,248,31,225,103,217,155,76,180,29,109,12,205,168,34,120,202,238,159,62,47,37,213,229,163,147,111,243,220,236,96,208');
    })
  });
  describe('SHA256.x2()', function() {
    it('should hash byte array', function() {
      assert.equal(hash.sha256.x2([1,2,3,4,5]).toString('hex'), 'a26baf5a9a07d9eb7ba10f43924dcdf3f75f0abf066cd9f0c76f983121302e01');
    });
    it('should hash a buffer', function() {
      assert.equal(hash.sha256.x2(new Buffer([1,2,3,4,5])).toString('hex'), 'a26baf5a9a07d9eb7ba10f43924dcdf3f75f0abf066cd9f0c76f983121302e01');
    });
    it('should hash hex string', function() {
      assert.equal(hash.sha256.x2('0102030405', {in:'hex'}).toString('hex'), 'a26baf5a9a07d9eb7ba10f43924dcdf3f75f0abf066cd9f0c76f983121302e01');
    });
    it('should hash "0x"-prefixed hex string', function() {
      assert.equal(hash.sha256.x2('0x0102030405').toString('hex'), 'a26baf5a9a07d9eb7ba10f43924dcdf3f75f0abf066cd9f0c76f983121302e01');
    });
    it('should hash binary string', function() {
      assert.equal(hash.sha256.x2('hello').toString('hex'), '9595c9df90075148eb06860365df33584b75bff782a510c6cd4883a419833d50');
    })
    it('should output a hex string', function() {
      assert.equal(hash.sha256.x2('0102030405', {in:'hex', out:'hex'}), 'a26baf5a9a07d9eb7ba10f43924dcdf3f75f0abf066cd9f0c76f983121302e01');
    });
    it('should output a byte array', function() {
      assert.equal(hash.sha256.x2('0102030405', {in:'hex', out:'bytes'}).join(','), '162,107,175,90,154,7,217,235,123,161,15,67,146,77,205,243,247,95,10,191,6,108,217,240,199,111,152,49,33,48,46,1');
    });
    it('should calculate genesis block', function() {
    var genesis = '01000000'+ // version
      '0000000000000000000000000000000000000000000000000000000000000000'+ // previous block
      '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'+ // merkle root
      '29ab5f49'+ // timestamp
      'ffff001d'+ // difficulty
      '1dac2b7c'; // nonce
      assert.equal(hash.sha256.x2(genesis, {in:'hex'}).toString('hex'), '6fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000');
    });
  });
  describe('SHA512()', function() {
    it('should hash byte array', function() {
      assert.equal(hash.sha512([1,2,3,4,5]).toString('hex'), '50540bc4ae31875fceb3829434c55e3c2b66ddd7227a883a3b4cc8f6cda965ad1712b3ee0008f9cee08da93f5234c1a7bf0e2570ef56d65280ffea691b953efe');
    });
    it('should hash a buffer', function() {
      assert.equal(hash.sha512(new Buffer([1,2,3,4,5])).toString('hex'), '50540bc4ae31875fceb3829434c55e3c2b66ddd7227a883a3b4cc8f6cda965ad1712b3ee0008f9cee08da93f5234c1a7bf0e2570ef56d65280ffea691b953efe');
    });
    it('should hash hex string', function() {
      assert.equal(hash.sha512('0102030405', {in:'hex'}).toString('hex'), '50540bc4ae31875fceb3829434c55e3c2b66ddd7227a883a3b4cc8f6cda965ad1712b3ee0008f9cee08da93f5234c1a7bf0e2570ef56d65280ffea691b953efe');
    });
    it('should hash "0x"-prefixed hex string', function() {
      assert.equal(hash.sha512('0x0102030405').toString('hex'), '50540bc4ae31875fceb3829434c55e3c2b66ddd7227a883a3b4cc8f6cda965ad1712b3ee0008f9cee08da93f5234c1a7bf0e2570ef56d65280ffea691b953efe');
    });
    it('should hash binary string', function() {
      // printf "hello" | shasum -a 512
      assert.equal(hash.sha512('hello').toString('hex'), '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043');
    })
    it('should output a hex string', function() {
      assert.equal(hash.sha512('0102030405', {in:'hex', out:'hex'}), '50540bc4ae31875fceb3829434c55e3c2b66ddd7227a883a3b4cc8f6cda965ad1712b3ee0008f9cee08da93f5234c1a7bf0e2570ef56d65280ffea691b953efe');
    });
    it('should output a byte array', function() {
      assert.equal(hash.sha512('0102030405', {in:'hex', out:'bytes'}).join(','), '80,84,11,196,174,49,135,95,206,179,130,148,52,197,94,60,43,102,221,215,34,122,136,58,59,76,200,246,205,169,101,173,23,18,179,238,0,8,249,206,224,141,169,63,82,52,193,167,191,14,37,112,239,86,214,82,128,255,234,105,27,149,62,254');
    })
  });
  describe('RIPEMD160()', function() {
    it('should hash byte array', function() {
      assert.equal(hash.ripemd160([1,2,3,4,5]).toString('hex'), 'eb825c4b24f425077a067cc3bef457783f5ad705');
    });
    it('should hash a buffer', function() {
      assert.equal(hash.ripemd160(new Buffer([1,2,3,4,5])).toString('hex'), 'eb825c4b24f425077a067cc3bef457783f5ad705');
    });
    it('should hash hex string', function() {
      assert.equal(hash.ripemd160('0102030405', {in:'hex'}).toString('hex'), 'eb825c4b24f425077a067cc3bef457783f5ad705');
    });
    it('should hash "0x"-prefixed hex string', function() {
      assert.equal(hash.ripemd160('0x0102030405').toString('hex'), 'eb825c4b24f425077a067cc3bef457783f5ad705');
    });
    it('should hash binary string', function() {
      assert.equal(hash.ripemd160('hello').toString('hex'), '108f07b8382412612c048d07d13f814118445acd');
    })
    it('should output a hex string', function() {
      assert.equal(hash.ripemd160('0102030405', {in:'hex', out:'hex'}), 'eb825c4b24f425077a067cc3bef457783f5ad705');
    });
    it('should output a byte array', function() {
      assert.equal(hash.ripemd160('0102030405', {in:'hex', out:'bytes'}).join(','), '235,130,92,75,36,244,37,7,122,6,124,195,190,244,87,120,63,90,215,5');
    })
  });

  describe('+ sha256ripe160()', function() {
    it('should perform the sha256 and then the ripemd 160', function() {
      //taken from: http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
      var inHex = "04d0988bfa799f7d7ef9ab3de97ef481cd0f75d2367ad456607647edde665d6f6fbdd594388756a7beaf73b4822bc22d36e9bda7db82df2b8b623673eefc0b7495";
      var outHex = "3c176e659bea0f29a3e9bf7880c112b1b31b4dc8";

      assert.equal(hash.sha256ripe160(inHex, {in: 'hex', out: 'hex'}), outHex);
    })
  })
});