

<template lang="pug">
  .editor(:class="{shy: $store.state.ui.isShy}", @mousemove="input")
    .textarea(@input="change", contenteditable="true") {{ foo }}

</template>

<script>
export default {
  name: "Editor",

  data() {
    return {
      foo: "",
      interval: null,
      secsWithoutInput: 0,
    };
  },

  computed: {
    content() {
      return this.$store.state.files.content;
    },
  },

  methods: {
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
