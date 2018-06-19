export default {
  namespaced: true,
  state: {
    isShy: false,
  },

  mutations: {
    toggleShy(state) {
      state.isShy = !state.isShy;
    },
  },
};
