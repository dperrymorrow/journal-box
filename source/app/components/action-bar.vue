<template lang="pug">
  .action-bar
    button(@click.prevent="back") Back
    button(@click.prevent="save") Save
    button(@click.prevent="logout") Logout
</template>

<script>
import session from "../session.js";

export default {
  name: "ActionBar",

  methods: {
    back() {
      // this.$store.dispatch("backOneDay");
    },

    logout() {
      session.destroy();
    },

    save() {
      this.$store.dispatch("files/saveCurrent");
    },
  },
};
</script>
