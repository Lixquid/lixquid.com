import Vue from "vue";
import { VueClass } from "vue-class-component/lib/declarations";
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
    }
];
export default gadgetList;
