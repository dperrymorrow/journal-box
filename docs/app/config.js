const BASE = {
  sessionKey: "journal-box-session",
  slugFormat: "MM-DD-YYYY",
  encrypt: true,
};

const environments = {
  local: {
    origin: "localhost",
    redirect: "http://localhost:8002/success.html",
  },
  production: {
    origin: "journal-box.com",
    redirect: "https://journal-box.com/success.html",
  },
};

const ENV = Object.keys(environments).find(key =>
  window.location.href.includes(environments[key].origin)
);

export default Object.assign(BASE, environments[ENV], { ENV });
