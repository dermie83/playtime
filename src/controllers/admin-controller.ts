// import { lighthouseSpec } from "../models/joi-schemas.js";
import { UserSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const adminController = {
  index: {
    handler: async function (request:Request, h:ResponseToolkit) {
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
    handler: async function (request:Request, h:ResponseToolkit) {
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
      failAction: function (request:Request, h:ResponseToolkit, error:any) {
        return h.view("edit-user-view", { title: "edit profile error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request:Request, h:ResponseToolkit) {
      const user = await db.userStore.getUserById(request.params.id);
      const adminPayload = request.payload as any;
      console.log("loggedInUserID", user)
      const updateUser = {
        firstName: adminPayload.firstName,
        lastName: adminPayload.lastName,
        password: adminPayload.password,
        email: adminPayload.email,
      };
      console.log("updateuser", updateUser)
      await db.userStore.updateUser(user._id, updateUser);
      return h.redirect("/admin");
    },
  },

  deleteUser: {
    handler: async function (request:Request, h:ResponseToolkit) {
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin");
    },
  },
};