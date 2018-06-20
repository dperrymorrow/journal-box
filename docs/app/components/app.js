import editor from "./editor.js";

export default {
  template: `
  <div class="journal-box-app"><div class="loader" v-if="$store.state.files.isLoading"></div><editor></editor></div>`,

  name: "App",
  components: { editor },
};
