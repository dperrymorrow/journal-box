import config from "../config.js";

export default {
  namespaced: true,
  state: {
    currentDate: moment(),
  },

  mutations: {
    setCurrentFromSlug: (state, dateStr) =>
      (state.currentDate = moment(dateStr, config.slugFormat)),
    setToday: state => (state.currentDate = moment()),
  },

  getters: {
    backSlug: state =>
      state.currentDate
        .clone()
        .subtract(1, "days")
        .format(config.slugFormat),

    todaySlug: state => moment().format(config.slugFormat),

    isToday: state => state.currentDate.isSame(new Date(), "day"),

    nextSlug(state, getters) {
      if (getters.isToday) return null;
      return state.currentDate
        .clone()
        .add(1, "days")
        .format(config.slugFormat);
    },

    currentSlug: state => state.currentDate.format(config.slugFormat),
    currentLong: state => state.currentDate.format("dddd, MMMM Do YYYY"),
  },
};
