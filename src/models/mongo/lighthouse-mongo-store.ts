import { Lighthouse } from "../../types/donation-types.js";
import { LighthouseMongoose } from "./lighthouse.js";

export const lighthouseMongoStore = {
  async getAllLighthouses() {
    const lighthouses = await LighthouseMongoose.find().lean();
    return lighthouses;
  },

  async getLighthousesByGroupId(id:string) {
    const lighthouses = await LighthouseMongoose.find({ groupid: id }).lean();
    return lighthouses;
  },

  async addLighthouse(groupId:string, lighthouse:Lighthouse) {
    // get the group id
    lighthouse.groupid = groupId;
    // create a new lighthouse object/array
    const newLighthouse = new LighthouseMongoose(lighthouse);
    console.log("New Lighthouse",newLighthouse);
    // save the new lighthouse object/array
    const lighthouseObj = await newLighthouse.save();
    // return the new lighthouse object with new id
    return this.getLighthouseById(lighthouseObj._id);
  },

  async getLighthouseById(id:string) {
    if (id) {
      const lighthouse = await LighthouseMongoose.findOne({ _id: id }).lean();
      return lighthouse;
    }
    return null;
  },

  async deleteLighthouse(id:string) {
    try {
      await LighthouseMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLighthouses() {
    await LighthouseMongoose.deleteMany({});
  },

  async updateLighthouse(lighthouseid:string, updatedLighthouse:Lighthouse) {
    const lighthouseDoc = await LighthouseMongoose.findOne({ _id: lighthouseid });
    lighthouseDoc.title = updatedLighthouse.title;
    lighthouseDoc.lightHeight = updatedLighthouse.lightHeight;
    lighthouseDoc.character = updatedLighthouse.character;
    lighthouseDoc.daymark = updatedLighthouse.daymark;
    lighthouseDoc.range = updatedLighthouse.range;
    lighthouseDoc.latitude = updatedLighthouse.latitude;
    lighthouseDoc.longitude = updatedLighthouse.longitude;
    lighthouseDoc.report = updatedLighthouse.report;
    
   

    
    await lighthouseDoc.save();
  },

};