import session from "../session.js";

const currentSession = session.getSession();
const Dropbox = window.Dropbox.Dropbox;
const inst = new Dropbox({ accessToken: currentSession.access_token });

export default {
  namespaced: true,
  state: {
    isLoading: false,
    fileList: [],
    content: "",
  },

  mutations: {
    setIsLoading: (state, bool) => (state.isLoading = bool),
    setContent: (state, content) => (state.content = content),
  },

  getters: {
    currentFile: (state, getters, rootState, rootGetters) =>
      `${rootGetters["dates/currentSlug"]}.txt`,
  },

  actions: {
    async loadCurrent(context, payload) {
      context.commit("setIsLoading", true);
      try {
        await inst.filesGetMetadata({ path: `/${context.getters.currentFile}` });
        const response = await inst.filesDownload({ path: `/${context.getters.currentFile}` });

        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.addEventListener("loadend", () => {
            context.commit("setContent", atob(reader.result));
            context.commit("setIsLoading", false);
            resolve(context.state.content);
          });
          reader.readAsText(response.fileBlob);
        });
      } catch (err) {
        console.error(err);
        context.commit("setContent", `${context.rootGetters["dates/currentLong"]}\n\n`);
        context.commit("setIsLoading", false);
        return context.state.content;
      }
    },

    async saveCurrent(context, payload) {
      try {
        context.commit("setIsLoading", true);
        await inst.filesUpload({
          path: `/${context.getters.currentFile}`,
          contents: btoa(context.state.content),
          mode: "overwrite",
        });
      } catch (err) {
        console.error(err);
      }
      context.commit("setIsLoading", false);
    },
  },
};
