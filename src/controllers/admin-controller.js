// import { lighthouseSpec } from "../models/joi-schemas.js";
import { UserSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const loggedInUser = request.auth.credentials;

      const viewData = {
        title: "Lighthouse Users Admin",
        user: request.auth.credentials,
        UserLoggedIn: loggedInUser,
        users: users,
      };
      console.log("viewData", viewData)
      return h.view("admin-view", viewData);
    },
  },
 
  editUser: {
    handler: async function (request, h) {
      console.log("Editing User: " , request.params.id);
      const loggedInUser = request.auth.credentials;

      const user = await db.userStore.getUserById(request.params.id);
      const viewData = {
        title: "Edit User",
        UserLoggedIn: loggedInUser,
        user: user,
      };
      console.log("viewData", viewData)
      return h.view("edit-user-view", viewData);
    },
  },

  updateUser: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("edit-user-view", { title: "edit profile error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      console.log("loggedInUserID", user)
      const updateUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        password: request.payload.password,
        email: request.payload.email,
      };
      console.log("updateuser", updateUser)
      await db.userStore.updateUser(user._id, updateUser);
      return h.redirect("/admin");
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin");
    },
  },
};