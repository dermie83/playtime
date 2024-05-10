import { userApi } from "./api/user-api.js";
import { groupApi } from "./api/group-api.js";
import { lighthouseApi } from "./api/lighthouse-api.js";

export const apiRoutes = [
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST" as const, path: "/api/groups", config: groupApi.create },
  { method: "DELETE" as const, path: "/api/groups", config: groupApi.deleteAll },
  { method: "GET" as const, path: "/api/groups", config: groupApi.find },
  { method: "GET" as const, path: "/api/groups/{id}", config: groupApi.findOne },
  { method: "DELETE" as const, path: "/api/groups/{id}", config: groupApi.deleteOne },

  { method: "GET" as const, path: "/api/lighthouses", config: lighthouseApi.find },
  { method: "GET" as const, path: "/api/lighthouses/{id}", config: lighthouseApi.findOne },
  { method: "POST" as const, path: "/api/groups/{id}/lighthouses", config: lighthouseApi.create },
  { method: "DELETE" as const, path: "/api/lighthouses", config: lighthouseApi.deleteAll },
  { method: "DELETE" as const, path: "/api/lighthouses/{id}", config: lighthouseApi.deleteOne },
];