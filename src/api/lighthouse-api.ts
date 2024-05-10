import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { LighthouseSpec, LighthouseSpecPlus, IdSpec, LighthouseArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const lighthouseApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const lighthouses = await db.lighthouseStore.getAllLighthouses();
        return lighthouses;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all lighthousesApi",
    notes: "Returns details of all lighthousesApi",
    response: { schema: LighthouseArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Get a specific lighthouse",
    notes: "Returns a lighthouse details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: LighthouseSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const lighthouse = await db.lighthouseStore.addLighthouse(request.params.id, request.payload);
        console.log("Create Lighthouse test", lighthouse);
        if (lighthouse) {
          return h.response(lighthouse).code(201);
        }
        return Boom.badImplementation("error creating lighthouse");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Lighthouse",
    notes: "Returns the newly created Lighthouse",
    validate: { payload: LighthouseSpec, failAction: validationError },
    response: { schema: LighthouseSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.lighthouseStore.deleteAllLighthouses();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all lighthousesApi",
    notes: "All lighthousesApi removed from Irish Lighthouses",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Delete a specific lighthouse",
    notes: "Deletes a lighthouse from db",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};