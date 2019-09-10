<template>
    <div>
        <h1>BPM Tester</h1>

        <b-alert
            show
        >Tap the shift key or press the Beat button in time with the beat to record beats per minute.</b-alert>
        <b-button size="lg" variant="primary" class="w-100 my-3" @click="triggerBeat">Beat</b-button>

        <b-form-group label="BPM" label-cols-sm="2">
            <b-form-input readonly :value="Math.round(getBPM())" />
        </b-form-group>
        <b-form-group label="Average Period (ms)" label-cols-sm="2">
            <b-form-input readonly :value="Math.round(getAveragePeriod())" />
        </b-form-group>
        <b-form-group label="Beats" label-cols-sm="2">
            <b-form-input readonly :value="beatCount" />
        </b-form-group>
        <b-progress
            :value="beatCount"
            :max="BEAT_COUNT"
            :variant="beatCount >= BEAT_COUNT ? 'success' : 'primary'"
        />

        <b-button variant="danger" class="float-right mt-3" @click="reset">Reset</b-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const BEAT_COUNT = 20;

@Component
export default class BPMTesterGadget extends Vue {
    public beatCount = 0;
    public BEAT_COUNT = BEAT_COUNT;

    private periods: number[] = [];
    private lastBeat: Date | null = null;

    public reset() {
        this.periods = [];
        this.lastBeat = null;
        this.beatCount = 0;
    }

    public getBPM() {
        if (this.periods.length === 0) return 0;
        return 60000 / this.getAveragePeriod();
    }

    public getAveragePeriod() {
        if (this.periods.length === 0) return 0;
        return this.periods.reduce((p, c) => p + c) / this.periods.length;
    }

    public triggerBeat() {
        const now = new Date();
        if (this.lastBeat !== null) {
            this.periods.push(now.getTime() - this.lastBeat.getTime());
            if (this.periods.length > BEAT_COUNT) this.periods.shift();
        }
        this.lastBeat = now;
        this.beatCount++;
    }

    private eventListener(ev: KeyboardEvent) {
        if (ev.key === "Shift") this.triggerBeat();
    }

    public mounted() {
        addEventListener("keydown", this.eventListener, { passive: true });
    }

    public beforeDestroy() {
        removeEventListener("keydown", this.eventListener);
    }
}
</script>