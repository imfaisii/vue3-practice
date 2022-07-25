import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        to: "/",
        component: () => import("../views/Home.vue"),
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
