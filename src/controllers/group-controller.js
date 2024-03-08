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
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.lighthouseStore.addLighthouse(group._id, newLighthouse);
      return h.redirect(`/group/${group._id}`);
    },
  },

  editLighthouseView: {
    handler: async function (request, h) {
      const group = await db.groupStore.getGroupById(request.params.id);
      console.log("lighthouseID", group)
      const viewData = {
        title: "Lighthouses",
        group: group,
      };
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
      console.log("group", group)
      const updateLighthouse = {
        title: request.payload.title,
        towerHeight: request.payload.towerHeight,
        lightHeight: request.payload.lightHeight,
        character: request.payload.character,
        daymark: request.payload.daymark,
        range: request.payload.range,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.lighthouseStore.updateLighthouse(group._id, updateLighthouse);
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