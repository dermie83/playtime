import { db } from "../models/db.js";
import { GroupSpec } from "../models/joi-schemas.js";
export const dashboardController = {
    index: {
        handler: async function (request, h) {
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
    deleteGroup: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            await db.groupStore.deleteGroupById(group._id);
            return h.redirect("/dashboard");
        },
    },
};
