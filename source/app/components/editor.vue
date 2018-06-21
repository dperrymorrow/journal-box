

<template lang="pug">
  .editor(:class="{shy: $store.state.ui.isShy}", @mousemove="input")
    .textarea(@input="change", contenteditable="true") {{ content }}

</template>

<script>
export default {
  name: "Editor",

  props: {
    slug: {
      required: true,
      type: String,
    },
  },

  data() {
    return {
      content: "",
      interval: null,
      secsWithoutInput: 0,
    };
  },

  watch: {
    $route(to, from) {
      if (to.name === "editor") this.startUp();
    },
  },

  mounted() {
    this.startUp();
  },

  methods: {
    async startUp() {
      this.$store.commit("dates/setCurrentFromSlug", this.slug);
      this.content = await this.$store.dispatch("files/loadCurrent");
    },

    change(event) {
      this.$store.commit("files/setContent", event.target.innerText);
    },

    watchForInactivity() {
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.secsWithoutInput++;
        if (this.secsWithoutInput > 30 && !this.$store.state.ui.isShy)
          this.$store.commit("ui/toggleShy");
        else if (this.secsWithoutInput > 120) window.location.href = "http://google.com";
      }, 1000);
    },
    input() {
      this.secsWithoutInput = 0;
    },
  },
};
</script>
