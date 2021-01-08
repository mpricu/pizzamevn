import { createApp, h } from "vue";
import App from "./App.vue";
import WaveUI from "wave-ui";
import "wave-ui/dist/wave-ui.css";
import "@mdi/font/css/materialdesignicons.min.css";

import mitt from "mitt";
const emitter = mitt();
import router from "./router";
import store from "./store";

const app = createApp({
  render: () => h(App),
});

new WaveUI(app, {
  // Some Wave UI options.
});

app.config.globalProperties.emitter = emitter;
app.use(router);
app.use(store);
app.mount("#app");
