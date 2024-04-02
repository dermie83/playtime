import axios from "axios";
import { db } from "../models/db.js";
import { LighthouseSpec} from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const groupController = {
  index: {
    handler: async function (request, h) {
      const group = await db.groupStore.getGroupById(request.params.id);
      const viewData = {
        title: "Lighthouses",
        group: group,
      };
      return h.view("group-view", viewData);
    },
  },

  addLighthouse: {
    validate: {
      payload: LighthouseSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("group-view", { title: "Add Lighthouse error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const group = await db.groupStore.getGroupById(request.params.id);
      const newLighthouse = {
        title: request.payload.title,
        towerHeight: request.payload.towerHeight,
        lightHeight: request.payload.lightHeight,
        character: request.payload.character,
        daymark: request.payload.daymark,
        range: request.payload.range,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        image: request.payload.image
      };

      const report = {};
      
      const api = process.env.open_api;
      // const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey.getOpenWeatherapiKey()}`
      const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${newLighthouse.latitude}&lon=${newLighthouse.longitude}&units=metric&appid=${api}`
      const result = await axios.get(requestUrl);
      // console.log("API", result);
      if (result.status === 200) {
      //     report.tempTrend = [];
      //     report.trendLabels = [];
      //     const trends = result.data.daily;
      //     for (let i=0; i<trends.length; i += 1) {
      //         report.tempTrend.push(trends[i].temp.day);
      //         const date = new Date(trends[i].dt * 1000);
      //         report.trendLabels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` );
       }; const viewData = {
            title: "Lighthouses",
            reading: result.data.current.temp,
            timezone: result.data.timezone
          };
          console.log("view api data", viewData)
          //  return h.view("group-view", viewData);
      await db.lighthouseStore.addLighthouse(group._id, newLighthouse);
      return h.redirect(`/group/${group._id}`);
    },
  },
  
  deleteLighthouse: {
    handler: async function (request, h) {
      const group = await db.groupStore.getGroupById(request.params.id);
      await db.lighthouseStore.deleteLighthouse(request.params.lighthouseid);
      return h.redirect(`/group/${group._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const group = await db.groupStore.getGroupById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          group.img = url;
          await db.groupStore.updateGroup(group);
        }
        return h.redirect(`/group/${group._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/group/${group._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};