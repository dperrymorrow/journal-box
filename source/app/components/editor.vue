

<template lang="pug">
  .editor(:class="{shy: $store.state.ui.isShy}", @mousemove="input")
    textarea.textarea(v-model="content")

</template>

<script>
import config from "../config.js";

export default {
  name: "Editor",

  props: {
    slug: {
      required: true,
      type: String,
    },
  },

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
      set(str) {
        this.$store.commit("files/setContent", str);
      },
    },
  },

  watch: {
    $route(to, from) {
      if (to.name === "editor") this.startUp();
    },
  },

  mounted() {
    this.startUp();
  },

  methods: {
    async startUp() {
      this.$store.commit("dates/setCurrentFromSlug", this.slug);
      this.content = await this.$store.dispatch("files/loadCurrent");
      if (config.guard) this.watchForInactivity();
    },

    watchForInactivity() {
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (this.secsWithoutInput > 120) window.location.href = "http://google.com";
        this.secsWithoutInput++;
      }, 1000);
    },
    input() {
      this.secsWithoutInput = 0;
    },
  },
};
</script>
