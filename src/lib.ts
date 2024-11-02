import crypto from "node:crypto";

import {
    crc64We,
    md5,
    sha256,
    tiger192,
} from "../index.cjs";

export type Bit = 64 | 128 | 192 | 256;

export class MagicCrypt {
    private key: Buffer;

    private iv: Buffer;

    private algorithm: string;

    constructor(key = "", bit: Bit = 128, iv = "") {
        let mKey: Buffer;
        let mIV: Buffer;

        switch (bit) {
            case 64:
                mKey = crc64We(key);
                if (iv !== "") {
                    mIV = crc64We(iv);
                } else {
                    mIV = Buffer.from([
                        0, 0, 0, 0, 0, 0, 0, 0,
                    ]);
                }
                break;
            case 128:
            case 192:
            case 256:
                switch (bit) {
                    case 128:
                        mKey = md5(key);
                        break;
                    case 192: {
                        mKey = tiger192(key);
                        break;
                    }
                    case 256:
                        mKey = sha256(key);
                        break;
                }

                if (iv !== "") {
                    mIV = md5(iv);
                } else {
                    mIV = Buffer.from([
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    ]);
                }
                break;
            default:
                throw new Error("The key must be 8 bytes(64 bits), 16 bytes(128 bits), 24 bytes(192 bits) or 32 bytes(256 bits)!");
        }

        const mBit = bit;

        this.algorithm = mBit > 64 ? `aes-${mBit}-cbc` : "des-cbc";
        this.key = mKey;
        this.iv = mIV;
    }

    encrypt(str: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let crypted = cipher.update(str, "utf8", "base64");
        crypted += cipher.final("base64");
        return crypted;
    }

    encryptData(dataBuffer: Buffer): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        const crypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);
        return crypted.toString("base64");
    }

    decrypt(str: string): string {
        const cipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = cipher.update(str, "base64", "utf-8");
        decrypted += cipher.final("utf-8");
        return decrypted;
    }

    decryptData(dataBase64: string): Buffer {
        const cipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        const decrypted = Buffer.concat([cipher.update(dataBase64, "base64"), cipher.final()]);
        return decrypted;
    }
}
