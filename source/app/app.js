// import router from './router.js';
import store from './store.js';
import editor from './components/editor.js';

Vue.config.devtools = true

export function init(el) {
  return new Vue({
    el,
    components: { editor },
    template: `<editor></editor>`,
    store,
    // router,
  });
}