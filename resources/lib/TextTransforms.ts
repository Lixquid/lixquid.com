export namespace TextTransforms {

    // Interfaces //////////////////////////////////////////////////////////////

    interface Transform {
        name: string;
        func: Function
    }

    class SimpleTransform implements Transform {
        constructor(
            readonly name: string,
            readonly func: (input: string) => string
        ) { }
    }

    // Transforms //////////////////////////////////////////////////////////////

    const Uppercase = new SimpleTransform("Uppercase", (s) => s.toUpperCase());
    const Lowercase = new SimpleTransform("Lowercase", (s) => s.toLowerCase());
    const URIEncode = new SimpleTransform("URI Encode", (s) => encodeURIComponent(s));
    const URIDecode = new SimpleTransform("URI Decode", (s) => decodeURIComponent(s.replace("+", " ")));

    // Exports /////////////////////////////////////////////////////////////////

    export const Transforms: ReadonlyArray<Transform> = [
        Uppercase, Lowercase,
        URIEncode, URIDecode,
    ]
}
