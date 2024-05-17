import axios from "axios";
import { db } from "../models/db.js";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const weatherController = {

    indexAPI: {
        handler: async function (request:Request, h:ResponseToolkit) {
            const group = await db.groupStore.getGroupById(request.params.id);
            console.log("groupID", group._id);
            const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
            console.log("lighthouseID", lighthouse);
            const viewData = {
                title: "Lighthouses",
                group: group,
                lighthouse: lighthouse,
            };
            console.log("viewdata", viewData);
            return h.view("list-api-coord", viewData);
        }
    },

    generateWeatherReport: {
        

        handler: async function (request:Request, h:ResponseToolkit){
    
        const report = {};
      
        const api = process.env.apiKey;
    
        const group = await db.groupStore.getGroupById(request.params.id);
        console.log("groupID", group._id)
        const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);

        const lighthousePayload = request.payload as any;
      
        const apiCoord = {
        latitude: lighthousePayload.latitude,
        longitude: lighthousePayload.longitude,
         };


    
        console.log("rendering new api call");
       
        
        const date = new Date(); // Add Current Date
        const dateTime = date.toLocaleString("en-uk", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
        const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${apiCoord.latitude}&lon=${apiCoord.longitude}&units=metric&appid=${api}`
        const result = await axios.get(requestUrl);
        if (result.status === 200) {
            // console.log(result.data);
            const latitude = apiCoord.latitude;
            const longitude = apiCoord.longitude;
            const reading = result.data.current;
            const timezone = result.data.timezone;
            // report.code = readingConversions.roundDownWeatherCode(reading.weather[0].id);
            lighthouse.report.temperature = reading.temp;
            lighthouse.report.windSpeed = reading.wind_speed;
            lighthouse.report.pressure = reading.pressure;
            lighthouse.report.windDirection = reading.wind_deg;
            lighthouse.report.timeStamp = String(dateTime);
            lighthouse.report.timezone = String(timezone);
    
            lighthouse.report.tempTrend = [];
            lighthouse.report.trendLabels = [];
            const trends = result.data.daily;
            // eslint-disable-next-line no-plusplus
            for (let i=0; i<trends.length; i++) {
              lighthouse.report.tempTrend.push(trends[i].temp.day);
                const apidate = new Date(trends[i].dt * 1000);
                lighthouse.report.trendLabels.push(`${apidate.getDate()}/${apidate.getMonth()+1}/${apidate.getFullYear()}` );
            }
            
        };
        
        // Add new openweather station and readings to user database
        {
            
            const newOpenWeatherStation = {
              reports:report
              
            };
            return h.view("api-view", newOpenWeatherStation);
      }
  }
 }
}