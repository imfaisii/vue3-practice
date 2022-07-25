import { createApp } from "vue/dist/vue.esm-bundler";
import "./bootstrap";
import router from "./router";
import Toaster from "@meforma/vue-toaster";

const app = createApp({});

app.use(router);
app.use(Toaster, {
    position: "top-right",
    duration: 1000,
});
app.mount("#app");
