<template>
    <div>
        <h1>Gadgets</h1>
        <ul>
            <li v-for="g in gadgetList" :key="g.slug">
                <router-link :to="`/gadgets/${g.slug}`">
                    <strong>{{g.name}}</strong>
                    -
                    {{g.description}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import VueType from "vue";
import { Component, Vue } from "vue-property-decorator";
import gadgetList from "./gadgetList";

@Component
export default class Gadgets extends Vue {
    public readonly gadgetList = gadgetList;
}
</script>