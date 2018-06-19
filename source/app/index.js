// import router from './router.js';
import store from "./store/index.js";
import app from "./components/app.js";

Vue.config.devtools = true;

export function init(el) {
  return new Vue({
    el,
    components: { app },
    template: `<app></app>`,
    store,
    // router,
  });
}
