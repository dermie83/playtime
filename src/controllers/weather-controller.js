import axios from "axios";
import { db } from "../models/db.js";

export const weatherController = {

    indexAPI: {
        handler: async function (request, h) {
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
            return h.view("api-view", viewData);
        }
    },

    generateWeatherReport: {
        handler: async function (request, h){
    
        const report = {};
      
        const api = process.env.apiKey;
    
        const group = await db.groupStore.getGroupById(request.params.id);
        console.log("groupID", group._id)
        const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
    
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
        const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lighthouse.latitude}&lon=${lighthouse.longitude}&units=metric&appid=${api}`
        const result = await axios.get(requestUrl);
        if (result.status === 200) {
            
            const reading = result.data.current;
            const {timezone} = result.data;
            // report.code = readingConversions.roundDownWeatherCode(reading.weather[0].id);
            report.temperature = reading.temp;
            report.windSpeed = reading.wind_speed;
            report.pressure = reading.pressure;
            report.windDirection = reading.wind_deg;
            report.timeStamp = String(dateTime);
            report.timezone = String(timezone);
    
            report.tempTrend = [];
            report.trendLabels = [];
            const trends = result.data.daily;
            // eslint-disable-next-line no-plusplus
            for (let i=0; i<trends.length; i++) {
              report.tempTrend.push(trends[i].temp.day);
                const apidate = new Date(trends[i].dt * 1000);
                report.trendLabels.push(`${apidate.getDate()}/${apidate.getMonth()+1}/${apidate.getFullYear()}` );
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