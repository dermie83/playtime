import { db } from "../models/db.js";
import { LighthouseSpec } from "../models/joi-schemas.js";

export const groupController = {
    index: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            const lighthouses = await db.lighthouseStore.getLighthousesByGroupId(group._id);
            // const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
            // console.log("Lighthouses by Group", lighthouses);
            
            const viewData = {
                title: "Lighthouses",
                group: group,
                lighthouses:lighthouses,
            };

            console.log("Group Controller viewData", viewData.lighthouses);
            return h.view("group-view", viewData);
        }
    },

    addLighthouse: {
        validate: {
            payload: LighthouseSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("group-view", { title: "Add Lighthouse error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            const groupPayload = request.payload;
            const newLighthouse = {
                title: groupPayload.title,
                towerHeight: groupPayload.towerHeight,
                lightHeight: groupPayload.lightHeight,
                character: groupPayload.character,
                daymark: groupPayload.daymark,
                range: groupPayload.range,
                latitude: groupPayload.latitude,
                longitude: groupPayload.longitude,
            };
            await db.lighthouseStore.addLighthouse(group._id, newLighthouse);
            return h.redirect(`/group/${group._id}`);
        },
    },
    deleteLighthouse: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            await db.lighthouseStore.deleteLighthouse(request.params.lighthouseid);
            return h.redirect(`/group/${group._id}`);
        },
    },
};
