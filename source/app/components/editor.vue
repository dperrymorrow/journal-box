

<template lang="pug">
  .editor(:class="{shy: $store.state.ui.isShy}", @mousemove="input")
    textarea.textarea(ref="editor", v-model="content")

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
      this.$refs.editor.scrollTop = 0;
    },

    input() {
      this.secsWithoutInput = 0;
    },
  },
};
</script>
