import { db } from "../models/db.js";
// import { LighthouseSpec} from "../models/joi-schemas.js";
// import { GroupSpec} from "../models/joi-schemas.js";

export const lighthouseController = {
  index: {
    handler: async function (request, h) {
      const groupid = await db.groupStore.getGroupById(request.params.id);
      console.log("groupID", groupid._id)
      const lighthouseid = await db.lighthouseStore.getLighthousesByGroupId(groupid._id);
      console.log("lighthouseID", lighthouseid)
      const viewData = {
        title: "Lighthouses",
        lighthouse: lighthouseid,
      };
      console.log("viewdata",viewData)
      return h.view("edit-lighthouse-view", viewData);
    },
  },

  // updateLighthouse: {
  //   validate: {
  //     payload: LighthouseSpec,
  //     options: { abortEarly: false },
  //     failAction: function (request, h, error) {
  //       return h.view("edit-lighthouse-view", { title: "Update Lighthouse error", errors: error.details }).takeover().code(400);
  //     },
  //   },
  //   handler: async function (request, h) {
  //     const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.id);
  //     console.log("lighthouseID", lighthouse)
  //     const newLighthouse = {
  //       title: request.payload.title,
  //       towerHeight: request.payload.towerHeight,
  //       lightHeight: request.payload.lightHeight,
  //       character: request.payload.character,
  //       daymark: request.payload.daymark,
  //       range: request.payload.range,
  //       latitude: request.payload.latitude,
  //       longitude: request.payload.longitude,
  //     };
  //     await db.lighthouseStore.updateLighthouse(lighthouse._id, newLighthouse);
  //     return h.redirect(`/group/${group._id}`);
  //   },
  // },

};