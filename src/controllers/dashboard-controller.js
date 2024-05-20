import { db } from "../models/db.js";
import { GroupSpec } from "../models/joi-schemas.js";

export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            // console.log("loggedInUser ", loggedInUser._id);
            // If logged in user, render dashboard view
            const groups = await db.groupStore.getUserGroups(loggedInUser._id);

            const lighthouses = [];

            for (let i=0; i<groups.length; i++) {
                lighthouses.push(groups[i]._id);
            };

            const lighthouse = await db.lighthouseStore.getLighthousesByGroupId(lighthouses)

            const lat = [];
            const lng = [];
            for (let i=0; i<lighthouse.length; i++) {
                lat.push(lighthouse[i].latitude);

            };
            for (let i=0; i<lighthouse.length; i++) {
                lng.push(lighthouse[i].longitude);

            };
            

            groups.sort((a, b) => (a.title > b.title ? 1 : -1));

            const viewData = {
                title: "My Lighthouse Dashboard",
                user: loggedInUser,
                groups: groups,
                lighthouse:lighthouse,
                lat:lat,
                lng:lng,
            };
            // console.log(viewData)
            return h.view("dashboard-view", viewData);
        },
    },
    addGroup: {
        validate: {
            payload: GroupSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("dashboard-view", { title: "Add Group error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const dashPayload = request.payload;
            const newGroup = {
                userid: loggedInUser._id,
                title: dashPayload.title,
            };
            await db.groupStore.addGroup(newGroup);
            return h.redirect("/dashboard");
        },
    },

    editGroup: {
        handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          const group = await db.groupStore.getGroupById(request.params.id);
    
          const viewData = {
            title: "Edit Club",
            user: loggedInUser,
            group: group,
          };
          return h.view("edit-group-view", viewData);
        },
      },

      updateGroup: {
        validate: {
          payload: GroupSpec,
          options: { abortEarly: false },
          failAction: function (request, h, error) {
            return h.view("edit-group-view", { title: "Edit group error", errors: error.details }).takeover().code(400);
          },
        },
        handler: async function (request, h) {
          // console.log("Editing groupID: ", request.params.id);
          const group = await db.groupStore.getGroupById(request.params.id);
          const groupID = group._id;
    
          const updatedGroup = {
            title: request.payload.title,
          };
    
          await db.groupStore.updateGroup(groupID, updatedGroup);
          return h.redirect("/dashboard");
        },
      },

    deleteGroup: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            await db.groupStore.deleteGroupById(group._id);
            return h.redirect("/dashboard");
        },
    },
};
