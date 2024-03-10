import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { lighthouseJsonStore } from "./lighthouse-json-store.js";

export const groupJsonStore = {
  async getAllGroups() {
    await db.read();
    return db.data.groups;
  },

  async addGroup(group) {
    await db.read();
    group._id = v4();
    db.data.groups.push(group);
    await db.write();
    return group;
  },

  async getGroupById(id) {
    await db.read();
    let list = db.data.groups.find((group) => group._id === id);
    if (list){
      list.lighthouses = await lighthouseJsonStore.getLighthousesByGroupId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserGroups(userid) {
    await db.read();
    return db.data.groups.filter((group) => group.userid === userid);
  },

  async deleteGroupById(id) {
    await db.read();
    const index = db.data.groups.findIndex((group) => group._id === id);
    if (index !== -1) db.data.groups.splice(index, 1);
    await db.write();
  },

  async deleteAllGroups() {
    db.data.groups = [];
    await db.write();
  },
};