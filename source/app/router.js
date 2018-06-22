import editor from "./components/editor.js";
import config from "./config.js";

export default new VueRouter({
  routes: [
    {
      name: "root",
      path: "/",
      component: editor,
      props: {
        slug: moment().format(config.slugFormat),
      },
    },
    {
      name: "editor",
      path: "/edit/:slug",
      component: editor,
      props: true,
    },
  ],
});
