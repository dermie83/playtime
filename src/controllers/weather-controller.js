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

    generateWeatherReport:{
        handler: async function (request, response) {

            const group = await db.groupStore.getGroupById(request.params.id);
            console.log("groupID", group._id)
            const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);

            const api = process.env.apiKey;
    
            console.log("rendering new api call");


            const report = {};

            const lat = lighthouse.latitude;
            const lng = lighthouse.longitude;
            
            
            const dates = new Date(); // Add Current Date
            const dateTime = dates.toLocaleString("en-uk", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
            const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api}`
            const result = await axios.get(requestUrl);
            if (result.status === 200) {
                
                
                const reading = result.data.current;
                // const timezone = result.data.timezone;
                report.code = readingConversions.roundDownWeatherCode(reading.weather[0].id);
                report.temperature = reading.temp;
                report.windSpeed = reading.wind_speed;
                report.pressure = reading.pressure;
                report.windDirection = reading.wind_deg;
                report.timeStamp = String(dateTime);
                // report.timezone = String(timezone);
    
                report.tempTrend = [];
                report.trendLabels = [];
                const trends = result.data.daily;
                // eslint-disable-next-line no-plusplus
                for (let i=0; i<trends.length; i++) {
                    report.tempTrend.push(trends[i].temp.day);
                    const date = new Date(trends[i].dt * 1000);
                    report.trendLabels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` );
                }
                
            };
            
            // Add new openweather station and readings to user database
            {
                // const loggedInUser = await accountsController.getLoggedInUser(request);
                
                const newOpenWeatherStation = {
                  
                  report:report
                  
                  
                };
                console.log(`adding openweatherstation ${newOpenWeatherStation.name}`);
                // const openstation = await stationStore.addStation(newOpenWeatherStation);
                // await readingStore.addReading(openstation._id, report);
                console.log("test1");
            };
            console.log(report);
            
            const viewData = {
            title: "API Weather Report",
            lat:lat,
            lng:lng,
            reading:report
            };
            response.render("api-view", viewData);
    
        },

    }
}