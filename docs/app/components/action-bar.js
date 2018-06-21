import session from "../session.js";

export default {
  template: `
  <div class="action-bar"><button @click.prevent="back"><i class="fas fa-angle-left"></i></button><div class="btn-group"><button class="icon" @click.prevent="logout"><i class="fas fa-user-alt-slash"></i></button><button @click.prevent="$store.commit('ui/toggleShy')"><i class="fas fa-eye" v-if="$store.state.ui.isShy"></i><i class="fas fa-eye-slash" v-else></i></button><button @click.prevent="save"><i class="fas fa-save"></i></button></div><div class="btn-group"><button class="icon" @click.prevent="today" v-if="!$store.getters['dates/isToday']"><i class="fas fa-dot-circle"></i>Today</button><button @click.prevent="next" :disabled="$store.getters['dates/isToday']"><i class="fas fa-angle-right"></i></button></div></div>`,

  name: "ActionBar",

  methods: {
    back() {
      this.$store.commit("dates/setCurrent", this.$store.getters["dates/backSlug"]);
      this.$store.dispatch("files/loadCurrent");
    },

    showCalendar() {},

    next() {
      this.$store.commit("dates/setCurrent", this.$store.getters["dates/nextSlug"]);
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
