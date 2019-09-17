<template>
    <div class="digital-clock">
        <div>{{this.outputString}}</div>
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

const Formatter = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });

@Component
export default class DigitalClockWidget extends Vue {
    public outputString = "";

    private timerHandle: number | undefined;

    private computeOutputString() {
        this.outputString = Formatter.format(new Date());
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