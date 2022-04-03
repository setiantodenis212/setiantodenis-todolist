import Dashboard from "./views/Dashboard";
import DetailActivity from "./views/DetailActivity";

const routes = [
  {
    name: "Dashboard",
    component: Dashboard,
    path: "/",
    exact: true,
  },
  {
    name: "Detail Activity",
    component: DetailActivity,
    path: "/detail/:id",
    exact: true,
  },
];

export default routes;
