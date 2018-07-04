/// <reference path="../../resources/lib/RandomNumberGenerator.ts" />
/// <reference path="../../resources/vendor/vue/index.d.ts" />

if (RandomNumberGenerator.CanGenerateSecureNumbers()) {
    document.getElementById("insecure--warning").remove();
}

const RandomGeneratorNumbers = new Vue({
    el: "#random--numbers",
    data: {
        minimum: 0,
        maximum: 10,
        precision: 0,
        amount: 1,
        output: []
    },
    computed: {
        precisionStep: function (): number {
            return 10 ** -this.precision;
        },
        outputSum: function(): number {
            return this.output.reduce((a, b) => a + b);
        }
    },
    methods: {
        generate: function(): void {
            this.output = [];
            for (let i = 0; i < this.amount; i++)
                this.output.push(RandomNumberGenerator.GenerateRandomNumber(
                    parseFloat(this.minimum),
                    parseFloat(this.maximum),
                    parseInt(this.precision, 10)
                ));
        }
    }
});
const RandomGeneratorStrings = new Vue({
    el: "#random--strings",
    data: {
        length: 10,
        amount: 1,
        charsUpper: true, charsLower: true, charsNumber: true, charsSymbol: false,
        output: []
    },
    methods: {
        generate: function(): void {
            let sourceString = this.prebuiltChars;
            if (sourceString === "") {
                window.alert("Please select at least one class of characters!");
                return;
            }

            this.output = [];
            for (let i = 0; i < this.amount; i++)
                this.output.push(RandomNumberGenerator.GenerateRandomString(
                    this.length,
                    sourceString
                ));
        }
    },
    computed: {
        prebuiltChars: function(): string {
            let output = "";
            if (this.charsUpper)
                output += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (this.charsLower)
                output += "abcdefghijklmnopqrstuvwxyz";
            if (this.charsNumber)
                output += "1234567890";
            if (this.charsSymbol)
                output += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
            return output;
        }
    }
});