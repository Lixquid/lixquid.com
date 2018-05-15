var DebtResolver;
(function (DebtResolver) {
    function floor(number, precision) {
        return Math.floor(number * Math.pow(10, precision)) /
            Math.pow(10, precision);
    }
    function resolve(debts, precision) {
        if (precision === void 0) { precision = 2; }
        var balance = {};
        for (var _i = 0, debts_1 = debts; _i < debts_1.length; _i++) {
            var debt = debts_1[_i];
            balance[debt.from] = balance[debt.from] || 0;
            balance[debt.to] = balance[debt.to] || 0;
            balance[debt.from] -= floor(debt.amount, precision);
            balance[debt.to] += floor(debt.amount, precision);
        }
        var output = [];
        for (var _a = 0, _b = Object.keys(balance); _a < _b.length; _a++) {
            var debtor = _b[_a];
            var debtorBalance = balance[debtor];
            // Only move debt from people with a negative balance (has debt)
            if (debtorBalance >= 0) {
                continue;
            }
            for (var _c = 0, _d = Object.keys(balance); _c < _d.length; _c++) {
                var creditor = _d[_c];
                var creditorBalance = balance[creditor];
                // Only resolve debt with people with a positive balance
                if (creditorBalance <= 0) {
                    continue;
                }
                if (creditorBalance >= -debtorBalance) {
                    // Debtor completely clears debt
                    balance[debtor] = 0;
                    balance[creditor] += debtorBalance;
                    output.push({ from: debtor, to: creditor, amount: -debtorBalance });
                }
                else {
                    // Creditor runs out of credit
                    balance[debtor] += creditorBalance;
                    balance[creditor] = 0;
                    output.push({ from: debtor, to: creditor, amount: creditorBalance });
                }
                debtorBalance = balance[debtor];
                if (debtorBalance === 0) {
                    break;
                }
            }
            if (debtorBalance !== 0) {
                throw "Debtor " + debtor + " cannot resolve leftover balance: " +
                    debtorBalance;
            }
        }
        return output;
    }
    DebtResolver.resolve = resolve;
})(DebtResolver || (DebtResolver = {}));
