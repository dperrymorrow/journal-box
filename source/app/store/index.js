import files from "./files.js";
import dates from "./dates.js";

const store = new Vuex.Store({
  state: {},
  modules: { files, dates },
});

export default store;
