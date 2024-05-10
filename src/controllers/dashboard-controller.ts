import { db } from "../models/db.js";
import { GroupSpec} from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const dashboardController = {
  index: {
    handler: async function (request:Request, h:ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      console.log("loggedInUser ", loggedInUser._id);

      // If logged in user, render dashboard view
      const groups = await db.groupStore.getUserGroups(loggedInUser._id);
      groups.sort((a, b) => (a.title > b.title ? 1 : -1));
      const viewData = {
        title: "My Lighthouse Dashboard",
        user: loggedInUser,
        groups: groups,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addGroup: {
    validate: {
      payload: GroupSpec,
      options: { abortEarly: false },
      failAction: function (request:Request, h:ResponseToolkit, error:any) {
        return h.view("dashboard-view", { title: "Add Group error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request:Request, h:ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const dashPayload = request.payload as any;
      const newGroup = {
        userid: loggedInUser._id,
        title: dashPayload.title,
      };
      await db.groupStore.addGroup(newGroup);
      return h.redirect("/dashboard");
    },
  },

  deleteGroup: {
    handler: async function (request:Request, h:ResponseToolkit) {
      const group = await db.groupStore.getGroupById(request.params.id);
      await db.groupStore.deleteGroupById(group._id);
      return h.redirect("/dashboard");
    },
  },
};

