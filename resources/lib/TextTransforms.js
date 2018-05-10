var TextTransforms;
(function (TextTransforms) {
    // Interfaces //////////////////////////////////////////////////////////////
    var SimpleTransform = /** @class */ (function () {
        function SimpleTransform(name, func) {
            this.name = name;
            this.func = func;
        }
        return SimpleTransform;
    }());
    // Transforms //////////////////////////////////////////////////////////////
    var Uppercase = new SimpleTransform("Uppercase", function (s) { return s.toUpperCase(); });
    var Lowercase = new SimpleTransform("Lowercase", function (s) { return s.toLowerCase(); });
    var URIEncode = new SimpleTransform("URI Encode", function (s) { return encodeURIComponent(s); });
    var URIDecode = new SimpleTransform("URI Decode", function (s) { return decodeURIComponent(s.replace("+", " ")); });
    // Exports /////////////////////////////////////////////////////////////////
    TextTransforms.Transforms = [
        Uppercase, Lowercase,
        URIEncode, URIDecode,
    ];
})(TextTransforms || (TextTransforms = {}));
