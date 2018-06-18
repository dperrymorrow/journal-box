

import session from "./session.js";

const currentSession = session.getSession();
const Dropbox = window.Dropbox.Dropbox;
const inst = new Dropbox({ accessToken: currentSession.access_token });

const store = new Vuex.Store({
  state: {
    content: "",
    currentDate: new Date(),
  },

  getters: {
    longDate(context) {
      return context.currentDate.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },

    currentFile(context) {
      return context.currentDate.toLocaleDateString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') + '.txt'
    }
  },

  mutations: {
    setContent: (state, content) => (state.content = content),
  },

  actions: {

    async loadCurrentFile(context, payload) {
      try {
        await inst.filesGetMetadata({path: `/${context.getters.currentFile}`});
        const response = await inst.filesDownload({path : `/${context.getters.currentFile}`})

        const reader = new FileReader();
        reader.addEventListener("loadend", () => (context.commit("setContent", atob(reader.result))));
        reader.readAsText(response.fileBlob);

      } catch(err) {
        console.error(err);
        context.commit("setContent", `${context.getters.longDate}\n\n`);
      }

    },

    async saveCurrentFile(context, payload) {
      try {
        await inst.filesUpload({path: `/${context.getters.currentFile}`, contents: btoa(context.state.content), mode: "overwrite"});
      } catch(err) {
        console.error(err)
      }
    }
  }

});


export default store;

