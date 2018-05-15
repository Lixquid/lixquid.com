/// <reference path="../../resources/vendor/vue/vue-global.d.ts" />
var debtResolverApp = new Vue({
    el: "#main--body",
    data: {
        debts: [],
        resolvedOutput: []
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
            this.resolvedOutput = DebtResolver.resolve(this.debts);
        }
    },
    computed: {
        debtsIsValid: function () {
            if (!this.debts.length) {
                return false;
            }
            for (var _i = 0, _a = this.debts; _i < _a.length; _i++) {
                var debt = _a[_i];
                if (!debt.from.length || !debt.to.length) {
                    return false;
                }
            }
            return true;
        }
    }
});
