import { db } from "../models/db.js";
import { LighthouseSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const groupController = {
    index: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            const viewData = {
                title: "Lighthouses",
                group: group,
            };
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
                image: groupPayload.image
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
    uploadImage: {
        handler: async function (request, h) {
            try {
                const group = await db.groupStore.getGroupById(request.params.id);
                const imagePayload = request.payload;
                const file = imagePayload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(imagePayload.imagefile);
                    group.img = url;
                    await db.groupStore.updateGroup(group);
                }
                return h.redirect(`/group/${group._id}`);
            }
            catch (err) {
                console.log(err);
                return h.view("main", { errors: [{ message: err.message }] });
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
};
