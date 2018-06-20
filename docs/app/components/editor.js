import actionBar from "./action-bar.js";

export default {
  template: `
  <div class="editor" :class="{shy: $store.state.ui.isShy}" @mousemove="input"><textarea v-model="content" @keydown="input"></textarea><action-bar></action-bar></div>`,

  name: "Editor",
  components: { actionBar },

  data() {
    return {
      interval: null,
      secsWithoutInput: 0,
    };
  },

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
    this.watchForInactivity();
  },

  methods: {
    watchForInactivity() {
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.secsWithoutInput++;
        if (this.secsWithoutInput > 30 && !this.$store.state.ui.isShy)
          this.$store.commit("ui/toggleShy");
      }, 1000);
    },
    input() {
      this.secsWithoutInput = 0;
      this.watchForInactivity();
    },
  },
};