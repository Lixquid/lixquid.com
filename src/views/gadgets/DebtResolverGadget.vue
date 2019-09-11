<template>
    <div>
        <h1>
            Debt Resolver
            <b-button variant="outline-info" class="float-right" v-b-modal.helpModal>
                <i class="fas fa-info-circle" /> Help
            </b-button>

            <b-modal id="helpModal" title="Help" hide-footer>
                <p>Add a row for each debt a person owes to another person. The resolver will minimize the amount of transactions to settle balances.</p>
                <b-button variant="info" @click="helpExample1">Example 1</b-button>&nbsp;
                <b-button variant="info" @click="helpExample2">Example 2</b-button>
            </b-modal>
        </h1>
        <b-card class="mb-3">
            <b-card-body>
                <div class="container-fluid">
                    <div class="row align-items-center mb-3" v-for="(debt, i) in debts" :key="i">
                        <b-input-group class="col p-0">
                            <b-form-input v-model="debt[0]" />
                            <template v-slot:append>
                                <b-dropdown>
                                    <b-dropdown-item
                                        v-for="name in debtNames"
                                        :key="name"
                                        @click="$set(debt, 0, name)"
                                    >{{name}}</b-dropdown-item>
                                    <b-dropdown-item
                                        v-if="!debtNames.length"
                                        disabled
                                    >Type in the textbox to add a name</b-dropdown-item>
                                </b-dropdown>
                            </template>
                        </b-input-group>
                        <span class="col-auto">owes</span>
                        <b-form-input
                            v-model="debt[1]"
                            type="number"
                            min="0"
                            step="0.01"
                            class="col"
                        />
                        <span class="col-auto">to</span>
                        <b-input-group class="col p-0">
                            <b-form-input v-model="debt[2]" />
                            <template v-slot:append>
                                <b-dropdown>
                                    <b-dropdown-item
                                        v-for="name in debtNames"
                                        :key="name"
                                        @click="$set(debt, 2, name)"
                                    >{{name}}</b-dropdown-item>
                                </b-dropdown>
                            </template>
                        </b-input-group>
                        <b-button
                            variant="outline-danger"
                            class="ml-3"
                            @click="debts.splice(i, 1)"
                        >&times;</b-button>
                    </div>
                </div>
                <b-button
                    variant="success"
                    size="lg"
                    class="w-100"
                    @click="debts.push(['', 0, ''])"
                >
                    <i class="fas fa-plus"></i> Add
                </b-button>
            </b-card-body>
        </b-card>
        <div class="text-right mb-3">
            <b-button variant="primary" size="lg" @click="resolve">Resolve</b-button>&nbsp;
            <b-button variant="danger" @click="reset">Reset</b-button>
        </div>
        <b-card title="Output" v-if="output">
            <b-card-body>
                <ul>
                    <li v-for="(debt, i) in output" :key="i">
                        <strong>{{debt[0]}}</strong>
                        gives
                        {{debt[1].toFixed(2)}}
                        to
                        <strong>{{debt[2]}}</strong>
                    </li>
                </ul>
            </b-card-body>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

const EPSILON = 0.0001;

@Component
export default class DebtResolverGadget extends Vue {
    public debts: [string, number, string][] = [["", 0, ""]];
    public output: [string, number, string][] | null = null;

    public get debtNames(): string[] {
        const names = new Set<string>();
        for (const debt of this.debts) {
            names.add(debt[0]);
            names.add(debt[2]);
        }
        names.delete("");
        return Array.from(names);
    }

    public reset() {
        this.debts = [["", 0, ""]];
        this.output = null;
    }

    public resolve() {
        const output: [string, number, string][] = [];

        // Build balances
        const balanceMap = new Map<string, number>();
        for (const debt of this.debts) {
            if (debt[0] === "" || debt[1] === 0 || debt[2] === "") continue;
            balanceMap.set(debt[0], (balanceMap.get(debt[0]) || 0) - debt[1]);
            balanceMap.set(debt[2], (balanceMap.get(debt[2]) || 0) + debt[1]);
        }
        const balances = Array.from(balanceMap);

        // Equalize balances
        for (const from of balances) {
            // Only transfer from people in debt
            if (from[1] > -EPSILON) continue;
            for (const to of balances) {
                // Only transfer to people with credit
                if (to[1] < EPSILON) continue;

                if (-from[1] > to[1]) {
                    // Creditor out of credit
                    output.push([from[0], to[1], to[0]]);
                    from[1] += to[1];
                    to[1] = 0;
                } else {
                    // Debtor cleared debt
                    output.push([from[0], -from[1], to[0]]);
                    to[1] -= from[1];
                    from[1] = 0;
                }
            }
        }

        this.output = output;
    }

    public helpExample1() {
        this.debts = [["Alice", 4, "Bob"], ["Bob", 7, "Charlie"]];
        this.output = null;
        this.$bvModal.hide("helpModal");
    }

    public helpExample2() {
        this.helpExample1();
        this.debts = [
            ["Alice", 2, "Bob"],
            ["Bob", 10, "Charlie"],
            ["Charlie", 2, "Alice"]
        ];
    }
}
</script>