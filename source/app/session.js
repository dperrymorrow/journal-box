const SESS_KEY = "journal-box-session";

const environments = {
  local: {
    origin: "localhost",
    base: "http://localhost:8002",
    redirect: "http://localhost:8002/success.html",
    editor: "http://localhost:8002/editor.html",
  },
  stage: {
    origin: "github.io",
    base: "https://dperrymorrow.github.io/journal-box",
    redirect: "https://dperrymorrow.github.io/journal-box/success.html",
    editor: "https://dperrymorrow.github.io/journal-box/editor.html",
  },
};

const ENV = Object.keys(environments).find(key =>
  window.location.href.includes(environments[key].origin)
);
const CONFIG = environments[ENV];

export default {
  getSession() {
    return JSON.parse(localStorage.getItem(SESS_KEY));
  },

  ENV,
  CONFIG,

  parseHash() {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const session = {};

    Array.from(params.keys()).forEach(key => {
      session[key] = params.get(key);
    });

    localStorage.setItem(SESS_KEY, JSON.stringify(session));
    window.location.href = CONFIG.editor;
  },

  destroy() {
    localStorage.clear();
    window.location.href = CONFIG.base;
  },
};
