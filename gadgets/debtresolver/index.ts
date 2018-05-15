/// <reference path="../../resources/vendor/vue/vue-global.d.ts" />

const debtResolverApp = new Vue({
    el: "#main--body",
    data: {
        sPrecision: 2,
        debts: [] as DebtResolver.Debt[],
        debtsValidated: false,
        resolvedOutput: null as DebtResolver.Debt[]
    },
    methods: {
        remove: function (index: number): void {
            this.debts.splice(index, 1);
        },
        add: function (): void {
            this.debts.push({ from: "", to: "", amount: 0 } as DebtResolver.Debt);
            Vue.nextTick(() => {
                this.$refs.debtInputTextbox[
                    (this.$refs.debtInputTextbox as Element[]).length - 1
                ].focus();
            });
        },
        resolve: function (): void {
            if ((this.$refs.debtForm as HTMLFormElement).checkValidity() === false) {
                this.debtsValidated = true;
                return;
            }
            this.resolvedOutput = DebtResolver.resolve(
                this.debts as DebtResolver.Debt[],
                this.sPrecision
            );
        },
        clearOutput: function (): void {
            this.resolvedOutput = null;
        },
        clearDebts: function () {
            this.debts = [];
            this.debtsValidated = false;
            this.clearOutput();
        }
    },
    watch: {
        sPrecision: function (val: number): void {
            localStorage.setItem(
                "debtResolver--precision",
                this.sPrecision.toString()
            );
        }
    },
    mounted: function (): void {
        const sPrecision = parseInt(
            localStorage.getItem("debtResolver--precision"),
            10
        );
        this.sPrecision = isNaN(sPrecision) ? this.sPrecision : sPrecision;
    }
});
