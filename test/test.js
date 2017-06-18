'use strict';

var expect = require('chai').expect;
var MagicCrypt = require('../index');

describe('Encrypt', function() {
    it('should encrypt a string by AES-256', function() {
        var mc = new MagicCrypt('magickey', 256);
        var result = mc.encrypt('http://magiclen.org');
        expect(result).to.equal('DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=');
    });

    it('should encrypt a string by AES-192', function() {
        var mc = new MagicCrypt('magickey', 192);
        var result = mc.encrypt('http://magiclen.org');
        expect(result).to.equal('p0X9IHMqaxA78T0X8Y9DnNeEmVXIgUxrXmeyUEO1Muo=');
    });

    it('should encrypt a string by AES-128', function() {
        var mc = new MagicCrypt('magickey', 128);
        var result = mc.encrypt('http://magiclen.org');
        expect(result).to.equal('Pdpj9HqTAN7vY7Z9msMzlIXJcNQ5N+cIJsiQhLqyjVI=');
    });

    it('should encrypt a string by DES-64', function() {
        var mc = new MagicCrypt('magickey', 64);
        var result = mc.encrypt('http://magiclen.org');
        expect(result).to.equal('nqIQCAbQ0TKs6x6eGRdwrouES803NhvC');
    });

    it('should encrypt a buffer by AES-256', function() {
        var mc = new MagicCrypt('magickey', 256);
        var result = mc.encryptData(Buffer.from('http://magiclen.org', 'utf8'));
        expect(result).to.equal('DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=');
    });
});

describe('Decrypt', function() {
    it('should decrypt a string by AES-256', function() {
        var mc = new MagicCrypt('magickey', 256);
        var result = mc.decrypt('DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=');
        expect(result).to.equal('http://magiclen.org');
    });

    it('should decrypt a string by AES-192', function() {
        var mc = new MagicCrypt('magickey', 192);
        var result = mc.decrypt('p0X9IHMqaxA78T0X8Y9DnNeEmVXIgUxrXmeyUEO1Muo=');
        expect(result).to.equal('http://magiclen.org');
    });

    it('should decrypt a string by AES-128', function() {
        var mc = new MagicCrypt('magickey', 128);
        var result = mc.decrypt('Pdpj9HqTAN7vY7Z9msMzlIXJcNQ5N+cIJsiQhLqyjVI=');
        expect(result).to.equal('http://magiclen.org');
    });

    it('should decrypt a string by DES-64', function() {
        var mc = new MagicCrypt('magickey', 64);
        var result = mc.decrypt('nqIQCAbQ0TKs6x6eGRdwrouES803NhvC');
        expect(result).to.equal('http://magiclen.org');
    });

    it('should decrypt a buffer by AES-256', function() {
        var mc = new MagicCrypt('magickey', 256);
        var result = mc.decryptData('DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=');
        expect(result.toString('utf8')).to.equal('http://magiclen.org');
    });
});
