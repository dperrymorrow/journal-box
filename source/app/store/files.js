import session from "../session.js";

const currentSession = session.getSession();
const Dropbox = window.Dropbox.Dropbox;
const inst = new Dropbox({ accessToken: currentSession.access_token });

export default {
  namespaced: true,
  state: {
    fileList: [],
    content: "",
  },

  mutations: {
    setContent: (state, content) => (state.content = content),
    setFileList: (state, list) => (state.fileList = list),
  },

  getters: {
    currentFile: (state, getters, rootState, rootGetters) =>
      `${rootGetters["dates/currentSlug"]}.txt`,
  },

  actions: {
    async loadFileList(context) {
      context.commit("setIsLoading", true, { root: true });
      const response = await inst.filesListFolder({ path: "" });
      const paths = response.entries.map(entry => entry.path_lower);

      context.commit("setFileList", paths);
      context.commit("setIsLoading", false, { root: true });
    },

    async getAllEntries({ dispatch, state }) {
      await dispatch("loadFileList");
      return await Promise.all(state.fileList.map(path => _readFile(path)));
    },

    async loadCurrent(context, payload) {
      context.commit("setIsLoading", true, { root: true });
      const path = `/${context.getters.currentFile}`;
      try {
        await inst.filesGetMetadata({ path });
        const content = await _readFile(path);

        context.commit("setContent", content);
        context.commit("setIsLoading", false, { root: true });
        return content;
      } catch (err) {
        console.error(err);
        context.commit("setContent", `${context.rootGetters["dates/currentLong"]}\n\n`);
        context.commit("setIsLoading", false, { root: true });
        return context.state.content;
      }
    },

    async saveCurrent(context, payload) {
      try {
        context.commit("setIsLoading", true, { root: true });
        await inst.filesUpload({
          path: `/${context.getters.currentFile}`,
          contents: btoa(context.state.content),
          mode: "overwrite",
        });
      } catch (err) {
        console.error(err);
      }
      context.commit("setIsLoading", false, { root: true });
    },
  },
};

async function _readFile(path) {
  const response = await inst.filesDownload({ path });
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.addEventListener("loadend", () => resolve(atob(reader.result)));
    reader.addEventListener("onerror", err => reject(err));
    reader.readAsText(response.fileBlob);
  });
}
