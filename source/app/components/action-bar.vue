<template lang="pug">
  .action-bar
    button(@click.prevent="back")
      i.fas.fa-angle-left
    button.icon(@click.prevent="today", v-if="!$store.getters['dates/isToday']")
      i.fas.fa-dot-circle
      | Today

    .btn-group
      button.icon(@click.prevent="logout")
        i.fas.fa-user-alt-slash
        | Logout

      button(@click.prevent="save")
        i.fas.fa-save


    button(@click.prevent="$store.commit('ui/toggleShy')")
      i.fas.fa-eye(v-if="$store.state.ui.isShy")
      i.fas.fa-eye-slash(v-else)

    button(@click.prevent="next", v-if="!$store.getters['dates/isToday']")
      i.fas.fa-angle-right
</template>

<script>
import session from "../session.js";

export default {
  name: "ActionBar",

  methods: {
    back() {
      this.$store.commit("dates/setCurrent", this.$store.getters["dates/backSlug"]);
      this.$store.dispatch("files/loadCurrent");
    },

    next() {
      this.$store.commit("dates/setCurrent", this.$store.getters["dates/nextSlug"]);
      this.$store.dispatch("files/loadCurrent");
    },

    today() {
      this.$store.commit("dates/setToday");
      this.$store.dispatch("files/loadCurrent");
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
