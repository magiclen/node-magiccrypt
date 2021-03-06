import crypto from "crypto";

const m = require("../index.node");

type Bit = 64|128|192|256;

export default class MagicCrypt {
    private key: Buffer;

    private iv: Buffer;

    private algorithm: string;

    constructor(key = "", bit: Bit = 128, iv = "") {
        let mKey;
        let mIV;

        switch (bit) {
            case 64:
                mKey = m.crc64we(key);
                if (iv !== "") {
                    mIV = m.crc64we(iv);
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
                        key = m.md5(key);
                        break;
                    case 192: {
                        key = m.tiger192(key);
                        break;
                    }
                    case 256:
                        key = m.sha256(key);
                        break;
                }

                mKey = Buffer.from(key, "hex");
                if (iv !== "") {
                    iv = m.md5(iv);
                    mIV = Buffer.from(iv, "hex");
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

        this.algorithm = (mBit > 64) ? "aes-" + mBit + "-cbc" : "des-cbc";
        this.key = mKey as Buffer;
        this.iv = mIV as Buffer;
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

module.exports = MagicCrypt;
