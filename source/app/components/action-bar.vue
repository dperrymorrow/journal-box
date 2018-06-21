<template lang="pug">
  .action-bar
    //- .btn-group
    button(@click.prevent="back")
      i.fas.fa-angle-left
    //- button(@click.prevent="showCalendar")
    //-   i.fas.fa-calendar-alt


    .btn-group
      button.icon(@click.prevent="logout")
        i.fas.fa-user-alt-slash

      button(@click.prevent="$store.commit('ui/toggleShy')")
        i.fas.fa-eye(v-if="$store.state.ui.isShy")
        i.fas.fa-eye-slash(v-else)

      button(@click.prevent="save")
        i.fas.fa-save


    .btn-group
      button.icon(@click.prevent="today", v-if="!$store.getters['dates/isToday']")
        i.fas.fa-dot-circle
        | Today
      button(@click.prevent="next", :disabled="$store.getters['dates/isToday']")
        i.fas.fa-angle-right

</template>

<script>
import session from "../session.js";

export default {
  name: "ActionBar",

  methods: {
    back() {
      this.$store.commit("dates/setCurrentFromSlug", this.$store.getters["dates/backSlug"]);
      this.$store.dispatch("files/loadCurrent");
    },

    showCalendar() {},

    next() {
      this.$store.commit("dates/setCurrentFromSlug", this.$store.getters["dates/nextSlug"]);
      this.$store.dispatch("files/loadCurrent");
    },

    today() {
      this.$store.commit("dates/setToday");
      this.$store.dispatch("files/loadCurrent");
    },

    logout() {
      if (window.confirm("sure you wanna logout? You will loose unsaved work on your entry."))
        session.destroy();
    },

    save() {
      this.$store.dispatch("files/saveCurrent");
    },
  },
};
</script>
