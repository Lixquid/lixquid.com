import Vue from "vue";
import { VueClass } from "vue-class-component/lib/declarations";
import BPMTesterGadget from "./gadgets/BPMTesterGadget.vue";
import CounterGadget from "./gadgets/CounterGadget.vue";

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
    }
];
export default gadgetList;
