import Mongoose from "mongoose";
import { Lighthouse } from "../../types/donation-types";


const { Schema } = Mongoose;

const lighthouseSchema = new Schema<Lighthouse>({
  title: String,
  towerHeight: Number,
  lightHeight: Number,
  character: String,
  daymark: String,
  range: Number,
  latitude: Number,
  longitude: Number,

  groupid: {
    type: Schema.Types.ObjectId,
    ref: "Irish Lighthouses",
  },
});

export const LighthouseMongoose = Mongoose.model("Lighthouse", lighthouseSchema);