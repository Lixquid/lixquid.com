/// <reference path="globals.d.ts" />

namespace RandomNumberGenerator {
    function CanUseCrypto(): boolean {
        return typeof crypto === "object"
            && typeof crypto.getRandomValues === "function";
    }
    function CanUseMsCrypto(): boolean {
        return typeof msCrypto === "object"
            && typeof msCrypto.getRandomValues === "function";
    }

    /**
     * Returns true if cryptographically secure random numbers can be generated.
     *
     * This function checks if the web crypto API is available.
     * @returns {boolean} True if secure random numbers can be generated.
     */
    export function CanGenerateSecureNumbers(): boolean {
        return CanUseCrypto() || CanUseMsCrypto();
    }

    /**
     * Returns a new random number between 0 (inclusive) and 1 (exclusive).
     *
     * This function returns a cryptographically secure random number if it can,
     * a number from {@link Math.Random} if it cannot.
     * @returns {number} A new random number between 0 (inclusive) and 1
     *                   (exclusive)
     * @see RandomNumberGenerator.CanGenerateSecureNumbers
     */
    export function GenerateRandom(): number {
        if (CanUseCrypto()) {
            var buffer = new Uint32Array(1);
            crypto.getRandomValues(buffer);
            return buffer[0] / 0x1_0000_0000;
        } else if (CanUseMsCrypto()) {
            var buffer = new Uint32Array(1);
            msCrypto.getRandomValues(buffer);
            return buffer[0] / 0x1_0000_0000;
        }
        return Math.random();
    }

    /**
     * Generates a random number between the specified minimum and maximum,
     * inclusive.
     *
     * If the maximum is below the minimum, the values will be inverted to
     * support negative ranges.
     * @param min The minimum value to generate.
     * @param max The maximum value to generate.
     * @param precision The number of decimal places to generate numbers with.
     */
    export function GenerateRandomNumber(
        min: number,
        max: number,
        precision: number = 0
    ): number {
        if (max < min) [min, max] = [max, min];
        max += 10 ** -precision;
        return Math.floor(
            (GenerateRandom() * (max - min) + min) * 10 ** precision)
            / 10 ** precision;
    }

    /**
     * Generates a new random string of the specified length.
     * @param length The length of string to generate.
     * @param source A string of characters to use to generate the string.
     */
    export function GenerateRandomString(
        length: number,
        source: string = "abcdefghijklmnopqrstuvwxyz1234567890"
    ): string {
        const output: string[] = [];

        for (let i = 0; i < length; i++) {
            output.push(source[GenerateRandomNumber(0,source.length - 1)]);
        }

        return output.join("");
    }
}