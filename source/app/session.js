import config from "./config.js";

export default {
  getSession() {
    const raw = localStorage.getItem(config.sessionKey);
    try {
      const decoded = config.encrypt ? atob(raw) : raw;
      return JSON.parse(decoded);
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  parseHash() {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const session = {};

    Array.from(params.keys()).forEach(key => {
      session[key] = params.get(key);
    });

    const str = config.encrypt ? btoa(JSON.stringify(session)) : JSON.stringify(session);
    localStorage.setItem(config.sessionKey, str);
    window.location.href = "/editor.html";
  },

  destroy() {
    localStorage.clear();
    window.location.href = "/";
  },
};
