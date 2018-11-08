import files from "./files.js";
import dates from "./dates.js";
import ui from "./ui.js";

const store = new Vuex.Store({
  state: { isLoading: false },
  modules: { files, dates, ui },
  mutations: { setIsLoading: (state, bool) => (state.isLoading = bool) },
});

export default store;
