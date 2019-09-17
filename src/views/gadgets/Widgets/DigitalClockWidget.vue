<template>
    <div class="digital-clock">
        <div class="digital-clock-text" :style="{fontSize: outputSize + 'px'}" ref="outputRef">{{this.outputString}}</div>
    </div>
</template>

<style lang="stylus" scoped>
.digital-clock
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { sizeToContainer } from "@/lib/DOMHelper";

const Formatter = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
const SPACING_FACTOR = 0.8;

@Component
export default class DigitalClockWidget extends Vue {
    public outputString = "";
    public outputSize = 12;

    private timerHandle: number | undefined;

    private async computeOutputString() {
        this.outputString = Formatter.format(new Date());
        await this.$nextTick();
        this.outputSize = sizeToContainer(this.$refs.outputRef as Element, this.outputSize);
    }
    public mounted() {
        this.computeOutputString();
        this.timerHandle = setInterval(this.computeOutputString, 100);
    }
    public beforeDestroy() {
        clearInterval(this.timerHandle);
    }
}
</script>