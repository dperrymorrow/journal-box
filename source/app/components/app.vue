
<template lang="pug">
  .journal-box-app
    .loader(v-if="$store.state.isLoading")
    router-view
    action-bar
</template>

<script>
import editor from "./editor.js";
import actionBar from "./action-bar.js";

export default {
  name: "App",
  components: { editor, actionBar },
  mounted() {
    this.$store.dispatch("files/loadCurrent");
  },
};
</script>
