import Mongoose from "mongoose";

const { Schema } = Mongoose;

const lighthouseSchema = new Schema({
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

export const Lighthouse = Mongoose.model("Lighthouse", lighthouseSchema);