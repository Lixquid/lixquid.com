declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "vue-grid-layout" {
    import Vue from "vue";

    export class GridLayout extends Vue {}

    export class GridItem extends Vue {}

    export interface IGridItemData {
        x: number;
        y: number;
        w: number;
        h: number;
        i: string;
    }
}
