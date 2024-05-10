import Boom from "@hapi/boom";
// import { PlaylistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { GroupSpec, GroupSpecPlus, IdSpec, GroupArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
export const groupApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const groups = await db.groupStore.getAllGroups();
                return groups;
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all GroupApi",
        notes: "Returns details of all GroupApi",
        response: { schema: GroupArray, failAction: validationError },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        async handler(request) {
            try {
                const group = await db.groupStore.getGroupById(request.params.id);
                if (!group) {
                    return Boom.notFound("No Group with this id");
                }
                return group;
            }
            catch (err) {
                return Boom.serverUnavailable("No Group with this id");
            }
        },
        tags: ["api"],
        description: "Get a specific Group",
        notes: "Returns a Group details",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: GroupSpecPlus, failAction: validationError },
    },
    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const group = request.payload;
                const newGroup = await db.groupStore.addGroup(group);
                if (newGroup) {
                    return h.response(newGroup).code(201);
                }
                return Boom.badImplementation("error creating group");
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a Group",
        notes: "Returns the newly created Group",
        validate: { payload: GroupSpec, failAction: validationError },
        response: { schema: GroupSpecPlus, failAction: validationError },
    },
    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const group = await db.groupStore.getGroupById(request.params.id);
                if (!group) {
                    return Boom.notFound("No Group with this id");
                }
                await db.groupStore.deleteGroupById(group._id);
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("No Group with this id");
            }
        },
        tags: ["api"],
        description: "Delete a Group",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.groupStore.deleteAllGroups();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all groupApi",
        notes: "All groupApi removed from Irish Lighthouses",
    },
};
