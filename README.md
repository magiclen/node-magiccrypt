MagicCrypt
=================================

[![CI](https://github.com/magiclen/node-magiccrypt/actions/workflows/ci.yml/badge.svg)](https://github.com/magiclen/node-magiccrypt/actions/workflows/ci.yml)

MagicCrypt is a Java/PHP/NodeJS/Rust library to encrypt/decrypt strings, files, or data, using Data Encryption Standard(DES) or Advanced Encryption Standard(AES) algorithms. It supports CBC block cipher mode, PKCS7 padding and 64, 128, 192 or 256-bits key length. If the encrypted data is a string, it will be formatted automatically to Base64.

## Security Notice

MagicCrypt uses an older encryption design and is not recommended for new projects.

For new applications, please use a modern library that supports authenticated encryption. Authenticated encryption can protect encrypted data from both reading and unauthorized changes.

## Requirements and Installation

Node.js 24 or later and Rust 1.89 or later are required. Install Rust with [rustup](https://rustup.rs/) and the native linker for your platform (a C compiler on Linux/macOS or the MSVC build tools on Windows).

```sh
npm install magiccrypt
```

Installation compiles the native module from source using the included `Cargo.lock`. There are no prebuilt platform packages. Package managers that block dependency build scripts must allow the `magiccrypt` install script; for pnpm, approve `magiccrypt` with `pnpm approve-builds` and rebuild it with `pnpm rebuild magiccrypt`. If npm requires script approval, use `npm install-scripts approve magiccrypt` followed by `npm rebuild magiccrypt`.

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
