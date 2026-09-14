import { Buffer } from "node:buffer";

import { NativeMagicCrypt } from "../native/index.cjs";

export type Bit = 64 | 128 | 192 | 256;

export class MagicCrypt {
    private readonly native: NativeMagicCrypt;

    constructor(key = "", bit: Bit = 128, iv = "") {
        // Validate before N-API converts the number to an integer.
        switch (bit) {
            case 64:
            case 128:
            case 192:
            case 256:
                break;
            default:
                throw new Error(
                    "The key must be 8 bytes(64 bits), 16 bytes(128 bits), 24 bytes(192 bits) or 32 bytes(256 bits)!",
                );
        }

        this.native = new NativeMagicCrypt(key, bit, iv);
    }

    encrypt(str: string): string {
        return this.encryptData(Buffer.from(str, "utf8"));
    }

    encryptData(dataBuffer: Buffer): string {
        return this.native.encrypt(dataBuffer).toString("base64");
    }

    decrypt(str: string): string {
        return this.decryptData(str).toString("utf8");
    }

    decryptData(dataBase64: string): Buffer {
        return this.native.decrypt(Buffer.from(dataBase64, "base64"));
    }
}
