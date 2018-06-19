
<template lang="pug">
  .journal-box-app
    .loader(v-if="$store.state.files.isLoading")
    editor
</template>

<script>
import editor from "./editor.js";

export default {
  name: "App",
  components: { editor },
};
</script>
