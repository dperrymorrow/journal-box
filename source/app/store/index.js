import files from "./files.js";
import dates from "./dates.js";
import ui from "./ui.js";

const store = new Vuex.Store({
  state: {},
  modules: { files, dates, ui },
});

export default store;
