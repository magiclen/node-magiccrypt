MagicCrypt
=================================

## Introduction

**MagicCrypt** is a Java/PHP/NodeJS/Rust library to encrypt/decrpyt strings, files, or data, using Data Encryption Standard(DES) or Advanced Encryption Standard(AES) algorithms. It supports `CBC` block cipher mode, `PKCS5` padding and 64, 128, 192 or 256-bits key length. If the encrypted data is a string, it will be formatted automatically to Base64.

## For Node.js

### Installation

Run `npm i` or `npm install` to install.

```bash
npm install magiccrypt
```

If you want to save this module to package.json, please add `--save` option.

```bash
npm install magiccrypt --save
```

### Initialization

Import this module by using `require` function.

```javascript
const MagicCrypt = require('magiccrypt');
```

Then, input your DES/AES key and key length to create an instance of **MagicCrypt**.

```javascript
var mc = new MagicCrypt(key, bit);
```

Also, you can set your initialization vector.

```javascript
var mc = new MagicCrypt(key, bit, iv);
```

### Encrypt

You can use **encrypt** method to encrypt any string. For example,

```javascript
var mc = new MagicCrypt('magickey', 256);
console.log(mc.encrypt('http://magiclen.org'));
```

The result is,

    DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=

To encrypt any data buffer to a base64 string,

```javascript
var mc = new MagicCrypt('magickey', 256);
console.log(mc.encryptData(buffer));
```

### Decrypt

You can use **decrypt** method to decrypt any encrypted string. For example,

```javascript
var mc = new MagicCrypt('magickey', 256);
console.log(mc.decrypt('DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ='));
```

The result is,

    http://magiclen.org

To decrypt any base64 string to data buffer,

```javascript
var mc = new MagicCrypt('magickey', 256);
var buffer = mc.decryptData(base64);
```

## For Java

Refer to [https://github.com/magiclen/MagicCrypt](https://github.com/magiclen/MagicCrypt).

## For PHP

Refer to [https://github.com/magiclen/MagicCrypt](https://github.com/magiclen/MagicCrypt).

## For Rust

Refer to [https://github.com/magiclen/rust-magiccrypt](https://github.com/magiclen/rust-magiccrypt).

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
```

## License

[Apache-2.0](LICENSE)

## What's More?

Please check out our web page at

https://magiclen.org/aes/
