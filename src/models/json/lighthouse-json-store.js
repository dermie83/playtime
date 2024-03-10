import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const lighthouseJsonStore = {
  async getAllLighthouses() {
    await db.read();
    return db.data.lighthouses;
  },

  async addLighthouse(groupId, lighthouse) {
    await db.read();
    lighthouse._id = v4();
    lighthouse.groupid = groupId;
    db.data.lighthouses.push(lighthouse);
    await db.write();
    return lighthouse;
  },

  async getLighthousesByGroupId(id) {
    await db.read();
    let foundLighthouses = db.data.lighthouses.filter((lighthouse) => lighthouse.groupid === id);
    if (!foundLighthouses){
      foundLighthouses = null;
    }
    return foundLighthouses;
  },

  async getLighthouseById(id) {
    await db.read();
    let foundLighthouse = db.data.lighthouses.find((lighthouse) => lighthouse._id === id);
    if (!foundLighthouse){
      foundLighthouse = null;
    }
    return foundLighthouse;
  },

  async deleteLighthouse(id) {
    await db.read();
    const index = db.data.lighthouses.findIndex((lighthouse) => lighthouse._id === id);
    if (index !== -1) db.data.lighthouses.splice(index, 1);
    await db.write();
  },

  async deleteAllLighthouses() {
    db.data.lighthouses = [];
    await db.write();
  },

  async updateLighthouse(lighthouse, updatedLighthouse) {
    await db.read();
    lighthouse.title = updatedLighthouse.title;
    lighthouse.towerHeight = updatedLighthouse.towerHeight;
    lighthouse.lightHeight = updatedLighthouse.lightHeight;
    lighthouse.character = updatedLighthouse.character;
    lighthouse.daymark = updatedLighthouse.daymark;
    lighthouse.range = updatedLighthouse.range;
    lighthouse.latitude = updatedLighthouse.latitude;
    lighthouse.longitude = updatedLighthouse.longitude;
    lighthouse.image = updatedLighthouse.image;

    await db.write();
  },
};