MagicCrypt
=================================

[![CI](https://github.com/magiclen/node-magiccrypt/actions/workflows/ci.yml/badge.svg)](https://github.com/magiclen/node-magiccrypt/actions/workflows/ci.yml)

MagicCrypt is a Java/PHP/NodeJS/Rust library to encrypt/decrpyt strings, files, or data, using Data Encryption Standard(DES) or Advanced Encryption Standard(AES) algorithms. It supports CBC block cipher mode, PKCS5 padding and 64, 128, 192 or 256-bits key length. If the encrypted data is a string, it will be formatted automatically to Base64.

You need to set up the Rust development environment: [rustup](https://rustup.rs/)

## For Node.js

### Encrypt

You can use **encrypt** method to encrypt any string. For example,

```typescript
import { MagicCrypt } from "magiccrypt";

const mc = new MagicCrypt("magickey", 256);
console.log(mc.encrypt("http://magiclen.org"));
```

The result is,

    DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=

To encrypt any data buffer to a base64 string,

```typescript
import { MagicCrypt } from "magiccrypt";

const mc = new MagicCrypt("magickey", 256);
console.log(mc.encryptData(buffer));
```

### Decrypt

You can use **decrypt** method to decrypt any encrypted string. For example,

```typescript
import { MagicCrypt } from "magiccrypt";

const mc = new MagicCrypt("magickey", 256);
console.log(mc.decrypt("DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ="));
```

The result is,

    http://magiclen.org

To decrypt any base64 string to data buffer,

```typescript
import { MagicCrypt } from "magiccrypt";

const mc = new MagicCrypt("magickey", 256);
const buffer = mc.decryptData(base64);
```

## For Java

Refer to [https://github.com/magiclen/MagicCrypt](https://github.com/magiclen/MagicCrypt).

## For PHP

Refer to [https://github.com/magiclen/MagicCrypt](https://github.com/magiclen/MagicCrypt).

## For Rust

Refer to [https://github.com/magiclen/rust-magiccrypt](https://github.com/magiclen/rust-magiccrypt).

## License

[MIT](LICENSE)
