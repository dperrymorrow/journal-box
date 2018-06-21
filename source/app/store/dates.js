const slug = "MM-DD-YYYY";

export default {
  namespaced: true,
  state: {
    currentDate: moment(),
  },

  mutations: {
    setCurrent: (state, date) => (state.currentDate = moment(date)),
    setToday: state => (state.currentDate = moment()),
  },

  getters: {
    backSlug: state =>
      state.currentDate
        .clone()
        .subtract(1, "days")
        .format(slug),

    isToday: state => state.currentDate.isSame(new Date(), "day"),

    nextSlug(state, getters) {
      if (getters.isToday) return null;
      return state.currentDate
        .clone()
        .add(1, "days")
        .format(slug);
    },

    currentSlug: state => moment(state.currentDate).format(slug),
    currentLong: state => state.currentDate.format("dddd, MMMM Do YYYY"),
  },
};
