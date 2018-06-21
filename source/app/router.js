import editor from "./components/editor.js";

export default new VueRouter({
  routes: [
    {
      name: "root",
      path: "/",
      component: editor,
      props: {
        slug: moment().format("MM-DD-YYYY"),
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
