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
                throw new Error("The bit must be 64, 128, 192 or 256!");
        }

        this.native = new NativeMagicCrypt(key, bit, iv);
    }

    encrypt(str: string): string {
        return this.encryptData(Buffer.from(str, "utf8"));
    }

    encryptData(data: Uint8Array): string {
        return this.native.encrypt(data);
    }

    decrypt(dataBase64: string): string {
        return this.native.decryptToString(dataBase64);
    }

    decryptData(dataBase64: string): Buffer {
        return this.native.decrypt(dataBase64);
    }
}
