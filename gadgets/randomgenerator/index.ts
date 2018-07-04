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
        charsCustom: false,
        charsCustomInput: "",
        output: []
    },
    methods: {
        generate: function(): void {
            let sourceString: string;
            if (this.charsCustom) {
                sourceString = this.charsCustomInput;
                if (sourceString === "") {
                    window.alert("Please enter some text in the Custom Source input!");
                    return;
                }
            } else {
                sourceString = this.prebuiltChars;
                if (sourceString === "") {
                    window.alert("Please select at least one class of characters!");
                    return;
                }
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
const RandomGeneratorCoinflip = new Vue({
    el: "#random--coinflip",
    data: {
        amount: 10,
        output: []
    },
    methods: {
        generate: function(): void {
            this.output = [];
            for (let i = 0; i < this.amount; i++)
                this.output.push(RandomNumberGenerator.GenerateRandom() >= 0.5);
        }
    },
    computed: {
        heads: function(): number {
            return this.output.reduce((a, b) => a + (b ? 1 : 0), 0);
        },
        tails: function(): number {
            return this.output.reduce((a, b) => a + (b ? 0 : 1), 0);
        }
    }
});
const RandomGeneratorFromList = new Vue({
    el: "#random--fromlist",
    data: {
        list: "",
        amount: 1,
        unique: false,
        output: [] as string[]
    },
    methods: {
        generate: function(): void {
            if (this.unique) {
                if (parseInt(this.amount) > this.listParsed.length) {
                    this.amount = this.listParsed.length;
                }
                const array = this.listParsed.slice();
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(RandomNumberGenerator.GenerateRandom() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                this.output = array.slice(0, this.amount);
            } else {
                this.output = [];
                for (let i = 0; i < this.amount; i++)
                    this.output.push(
                        this.listParsed[RandomNumberGenerator.GenerateRandomNumber(
                            0, this.listParsed.length - 1
                        )]
                    );
            }
        }
    },
    computed: {
        listParsed: function(): string[] { return this.list.split("\n"); }
    }
})