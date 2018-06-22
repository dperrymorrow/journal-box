import config from "./config.js";

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

    localStorage.setItem(config.sessionKey, JSON.stringify(session));
    window.location.href = "/editor.html";
  },

  destroy() {
    localStorage.clear();
    window.location.href = "/";
  },
};
