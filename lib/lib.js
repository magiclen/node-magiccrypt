"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const node_crc_1 = __importDefault(require("node-crc"));
const hash = require("mhash");
class MagicCrypt {
    bit;
    key;
    iv;
    algorithm;
    constructor(key = "", bit = 128, iv = "") {
        this.bit = bit;
        let mKey;
        let mBit;
        let mIV;
        switch (bit) {
            case 64:
                mKey = node_crc_1.default.crc64we(Buffer.from(key, "utf8"));
                if (iv !== "") {
                    mIV = node_crc_1.default.crc64we(Buffer.from(iv, "utf8"));
                }
                else {
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
                        key = hash("md5", key);
                        break;
                    case 192: {
                        const temp = hash("tiger192", key);
                        // Convert to tiger192,3
                        key = "";
                        for (let i = 0; i < 3; i++) {
                            for (let j = 7; j >= 0; j--) {
                                key += temp.substr((i * 16) + (j * 2), 2);
                            }
                        }
                        break;
                    }
                    case 256:
                        key = hash("sha256", key);
                        break;
                }
                mKey = Buffer.from(key, "hex");
                if (iv !== "") {
                    iv = hash("MD5", iv);
                    mIV = Buffer.from(iv, "hex");
                }
                else {
                    mIV = Buffer.from([
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    ]);
                }
                break;
            default:
                throw new Error("The key must be 8 bytes(64 bits), 16 bytes(128 bits), 24 bytes(192 bits) or 32 bytes(256 bits)!");
        }
        mBit = bit;
        this.algorithm = (mBit > 64) ? "aes-" + mBit + "-cbc" : "des-cbc";
        this.key = mKey;
        this.iv = mIV;
    }
    encrypt(str) {
        const cipher = crypto_1.default.createCipheriv(this.algorithm, this.key, this.iv);
        let crypted = cipher.update(str, "utf8", "base64");
        crypted += cipher.final("base64");
        return crypted;
    }
    encryptData(dataBuffer) {
        const cipher = crypto_1.default.createCipheriv(this.algorithm, this.key, this.iv);
        let crypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);
        return crypted.toString("base64");
    }
    decrypt(str) {
        const cipher = crypto_1.default.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = cipher.update(str, "base64", "utf-8");
        decrypted += cipher.final("utf-8");
        return decrypted;
    }
    decryptData(dataBase64) {
        const cipher = crypto_1.default.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = Buffer.concat([cipher.update(dataBase64, "base64"), cipher.final()]);
        return decrypted;
    }
}
exports.default = MagicCrypt;
module.exports = MagicCrypt;