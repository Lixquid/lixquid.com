<template>
    <div>
        <h1>
            Dashboard
            <div class="float-right">
                <b-button variant="info" @click="requestMaximize" title="Maximize" v-b-tooltip.hover>
                    <i class="fas fa-window-maximize" />
                </b-button>&nbsp;
                <b-button @click="configMode = !configMode" title="Configure" v-b-tooltip.hover :pressed="configMode">
                    <i class="fas fa-cog" />
                </b-button>
            </div>
        </h1>
        <grid-layout
            :layout.sync="config"
            :col-num="12"
            :row-height="100"
            :is-draggable="configMode"
            :is-resizable="configMode"
            vertical-compact
            :margin="[10, 10]"
            id="gadget-dashboard"
        >
            <grid-item
                v-for="(item, k) in config"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :key="item.i"
                :class="configMode && 'widget-config'"
            >
                <div class="widget-container">
                    <component :is="widget(item.slug).component" />
                </div>
                <div class="widget-overlay" v-if="configMode">
                    <b-button variant="danger" @click="config.splice(k, 1)" title="Remove" v-b-tooltip.hover>
                        <i class="fas fa-trash" />
                    </b-button>
                </div>
            </grid-item>
        </grid-layout>
        <b-dropdown variant="success" class="w-100" v-if="configMode">
            <template v-slot:button-content>
                <i class="fas fa-plus" /> Add Widget
            </template>
            <b-dropdown-item v-for="(widget, k) in widgetList" :key="k" @click="addWidget(widget.slug)">{{widget.name}}</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<style lang="stylus" scoped>
#gadget-dashboard
    background #fff

.widget-config
    border 1px solid #ccc
    border-radius .5em
    transition border-color .2s

    &:hover
        border-color transparent

    &:hover .widget-container
        filter blur(8px)

    &:hover .widget-overlay
        opacity 1

.widget-container
    width 100%
    height 100%
    transition filter .2s

.widget-overlay
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    display flex
    justify-content center
    align-items center
    border-radius .5em
    background #0004
    opacity 0
    transition opacity .2s
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { GridLayout, GridItem, IGridItemData } from "vue-grid-layout";
import DigitalClockWidget from "./DashboardGadget/DigitalClockWidget.vue";
import { VueClass } from "vue-class-component/lib/declarations";
import widgetList, { IWidgetDefinition } from "./Widgets/widgetList";

interface IWidget extends IGridItemData {
    slug: string;
    config?: { [key: string]: unknown };
}

@Component({
    components: {
        GridLayout,
        GridItem
    }
})
export default class DashboardGadget extends Vue {
    public config: IWidget[] = [{ x: 0, y: 0, w: 12, h: 1, slug: "digitalClock", i: "" + Math.random() }];
    public configMode = true;
    public widgetList = widgetList;

    public addWidget(slug: string) {
        this.config.push({
            x: 0,
            y: Math.max(0, ...this.config.map(c => c.y + c.h)),
            w: 6,
            h: 1,
            slug,
            i: "" + Math.random()
        });
    }

    public requestMaximize() {
        this.configMode = false;
        document.getElementById("gadget-dashboard")!.requestFullscreen({ navigationUI: "hide" });
    }

    public widget(slug: string): IWidgetDefinition {
        return widgetList.find(v => v.slug === slug)!;
    }
}
</script>
