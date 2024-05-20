import { lighthouseMongoStore } from "./lighthouse-mongo-store.js";
import { GroupMongoose } from "./group.js";

export const groupMongoStore = {
    async getAllGroups() {
        const groups = await GroupMongoose.find().lean();
        return groups;
    },
    async getGroupById(id) {
        if (id) {
            const group = await GroupMongoose.findOne({ _id: id }).lean();
            console.log("Get group by ID", group);
            if (group) {
                group.lighthouses = await lighthouseMongoStore.getLighthousesByGroupId(group._id);
            }
            return group;
        }
        return null;
    },
    async addGroup(group) {
        const newGroup = new GroupMongoose(group);
        console.log("New Group", newGroup);
        const groupObj = await newGroup.save();
        return this.getGroupById(groupObj._id);
    },
    async getUserGroups(id) {
        const group = await GroupMongoose.find({ userid: id }).lean();
        return group;
    },
    async deleteGroupById(id) {
        try {
            await GroupMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllGroups() {
        await GroupMongoose.deleteMany({});
    },
    async updateGroup(groupID, updatedGroup) {
        const group = await GroupMongoose.findOne({ _id: groupID._id });
        group.title = updatedGroup.title;
        // group.img = updatedGroup.img;
        const updatedGroupObj = await group.save();
        return updatedGroupObj;
    },
    
};
