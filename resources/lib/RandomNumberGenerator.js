/// <reference path="globals.d.ts" />
var RandomNumberGenerator;
(function (RandomNumberGenerator) {
    function CanUseCrypto() {
        return typeof crypto === "object"
            && typeof crypto.getRandomValues === "function";
    }
    function CanUseMsCrypto() {
        return typeof msCrypto === "object"
            && typeof msCrypto.getRandomValues === "function";
    }
    /**
     * Returns true if cryptographically secure random numbers can be generated.
     *
     * This function checks if the web crypto API is available.
     * @returns {boolean} True if secure random numbers can be generated.
     */
    function CanGenerateSecureNumbers() {
        return CanUseCrypto() || CanUseMsCrypto();
    }
    RandomNumberGenerator.CanGenerateSecureNumbers = CanGenerateSecureNumbers;
    /**
     * Returns a new random number between 0 (inclusive) and 1 (exclusive).
     *
     * This function returns a cryptographically secure random number if it can,
     * a number from {@link Math.Random} if it cannot.
     * @returns {number} A new random number between 0 (inclusive) and 1
     *                   (exclusive)
     * @see RandomNumberGenerator.CanGenerateSecureNumbers
     */
    function GenerateRandom() {
        if (CanUseCrypto()) {
            var buffer = new Uint32Array(1);
            crypto.getRandomValues(buffer);
            return buffer[0] / 4294967296;
        }
        else if (CanUseMsCrypto()) {
            var buffer = new Uint32Array(1);
            msCrypto.getRandomValues(buffer);
            return buffer[0] / 4294967296;
        }
        return Math.random();
    }
    RandomNumberGenerator.GenerateRandom = GenerateRandom;
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
    function GenerateRandomNumber(min, max, precision) {
        if (precision === void 0) { precision = 0; }
        var _a;
        if (max < min)
            _a = [max, min], min = _a[0], max = _a[1];
        max += Math.pow(10, -precision);
        return Math.floor((GenerateRandom() * (max - min) + min) * Math.pow(10, precision))
            / Math.pow(10, precision);
    }
    RandomNumberGenerator.GenerateRandomNumber = GenerateRandomNumber;
    /**
     * Generates a new random string of the specified length.
     * @param length The length of string to generate.
     * @param source A string of characters to use to generate the string.
     */
    function GenerateRandomString(length, source) {
        if (source === void 0) { source = "abcdefghijklmnopqrstuvwxyz1234567890"; }
        var output = [];
        for (var i = 0; i < length; i++) {
            output.push(source[GenerateRandomNumber(0, source.length - 1)]);
        }
        return output.join("");
    }
    RandomNumberGenerator.GenerateRandomString = GenerateRandomString;
})(RandomNumberGenerator || (RandomNumberGenerator = {}));
