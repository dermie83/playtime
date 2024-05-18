import { db } from "../models/db.js";
import { LighthouseSpec } from "../models/joi-schemas.js";

export const lighthouseController = {
    index: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            console.log("groupID", group._id);
            const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
            console.log("lighthouseID", lighthouse);
            const viewData = {
                title: "Lighthouses",
                group: group,
                lighthouse: lighthouse,
            };
            console.log("viewdata", viewData);
            return h.view("edit-lighthouse-view", viewData);
        },
    },
    updateLighthouse: {
        validate: {
            payload: LighthouseSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("edit-lighthouse-view", { title: "Update Lighthouse error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
            console.log("lighthouseID", lighthouse);
            const lighthousePayload = request.payload;
            const newLighthouse = {
                title: lighthousePayload.title,
                towerHeight: lighthousePayload.towerHeight,
                lightHeight: lighthousePayload.lightHeight,
                character: lighthousePayload.character,
                daymark: lighthousePayload.daymark,
                range: lighthousePayload.range,
                latitude: lighthousePayload.latitude,
                longitude: lighthousePayload.longitude,
                img:lighthousePayload.longitude,
            };
            await db.lighthouseStore.updateLighthouse(lighthouse, newLighthouse);
            return h.redirect(`/group/${group._id}`);
        },
    },
    // uploadImage: {
    //     handler: async function (request, h) {
    //         try {
    //             const group = await db.groupStore.getGroupById(request.params.id);
    //             const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
    //             const imagePayload = request.payload;
    //             const file = imagePayload.imagefile;
    //             if (Object.keys(file).length > 0) {
    //                 const url = await imageStore.uploadImage(imagePayload.imagefile);
    //                 lighthouse.img = url;
    //                 await db.lighthouseStore.updateLighthouse(lighthouse);
    //             }
    //             return h.redirect(`/group/${group._id}`);
    //         }
    //         catch (err) {
    //             console.log(err);
    //             return h.view("main", { errors: [{ message: err.message }] });
    //         }
    //     },
    //     payload: {
    //         multipart: true,
    //         output: "data",
    //         maxBytes: 209715200,
    //         parse: true,
    //     },
    // },
};
