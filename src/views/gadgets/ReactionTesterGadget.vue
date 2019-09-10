<template>
    <div>
        <h1>Reaction Tester</h1>

        <b-button
            size="lg"
            class="w-100 my-5"
            :variant="buttonColor"
            @click="mainInput"
        >{{buttonText}}</b-button>

        <b-form-group label="Reaction Time (ms)" class="mb-5">
            <b-form-input readonly size="lg" :value="lastReactionTime" />
        </b-form-group>

        <b-form-group label="Best Reaction Time (ms)">
            <b-form-input readonly :value="bestReaction" />
        </b-form-group>
        <b-form-group label="Average Reaction Time (ms)">
            <b-form-input readonly :value="avgReaction" />
        </b-form-group>
        <b-form-group label="Test Count">
            <b-form-input readonly :value="testCount" />
        </b-form-group>

        <b-button variant="danger" class="float-right mt-3" @click="reset">Reset</b-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const MINIMUM_WAIT_TIME = 1000;
const MAXIMUM_ADD_TIME = 2000;

type State =
    | ["READY", "START" | "TOO_SOON" | "AGAIN"]
    | ["PRE", number] // Timeout ID
    | ["REACT", Date]; // Reaction from time

@Component
export default class ReactionTesterGadget extends Vue {
    public testCount = 0;

    private reactionTimes: number[] = [];
    private lastRunWasTooSoon = false;
    private state: State = ["READY", "START"];

    public reset() {
        this.testCount = 0;
        this.reactionTimes = [];
        this.lastRunWasTooSoon = false;
        if (this.state[0] === "PRE") clearTimeout(this.state[1]);
        this.state = ["READY", "START"];
    }

    public mainInput() {
        switch (this.state[0]) {
            case "READY":
                // Start a new run
                const timerId = setTimeout(() => {
                    this.state = ["REACT", new Date()];
                }, Math.random() * MAXIMUM_ADD_TIME + MINIMUM_WAIT_TIME);
                this.state = ["PRE", timerId];
                return;
            case "PRE":
                // Reacted too soon
                clearTimeout(this.state[1]);
                this.testCount++;
                this.lastRunWasTooSoon = true;
                this.state = ["READY", "TOO_SOON"];
                return;
            case "REACT":
                // Add the reaction time
                const now = new Date();
                this.testCount++;
                this.reactionTimes.push(
                    now.getTime() - this.state[1].getTime()
                );
                this.lastRunWasTooSoon = false;
                this.state = ["READY", "AGAIN"];
                return;
        }
    }

    public get bestReaction() {
        if (this.reactionTimes.length === 0) return 0;
        return Math.round(Math.min(...this.reactionTimes));
    }

    public get avgReaction() {
        if (this.reactionTimes.length === 0) return 0;
        return Math.round(
            this.reactionTimes.reduce((p, c) => p + c) /
                this.reactionTimes.length
        );
    }

    public get buttonText() {
        switch (this.state[0]) {
            case "READY":
                switch (this.state[1]) {
                    case "START":
                        return "Start";
                    case "TOO_SOON":
                        return "Try Again";
                    case "AGAIN":
                        return "Again";
                }
            case "PRE":
                return "Wait for it...";
            case "REACT":
                return "Hit Me!";
        }
    }

    public get buttonColor() {
        switch (this.state[0]) {
            case "READY":
                return "primary";
            case "PRE":
                return "secondary";
            case "REACT":
                return "success";
        }
    }

    public get lastReactionTime() {
        if (this.lastRunWasTooSoon) return "Too Soon!";
        if (this.reactionTimes.length === 0) return "";
        return Math.round(this.reactionTimes[this.reactionTimes.length - 1]);
    }
}
</script>