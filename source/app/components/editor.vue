

<template lang="pug">
  .editor
    textarea(v-model="content")
    action-bar

</template>

<script>
import actionBar from "./action-bar.js";

export default {
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
</script>
