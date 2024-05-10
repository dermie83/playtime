import { db } from "../models/db.js";
import { LighthouseSpec} from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const lighthouseController = {
  index: {
    handler: async function (request:Request, h:ResponseToolkit) {
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
      failAction: function (request:Request, h:ResponseToolkit, error:any) {
        return h.view("edit-lighthouse-view", { title: "Update Lighthouse error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request:Request, h:ResponseToolkit) {
      const group = await db.groupStore.getGroupById(request.params.id);
      const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
      console.log("lighthouseID", lighthouse)
      const lighthousePayload = request.payload as any;
      
      const newLighthouse = {
        title: lighthousePayload.title,
        towerHeight: lighthousePayload.towerHeight,
        lightHeight: lighthousePayload.lightHeight,
        character: lighthousePayload.character,
        daymark: lighthousePayload.daymark,
        range: lighthousePayload.range,
        latitude: lighthousePayload.latitude,
        longitude: lighthousePayload.longitude,
        image: lighthousePayload.image,
      };
      await db.lighthouseStore.updateLighthouse(lighthouse, newLighthouse);
      return h.redirect(`/group/${group._id}`);
    },
  },

};