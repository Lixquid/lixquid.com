/// <reference path="../../resources/vendor/vue/vue-global.d.ts" />

const debtResolverApp = new Vue({
    el: "#main--body",
    data: {
        debts: [] as DebtResolver.Debt[],
        resolvedOutput: [] as DebtResolver.Debt[]
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
            this.resolvedOutput = DebtResolver.resolve(this.debts as DebtResolver.Debt[]);
        }
    },
    computed: {
        debtsIsValid: function (): boolean {
            if (!this.debts.length) {
                return false;
            }
            for (const debt of (this.debts as DebtResolver.Debt[])) {
                if (!debt.from.length || !debt.to.length) {
                    return false;
                }
            }
            return true;
        }
    }
});
