<template lang="pug">
  .action-bar
    //- .btn-group
    router-link(
      tag="button",
      :to="{ name: 'editor', params: { slug: $store.getters['dates/backSlug'] }}"
    )
      i.fas.fa-angle-left
    //- button(@click.prevent="showCalendar")
    //-   i.fas.fa-calendar-alt


    .btn-group
      button.icon(@click.prevent="logout")
        i.fas.fa-user-alt-slash
        label logout

      button(@click.prevent="$store.commit('ui/toggleShy')")
        i.fas.fa-eye(v-if="$store.state.ui.isShy")
        i.fas.fa-eye-slash(v-else)

      button(@click.prevent="downloadAll")
        i.fas.fa-download

      button.icon(@click.prevent="save")
        i.fas.fa-save

      router-link.icon(
        tag="button",
        v-if="!$store.getters['dates/isToday']",
        :to="{ name: 'editor', params: { slug: $store.getters['dates/todaySlug'] }}"
      )
        i.fas.fa-calendar-check
        label Today


    router-link(
      tag="button",
      :disabled="$store.getters['dates/isToday']",
      :to="{ name: 'editor', params: { slug: $store.getters['dates/nextSlug'] }}"
    )
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
</script>
