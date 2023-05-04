import { MagicCrypt } from "../src/lib.js";

const getNodeMajorVersion = (): number => {
    const version = process.version;

    return parseInt(version.substring(1, version.indexOf(".")));
};

const NODE_VERSION = getNodeMajorVersion();

describe("Encrypt", function () {
    it("should encrypt a string by AES-256", function () {
        const mc = new MagicCrypt("magickey", 256);
        const result = mc.encrypt("http://magiclen.org");
        
        expect(result).toBe("DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=");
    });

    it("should encrypt a string by AES-192", function () {
        const mc = new MagicCrypt("magickey", 192);
        const result = mc.encrypt("http://magiclen.org");

        expect(result).toBe("p0X9IHMqaxA78T0X8Y9DnNeEmVXIgUxrXmeyUEO1Muo=");
    });

    it("should encrypt a string by AES-128", function () {
        const mc = new MagicCrypt("magickey", 128);
        const result = mc.encrypt("http://magiclen.org");

        expect(result).toBe("Pdpj9HqTAN7vY7Z9msMzlIXJcNQ5N+cIJsiQhLqyjVI=");
    });

    if (NODE_VERSION <= 16) {
        it("should encrypt a string by DES-64", function () {
            const mc = new MagicCrypt("magickey", 64);
            const result = mc.encrypt("http://magiclen.org");
        
            expect(result).toBe("nqIQCAbQ0TKs6x6eGRdwrouES803NhvC");
        });
    }

    it("should encrypt a buffer by AES-256", function () {
        const mc = new MagicCrypt("magickey", 256);
        const result = mc.encryptData(Buffer.from("http://magiclen.org", "utf8"));

        expect(result).toBe("DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=");
    });
});

describe("Decrypt", function () {
    it("should decrypt a string by AES-256", function () {
        const mc = new MagicCrypt("magickey", 256);
        const result = mc.decrypt("DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=");

        expect(result).toBe("http://magiclen.org");
    });

    it("should decrypt a string by AES-192", function () {
        const mc = new MagicCrypt("magickey", 192);
        const result = mc.decrypt("p0X9IHMqaxA78T0X8Y9DnNeEmVXIgUxrXmeyUEO1Muo=");

        expect(result).toBe("http://magiclen.org");
    });

    it("should decrypt a string by AES-128", function () {
        const mc = new MagicCrypt("magickey", 128);
        const result = mc.decrypt("Pdpj9HqTAN7vY7Z9msMzlIXJcNQ5N+cIJsiQhLqyjVI=");

        expect(result).toBe("http://magiclen.org");
    });

    if (NODE_VERSION <= 16) {
        it("should decrypt a string by DES-64", function () {
            const mc = new MagicCrypt("magickey", 64);
            const result = mc.decrypt("nqIQCAbQ0TKs6x6eGRdwrouES803NhvC");

            expect(result).toBe("http://magiclen.org");
        });
    }

    it("should decrypt a buffer by AES-256", function () {
        const mc = new MagicCrypt("magickey", 256);
        const result = mc.decryptData("DS/2U8royDnJDiNY2ps3f6ZoTbpZo8ZtUGYLGEjwLDQ=");

        expect(result.toString("utf8")).toBe("http://magiclen.org");
    });
});
