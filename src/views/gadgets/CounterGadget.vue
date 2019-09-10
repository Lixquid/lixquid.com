<template>
    <div>
        <h1>Counter</h1>
        <div class="display-1 w-100 text-center py-4">{{count}}</div>
        <div class="row large-row">
            <div class="col">
                <b-button variant="danger" class="col btn-xl" @click="decrement">
                    <i class="fas fa-minus"></i>
                    <span class="sr-only">Decrement</span>
                </b-button>
            </div>
            <div class="col">
                <b-button variant="success" class="col btn-xl" @click="increment">
                    <i class="fas fa-plus"></i>
                    <span class="sr-only">Increment</span>
                </b-button>
            </div>
            <div class="col-auto">
                <b-button variant="primary" class="col btn-xl" @click="reset">
                    <i class="fas fa-undo"></i>
                    <span class="sr-only">Reset</span>
                </b-button>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.btn-xl
    font-size 3rem
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CounterGadget extends Vue {
    public count = 0;

    public increment() {
        this.count++;
    }
    public decrement() {
        this.count--;
    }
    public reset() {
        this.count = 0;
    }
}
</script>