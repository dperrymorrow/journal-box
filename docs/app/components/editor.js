import actionBar from "./action-bar.js";

export default {
  template: `
  <div class="editor" :class="{shy: $store.state.ui.isShy}"><textarea v-model="content"></textarea><action-bar></action-bar></div>`,

  name: "Editor",
  components: { actionBar },

  computed: {
    content: {
      get() {
        return this.$store.state.files.content;
      },
      set(content) {
        this.$store.commit("files/setContent", content);
      },
    },
  },

  async mounted() {
    await this.$store.dispatch("files/loadCurrent");
  },
};
