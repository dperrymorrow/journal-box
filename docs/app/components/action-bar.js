import session from "../session.js";

export default {
  template: `
  <div class="action-bar"><router-link tag="button" :to="{ name: 'editor', params: { slug: $store.getters['dates/backSlug'] }}"><i class="fas fa-angle-left"></i></router-link><div class="btn-group"><button class="icon" @click.prevent="logout"><i class="fas fa-user-alt-slash"></i><label>logout</label></button><button @click.prevent="$store.commit('ui/toggleShy')"><i class="fas fa-eye" v-if="$store.state.ui.isShy"></i><i class="fas fa-eye-slash" v-else></i></button><button @click.prevent="downloadAll"><i class="fas fa-download"></i></button><button class="icon" @click.prevent="save"><i class="fas fa-save"></i></button><router-link class="icon" tag="button" v-if="!$store.getters['dates/isToday']" :to="{ name: 'editor', params: { slug: $store.getters['dates/todaySlug'] }}"><i class="fas fa-calendar-check"></i><label>Today</label></router-link></div><router-link tag="button" :disabled="$store.getters['dates/isToday']" :to="{ name: 'editor', params: { slug: $store.getters['dates/nextSlug'] }}"><i class="fas fa-angle-right"></i></router-link></div>`,

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

    async downloadAll() {
      const entries = await this.$store.dispatch("files/getAllEntries");
      let blob = new Blob([entries.join("\n\n")], { type: "text" });

      const a = document.createElement("a");
      a.download = "journal-box.txt";
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text", a.download, a.href].join(":");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 1500);
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