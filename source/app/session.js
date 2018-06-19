const SESS_KEY = "journal-box-session";

export default {
  getSession() {
    return JSON.parse(localStorage.getItem(SESS_KEY));
  },

  parseHash() {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const session = {};

    Array.from(params.keys()).forEach(key => {
      session[key] = params.get(key);
    });

    localStorage.setItem(SESS_KEY, JSON.stringify(session));
  },

  destroy() {
    localStorage.clear();
  },
};
