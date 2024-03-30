import { userApi } from "./api/user-api.js";
import { groupApi } from "./api/group-api.js";
import { lighthouseApi } from "./api/lighthouse-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/groups", config: groupApi.create },
  { method: "DELETE", path: "/api/groups", config: groupApi.deleteAll },
  { method: "GET", path: "/api/groups", config: groupApi.find },
  { method: "GET", path: "/api/groups/{id}", config: groupApi.findOne },
  { method: "DELETE", path: "/api/groups/{id}", config: groupApi.deleteOne },

  { method: "GET", path: "/api/lighthouses", config: lighthouseApi.find },
  { method: "GET", path: "/api/lighthouses/{id}", config: lighthouseApi.findOne },
  { method: "POST", path: "/api/groups/{id}/lighthouses", config: lighthouseApi.create },
  { method: "DELETE", path: "/api/lighthouses", config: lighthouseApi.deleteAll },
  { method: "DELETE", path: "/api/lighthouses/{id}", config: lighthouseApi.deleteOne },
];