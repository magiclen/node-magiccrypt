/// <reference types="node" />
export type Bit = 64 | 128 | 192 | 256;
export declare class MagicCrypt {
    private key;
    private iv;
    private algorithm;
    constructor(key?: string, bit?: Bit, iv?: string);
    encrypt(str: string): string;
    encryptData(dataBuffer: Buffer): string;
    decrypt(str: string): string;
    decryptData(dataBase64: string): Buffer;
}
