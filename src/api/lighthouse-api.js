import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const lighthouseApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const lighthouses = await db.lighthouseStore.getAllLighthouses();
        return lighthouses;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.id);
        if (!lighthouse) {
          return Boom.notFound("No lighthouse with this id");
        }
        return lighthouse;
      } catch (err) {
        return Boom.serverUnavailable("No lighthouse with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const lighthouse = await db.lighthouseStore.addLighthouse(request.params.id, request.payload);
        if (lighthouse) {
          return h.response(lighthouse).code(201);
        }
        return Boom.badImplementation("error creating lighthouse");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.lighthouseStore.deleteAllLighthouses();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const lighthouse = await db.lighthouseStore.getLighthousById(request.params.id);
        if (!lighthouse) {
          return Boom.notFound("No Lighthouse with this id");
        }
        await db.lighthouseStore.deleteLighthouse(lighthouse._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Lighthouse with this id");
      }
    },
  },
};