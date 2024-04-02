import Mongoose from "mongoose";

const { Schema } = Mongoose;

const groupSchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Group = Mongoose.model("Group", groupSchema);