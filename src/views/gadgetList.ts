import Vue from "vue";
import { VueClass } from "vue-class-component/lib/declarations";
import BPMTesterGadget from "./gadgets/BPMTesterGadget.vue";
import CounterGadget from "./gadgets/CounterGadget.vue";
import ReactionTesterGadget from "./gadgets/ReactionTesterGadget.vue";

export interface IGadgetDefinition {
    name: string;
    description: string;
    slug: string;
    component: VueClass<Vue>;
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
    }
];
export default gadgetList;
