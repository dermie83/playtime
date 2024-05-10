import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";
import { userMongoStore } from "./user-mongo-store.js";
import { lighthouseMongoStore } from "./lighthouse-mongo-store.js";
import { groupMongoStore } from "./group-mongo-store.js";
const seedLib = mongooseSeeder.default;
async function seed() {
    const seeder = seedLib(Mongoose);
    const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
    console.log(dbData);
}
export function connectMongo(db) {
    dotenv.config();
    Mongoose.set("strictQuery", true);
    Mongoose.connect(process.env.db);
    const mongodb = Mongoose.connection;
    db.userStore = userMongoStore;
    db.lighthouseStore = lighthouseMongoStore;
    db.groupStore = groupMongoStore;
    mongodb.on("error", (err) => {
        console.log(`database connection error: ${err}`);
    });
    mongodb.on("disconnected", () => {
        console.log("database disconnected");
    });
    mongodb.once("open", function () {
        console.log(`database connected to ${this.name} on ${this.host}`);
        seed();
    });
}
