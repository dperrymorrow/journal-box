import session from "../session.js";

export default {
  template: `
  <div class="action-bar"><button @click.prevent="back"><</button><button @click.prevent="today" v-if="!$store.getters['dates/isToday']">Today</button><div class="btn-group"><button @click.prevent="save">Save</button><button @click.prevent="logout">Logout</button></div><button @click.prevent="$store.commit('ui/toggleShy')">Shy</button><button @click.prevent="next" v-if="!$store.getters['dates/isToday']">></button></div>`,

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
