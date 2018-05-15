/// <reference path="../../resources/vendor/vue/vue-global.d.ts" />
var debtResolverApp = new Vue({
    el: "#main--body",
    data: {
        sPrecision: 2,
        debts: [],
        debtsValidated: false,
        resolvedOutput: null
    },
    methods: {
        remove: function (index) {
            this.debts.splice(index, 1);
        },
        add: function () {
            var _this = this;
            this.debts.push({ from: "", to: "", amount: 0 });
            Vue.nextTick(function () {
                _this.$refs.debtInputTextbox[_this.$refs.debtInputTextbox.length - 1].focus();
            });
        },
        resolve: function () {
            if (this.$refs.debtForm.checkValidity() === false) {
                this.debtsValidated = true;
                return;
            }
            this.resolvedOutput = DebtResolver.resolve(this.debts, this.sPrecision);
        },
        clearOutput: function () {
            this.resolvedOutput = null;
        },
        clearDebts: function () {
            this.debts = [];
            this.debtsValidated = false;
            this.clearOutput();
        }
    },
    watch: {
        sPrecision: function (val) {
            localStorage.setItem("debtResolver--precision", this.sPrecision.toString());
        }
    },
    mounted: function () {
        var sPrecision = parseInt(localStorage.getItem("debtResolver--precision"), 10);
        this.sPrecision = isNaN(sPrecision) ? this.sPrecision : sPrecision;
    }
});
