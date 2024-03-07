import { db } from "../models/db.js";
import { LighthouseSpec} from "../models/joi-schemas.js";

export const groupController = {
  index: {
    handler: async function (request, h) {
      const group = await db.groupStore.getGroupById(request.params.id);
      const viewData = {
        title: "Lighthouses",
        group: group,
      };
      return h.view("group-view", viewData);
    },
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
      const newLighthouse = {
        title: request.payload.title,
        towerHeight: request.payload.towerHeight,
        lightHeight: request.payload.lightHeight,
        character: request.payload.character,
        daymark: request.payload.daymark,
        range: request.payload.range,
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