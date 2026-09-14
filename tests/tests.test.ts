import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { describe, it } from "node:test";

import { MagicCrypt } from "../src/index.ts";
import type { Bit } from "../src/index.ts";

const vectors: { bit: Bit; ciphertext: string; ciphertextWithIV: string }[] = [
    {
        bit: 64,
        ciphertext: "nqIQCAbQ0TKs6x6eGRdwrouES803NhvC",
        ciphertextWithIV: "Wn9566qFK9g/SD0OPKHAZz3Q/2pAGVbz",
    },
    {
        bit: 128,
        ciphertext: "Pdpj9HqTAN7vY7Z9msMzlIXJcNQ5N+cIJsiQhLqyjVI=",
        ciphertextWithIV: "dQcxpt67DG7+kMiSj+HyjRjjDisy1iZpyvxVJRVKKZ4=",
    },
    {
        bit: 192,
        ciphertext: "p0X9IHMqaxA78T0X8Y9DnNeEmVXIgUxrXmeyUEO1Muo=",
        ciphertextWithIV: "uqTD7ZesaVEHnlT801hM+T8nqY8lTVWwYoNe1OsMA04=",
    },
    {
        bit: 256,
        ciphertext: "DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=",
        ciphertextWithIV: "ixCZtfFVt01DgOX+WmsqERcd1efq/yVpGLc5SfTVYXc=",
    },
];

for (const { bit, ciphertext, ciphertextWithIV } of vectors) {
    describe(`MagicCrypt ${bit}`, () => {
        it("encrypts a string to the existing ciphertext", () => {
            const mc = new MagicCrypt("magickey", bit);
            assert.equal(mc.encrypt("http://magiclen.org"), ciphertext);
        });

        it("decrypts the existing ciphertext", () => {
            const mc = new MagicCrypt("magickey", bit);
            assert.equal(mc.decrypt(ciphertext), "http://magiclen.org");
        });

        it("encrypts and decrypts buffers using the same ciphertext", () => {
            const mc = new MagicCrypt("magickey", bit);
            const data = Buffer.from("http://magiclen.org", "utf8");
            assert.equal(mc.encryptData(data), ciphertext);
            assert.deepEqual(mc.decryptData(ciphertext), data);
        });

        it("matches the Rust library's custom IV vector", () => {
            const mc = new MagicCrypt("magickey", bit, "123456789");
            assert.equal(mc.encrypt("https://magiclen.org"), ciphertextWithIV);
            assert.equal(mc.decrypt(ciphertextWithIV), "https://magiclen.org");
        });

        it("round trips a binary buffer slice without changing the input", () => {
            const mc = new MagicCrypt("magickey", bit);
            const data = Buffer.from([9, 0, 128, 255, 4, 0, 7]).subarray(1, 6);
            const original = Buffer.from(data);
            const encrypted = mc.encryptData(data);
            assert.deepEqual(data, original);
            assert.deepEqual(mc.decryptData(encrypted), original);
        });

        it("round trips empty strings and buffers", () => {
            const mc = new MagicCrypt("magickey", bit);
            const encrypted = mc.encrypt("");
            assert.equal(mc.decrypt(encrypted), "");
            assert.equal(mc.encryptData(Buffer.alloc(0)), encrypted);
            assert.deepEqual(mc.decryptData(encrypted), Buffer.alloc(0));
        });
    });
}

describe("Unicode", () => {
    it("preserves Unicode keys, IVs, and text", () => {
        const mc = new MagicCrypt("密鑰🔑", 256, "初始向量");
        const ciphertext = "D7hEU87rDnDxRVu5H8w6w+AKbIXkPf1PoEpnoeO9z1o=";
        assert.equal(mc.encrypt("繁體中文與 emoji 🌏"), ciphertext);
        assert.equal(mc.decrypt(ciphertext), "繁體中文與 emoji 🌏");
    });
});
