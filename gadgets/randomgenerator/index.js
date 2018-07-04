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
        output: []
    },
    methods: {
        generate: function () {
            this.output = [];
            for (var i = 0; i < this.amount; i++)
                this.output.push(RandomNumberGenerator.GenerateRandomString(this.length));
        }
    }
});
