import Vue from "vue";
import { VueClass } from "vue-class-component/lib/declarations";
import BPMTesterGadget from "./BPMTesterGadget.vue";
import CounterGadget from "./CounterGadget.vue";
import DashboardGadget from "./DashboardGadget.vue";
import DebtResolverGadget from "./DebtResolverGadget.vue";
import FindAndReplaceGadget from "./FindAndReplaceGadget.vue";
import ReactionTesterGadget from "./ReactionTesterGadget.vue";

export interface IGadgetDefinition {
    readonly name: string;
    readonly description: string;
    readonly slug: string;
    readonly component: VueClass<Vue>;
}

const gadgetList: ReadonlyArray<IGadgetDefinition> = [
    {
        name: "Counter",
        description: "A simple incrementing counter.",
        slug: "counter",
        component: CounterGadget
    },
    {
        name: "BPM Tester",
        description: "Find a song's BPM by tapping to its beat.",
        slug: "bpmtester",
        component: BPMTesterGadget
    },
    {
        name: "Reaction Tester",
        description: "Test your reaction speed with a simple tap.",
        slug: "reactiontester",
        component: ReactionTesterGadget
    },
    {
        name: "Debt Resolver",
        description: "Solves complicated debt graphs. Supports chained and cycling graphs.",
        slug: "debtresolver",
        component: DebtResolverGadget
    },
    {
        name: "Find and Replace",
        description: "Find and replace items in large sections of text. Supports Regular Expressions and Escape Codes.",
        slug: "findandreplace",
        component: FindAndReplaceGadget
    },
    {
        name: "Dashboard",
        description: "A fully customizable dashboard display.",
        slug: "dashboard",
        component: DashboardGadget
    }
];
export default gadgetList;
