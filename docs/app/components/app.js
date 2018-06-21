import editor from "./editor.js";
import actionBar from "./action-bar.js";

export default {
  template: `
  <div class="journal-box-app"><div class="loader" v-if="$store.state.files.isLoading"></div><router-view></router-view><action-bar></action-bar></div>`,

  name: "App",
  components: { editor, actionBar },
  mounted() {
    this.$store.dispatch("files/loadCurrent");
  },
};