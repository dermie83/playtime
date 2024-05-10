import Mongoose from "mongoose";
import { Group } from "../../types/donation-types";

const { Schema } = Mongoose;

const groupSchema = new Schema<Group>({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const GroupMongoose = Mongoose.model("Group", groupSchema);