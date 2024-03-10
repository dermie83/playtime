import { v4 } from "uuid";
import { lighthouseMemStore } from "./lighthouse-mem-store.js";

let groups = [];

export const groupMemStore = {
  async getAllGroups() {
    return groups;
  },

  async addGroup(group) {
    group._id = v4();
    groups.push(group);
    return group;
  },

  async getGroupById(id) {
    const list = groups.find((group) => group._id === id);
    list.lighthouses = await lighthouseMemStore.getLighthouseByGroupId(list._id);
    return list;
  },

  async getUserGroups(userid) {
    return groups.filter((group) => group.userid === userid);
  },

  async deleteGroupById(id) {
    const index = groups.findIndex((group) => group._id === id);
    groups.splice(index, 1);
  },

  async deleteAllGroups() {
    groups = [];
  },

  async updateGroup(group, updatedGroup) {
    group.title = updatedGroup.title;
  },
};