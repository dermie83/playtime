import { db } from "../models/db.js";
import { LighthouseSpec} from "../models/joi-schemas.js";
// import { GroupSpec} from "../models/joi-schemas.js";

export const lighthouseController = {
  index: {
    handler: async function (request, h) {
      const group = await db.groupStore.getGroupById(request.params.id);
      console.log("groupID", group._id)
      const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
      console.log("lighthouseID", lighthouse)
      const viewData = {
        title: "Lighthouses",
        group: group,
        lighthouse: lighthouse,
      };
      console.log("viewdata",viewData)
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
      console.log("lighthouseID", lighthouse)
      
      const newLighthouse = {
        title: request.payload.title,
        towerHeight: request.payload.towerHeight,
        lightHeight: request.payload.lightHeight,
        character: request.payload.character,
        daymark: request.payload.daymark,
        range: request.payload.range,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        image: request.payload.image,
      };
      await db.lighthouseStore.updateLighthouse(lighthouse, newLighthouse);
      return h.redirect(`/group/${group._id}`);
    },
  },

};