/// <reference path="../../resources/lib/RandomNumberGenerator.ts" />
/// <reference path="../../resources/vendor/vue/index.d.ts" />
if (RandomNumberGenerator.CanGenerateSecureNumbers()) {
    document.getElementById("insecure--warning").remove();
}
var RandomGeneratorNumbers = new Vue({
    el: "#random--numbers",
    data: {
        minimum: 0,
        maximum: 10,
        precision: 0,
        amount: 1,
        output: []
    },
    computed: {
        precisionStep: function () {
            return Math.pow(10, -this.precision);
        },
        outputSum: function () {
            return this.output.reduce(function (a, b) { return a + b; });
        }
    },
    methods: {
        generate: function () {
            this.output = [];
            for (var i = 0; i < this.amount; i++)
                this.output.push(RandomNumberGenerator.GenerateRandomNumber(parseFloat(this.minimum), parseFloat(this.maximum), parseInt(this.precision, 10)));
        }
    }
});
var RandomGeneratorStrings = new Vue({
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
        generate: function () {
            var sourceString;
            if (this.charsCustom) {
                sourceString = this.charsCustomInput;
                if (sourceString === "") {
                    window.alert("Please enter some text in the Custom Source input!");
                    return;
                }
            }
            else {
                sourceString = this.prebuiltChars;
                if (sourceString === "") {
                    window.alert("Please select at least one class of characters!");
                    return;
                }
            }
            this.output = [];
            for (var i = 0; i < this.amount; i++)
                this.output.push(RandomNumberGenerator.GenerateRandomString(this.length, sourceString));
        }
    },
    computed: {
        prebuiltChars: function () {
            var output = "";
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
var RandomGeneratorCoinflip = new Vue({
    el: "#random--coinflip",
    data: {
        amount: 10,
        output: []
    },
    methods: {
        generate: function () {
            this.output = [];
            for (var i = 0; i < this.amount; i++)
                this.output.push(RandomNumberGenerator.GenerateRandom() >= 0.5);
        }
    },
    computed: {
        heads: function () {
            return this.output.reduce(function (a, b) { return a + (b ? 1 : 0); }, 0);
        },
        tails: function () {
            return this.output.reduce(function (a, b) { return a + (b ? 0 : 1); }, 0);
        }
    }
});
var RandomGeneratorFromList = new Vue({
    el: "#random--fromlist",
    data: {
        list: "",
        amount: 1,
        unique: false,
        output: []
    },
    methods: {
        generate: function () {
            var _a;
            if (this.unique) {
                if (parseInt(this.amount) > this.listParsed.length) {
                    this.amount = this.listParsed.length;
                }
                var array = this.listParsed.slice();
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(RandomNumberGenerator.GenerateRandom() * (i + 1));
                    _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
                }
                this.output = array.slice(0, this.amount);
            }
            else {
                this.output = [];
                for (var i = 0; i < this.amount; i++)
                    this.output.push(this.listParsed[RandomNumberGenerator.GenerateRandomNumber(0, this.listParsed.length - 1)]);
            }
        }
    },
    computed: {
        listParsed: function () { return this.list.split("\n"); }
    }
});
