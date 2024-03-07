import { v4 } from "uuid";

let lighthouses = [];

export const lighthouseMemStore = {
  async getAllLighthouses() {
    return lighthouses;
  },

  async addLighthouse(groupId, lighthouse) {
    lighthouse._id = v4();
    lighthouse.groupid = groupId;
    lighthouses.push(lighthouse);
    return lighthouse;
  },

  async getLighthouseByGroupId(id) {
    return lighthouses.filter((lighthouse) => lighthouse.groupid === id);
  },

  async getLighthouseById(id) {
    return lighthouses.find((lighthouse) => lighthouse._id === id);
  },

  async getGroupLighthouses(groupId) {
    return lighthouses.filter((lighthouse) => lighthouse.groupid === groupId);
  },

  async deleteLighthouse(id) {
    const index = lighthouses.findIndex((lighthouse) => lighthouse._id === id);
    lighthouses.splice(index, 1);
  },

  async deleteAllLighthouses() {
    lighthouses = [];
  },

  async updateLighthouse(lighthouse, updatedLighthouse) {
    lighthouse.title = updatedLighthouse.title;
    lighthouse.towerHeight = updatedLighthouse.towerHeight;
    lighthouse.lightHeight = updatedLighthouse.lightHeight;
    lighthouse.character = updatedLighthouse.character;
    lighthouse.daymark = updatedLighthouse.daymark;
    lighthouse.range = updatedLighthouse.range;
    lighthouse.latitiude = updatedLighthouse.latitiude;
    lighthouse.longitiude = updatedLighthouse.longitiude;
  },
};
