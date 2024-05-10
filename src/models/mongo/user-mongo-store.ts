import { User } from "../../types/donation-types.js";
import { UserMongoose } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await UserMongoose.find().lean();
    return users;
  },

  async getUserById(id:string) {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user:User) {
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email:string) {
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id:string) {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await UserMongoose.deleteMany({});
  },

  async updateUser(userID:string, updatedUser:User) {
    const user = await UserMongoose.findOne({ _id: userID });
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    const updatedUserObj = await user.save();
    return updatedUserObj;
  },
};