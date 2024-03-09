import { userMemStore } from "./mem/user-mem-store.js";
import { groupMemStore } from "./mem/group-mem-store.js";
import { lighthouseMemStore } from "./mem/lighthouse-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { groupJsonStore } from "./json/group-json-store.js";
import { lighthouseJsonStore } from "./json/lighthouse-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { groupMongoStore } from "./mongo/group-mongo-store.js";
import { lighthouseMongoStore } from "./mongo/lighthouse-mongo-store.js";



export const db = {
  userStore: null,
  groupStore: null,
  lighthouseStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.groupStore = groupJsonStore;
        this.lighthouseStore = lighthouseJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.groupStore = groupMongoStore;
        this.lighthouseStore = lighthouseMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.groupStore = groupMemStore;
        this.lighthouseStore = lighthouseMemStore;
    }
  },
};