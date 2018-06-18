

<template lang="pug">
  .editor
    textarea(v-model="content")
    .action-bar
      button(@click.prevent="save") Save

</template>

<script>

  export default {
    name: "editor",

    async mounted() {
      await this.$store.dispatch("loadCurrentFile");
    },

    computed: {
      content: {
        get () {
          return this.$store.state.content;
        },
        set (content) {
          this.$store.commit("setContent", content)
        }
      }
    },

    methods: {
      save() {
        this.$store.dispatch("saveCurrentFile");
      }
    }
  }
</script>