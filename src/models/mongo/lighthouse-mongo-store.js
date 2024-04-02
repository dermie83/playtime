import { Lighthouse } from "./lighthouse.js";

export const lighthouseMongoStore = {
  async getAllLighthouses() {
    const lighthouses = await Lighthouse.find().lean();
    return lighthouses;
  },

  async getLighthousesByGroupId(id) {
    const lighthouses = await Lighthouse.find({ groupid: id }).lean();
    return lighthouses;
  },

  async addLighthouse(groupId, lighthouse) {
    // get the group id
    lighthouse.groupid = groupId;
    // create a new lighthouse object/array
    const newLighthouse = new Lighthouse(lighthouse);
    console.log("New Lighthouse",newLighthouse);
    // save the new lighthouse object/array
    const lighthouseObj = await newLighthouse.save();
    // return the new lighthouse object with new id
    return this.getLighthouseById(lighthouseObj._id);
  },

  async getLighthouseById(id) {
    if (id) {
      const lighthouse = await Lighthouse.findOne({ _id: id }).lean();
      return lighthouse;
    }
    return null;
  },

  async deleteLighthouse(id) {
    try {
      await Lighthouse.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLighthouses() {
    await Lighthouse.deleteMany({});
  },

  async updateLighthouse(lighthouse, updatedLighthouse) {
    const lighthouseDoc = await Lighthouse.findOne({ _id: lighthouse._id });
    lighthouseDoc.title = updatedLighthouse.title;
    lighthouseDoc.lightHeight = updatedLighthouse.lightHeight;
    lighthouseDoc.character = updatedLighthouse.character;
    lighthouseDoc.daymark = updatedLighthouse.daymark;
    lighthouseDoc.range = updatedLighthouse.range;
    lighthouseDoc.latitude = updatedLighthouse.latitude;
    lighthouseDoc.longitude = updatedLighthouse.longitude;
    
    await lighthouseDoc.save();
  },

};