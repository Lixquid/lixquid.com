import gadgetList from "@/views/gadgetList";
import Gadgets from "@/views/Gadgets.vue";
import Home from "@/views/Home.vue";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/gadgets",
            component: Gadgets
        },
        ...gadgetList.map(g => ({
            path: `/gadgets/${g.slug}`,
            component: g.component
        }))
    ]
});
