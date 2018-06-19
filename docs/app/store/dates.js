export default {
  namespaced: true,
  state: {
    currentDate: new Date(),
  },

  mutations: {
    setCurrent(state, date) {
      if (typeof date === "string") date = new Date(date);
      state.currentDate = date;
    },
    setToday: state => (state.currentDate = new Date()),
  },

  getters: {
    backSlug(state) {
      const back = new Date(state.currentDate.getTime());
      back.setDate(back.getDate() - 1);
      return _dateToSlug(back);
    },

    isToday(state) {
      return state.currentDate.toDateString() === new Date().toDateString();
    },

    nextSlug(state, getters) {
      if (getters.isToday) return null;
      const next = new Date(state.currentDate.getTime());
      next.setDate(next.getDate() + 1);
      return _dateToSlug(next);
    },

    currentSlug: state => _dateToSlug(state.currentDate),

    currentLong(state) {
      return state.currentDate.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};

function _dateToSlug(date) {
  return date
    .toLocaleDateString("en-us", { year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/\//g, "-");
}
