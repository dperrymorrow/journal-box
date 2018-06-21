export default new Router({
  routes: [
    {
      name: "root",
      path: "/",
      redirect: "projects",
    },
    {
      name: "projects",
      path: "/projects",
      component: ProjectIndex,
    },
  ],
});
