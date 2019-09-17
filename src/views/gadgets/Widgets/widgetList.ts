import Vue from "vue";
import { VueClass } from "vue-class-component/lib/declarations";
import DigitalClockWidget from "./DigitalClockWidget.vue";
import ScratchSpaceWidget from "./ScratchSpaceWidget.vue";

export interface IWidgetDefinition {
    readonly name: string;
    readonly slug: string;
    readonly component: VueClass<Vue>;
    readonly configComponent?: VueClass<Vue>;
}

const widgetList: ReadonlyArray<IWidgetDefinition> = [
    {
        name: "Digital Clock",
        slug: "digitalClock",
        component: DigitalClockWidget
    },
    {
        name: "Scratch Space",
        slug: "scratchSpace",
        component: ScratchSpaceWidget
    }
];
export default widgetList;
