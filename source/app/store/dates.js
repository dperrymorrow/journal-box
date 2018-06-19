export default {
  namespaced: true,
  state: {
    currentDate: new Date(),
  },

  mutations: {
    setCurrentDate: (state, date) => (state.currentDate = date),
    setToday: state => (state.currentDate = new Date()),
  },

  getters: {
    slugFormat(state) {
      return state.currentDate
        .toLocaleDateString("en-us", { year: "numeric", month: "2-digit", day: "2-digit" })
        .replace(/\//g, "-");
    },

    longDate(state) {
      return state.currentDate.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
