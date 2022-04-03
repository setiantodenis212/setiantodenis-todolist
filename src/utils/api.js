import axiosInstance from "axios";

const axios = axiosInstance.create({
  baseURL: "https://todo.api.devcode.gethired.id",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const route = {
  activity: {
    list: "/activity-groups?email=denis.setianto@gmail.com",
    create: "/activity-groups",
    detail: (id) => "/activity-groups/" + id,
    remove: (id) => "/activity-groups/" + id,
    update: (id) => "/activity-groups/" + id,
  },
  todolist: {
    create: "/todo-items",
    list: (id) => "/todo-items?activity_group_id=" + id,
    detail: (id) => "/todo-items/" + id,
    remove: (id) => "/todo-items/" + id,
    update: (id) => "/todo-items/" + id,
  },
};

export default axios;

export { route };
