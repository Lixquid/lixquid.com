namespace DebtResolver {
    export interface Debt {
        from: string;
        to: string;
        amount: number;
    }

    function floor(number: number, precision: number): number {
        return Math.floor(number * Math.pow(10, precision)) /
            Math.pow(10, precision);
    }

    export function resolve(debts: ReadonlyArray<Debt>, precision: number = 2): Debt[] {

        const balance: { [owner: string]: number } = {};
        for (const debt of debts) {
            balance[debt.from] = balance[debt.from] || 0;
            balance[debt.to] = balance[debt.to] || 0;
            balance[debt.from] -= floor(debt.amount, precision);
            balance[debt.to] += floor(debt.amount, precision);
        }

        const output: Debt[] = [];
        for (const debtor of Object.keys(balance)) {
            let debtorBalance = balance[debtor];
            // Only move debt from people with a negative balance (has debt)
            if (debtorBalance >= 0) {
                continue;
            }

            for (const creditor of Object.keys(balance)) {
                const creditorBalance = balance[creditor];
                // Only resolve debt with people with a positive balance
                if (creditorBalance <= 0) {
                    continue;
                }

                if (creditorBalance >= -debtorBalance) {
                    // Debtor completely clears debt
                    balance[debtor] = 0;
                    balance[creditor] += debtorBalance;
                    output.push({ from: debtor, to: creditor, amount: -debtorBalance });
                } else {
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
                throw `Debtor ${debtor} cannot resolve leftover balance: ` +
                debtorBalance;
            }
        }

        return output;
    }
}
