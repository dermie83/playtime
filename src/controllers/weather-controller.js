import axios from "axios";
import { db } from "../models/db.js";
import { apiKey } from "../config.js";

export const weatherController = {

    indexAPI: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            console.log("groupID", group._id);
            const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
            // const lighthouse = await db.lighthouseStore.getLighthousesByGroupId(group._id);
            console.log("lighthouseID", lighthouse);
            const viewData = {
                title: "Lighthouses",
                group: group,
                lighthouse: lighthouse,
            };

            const lat =  viewData.lighthouse.latitude;
            const lng =  viewData.lighthouse.longitude;

            const report = {};

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
            const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey.getOpenWeatherapiKey()}`
            const result = await axios.get(requestUrl);
            if (result.status === 200) {
                console.log(result);
                
                
                const reading = result.data.current;
                report.lat = result.data.lat
                report.lng = result.data.lng
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
                
                for (let i=0; i<trends.length; i++) {
                    report.tempTrend.push(trends[i].temp.day);
                    const date = new Date(trends[i].dt * 1000);
                    report.trendLabels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` );
                }
                
            };
            const viewData1 = {
                title: "API Weather Report",
                report:report
                };


            console.log("viewdata", viewData1);
            return h.view("api-view", viewData1);
        }
    },

    // generateWeatherReport:{
    //     handler: async function (request, response) {

    //         const group = await db.groupStore.getGroupById(request.params.id);
    //         const lighthouse = await db.lighthouseStore.getLighthousesByGroupId(group._id);

    //         // const api = process.env.apiKey;
    
    //         console.log("rendering new api call");


    //         const report = {};

    //         const lat = lighthouse.latitude;
    //         const lng = lighthouse.longitude;
            
            
    //         const dates = new Date(); // Add Current Date
    //         const dateTime = dates.toLocaleString("en-uk", {
    //         year: "numeric",
    //         month: "2-digit",
    //         day: "2-digit",
    //         hour: "2-digit",
    //         minute: "2-digit",
    //         second: "2-digit",
    //         hour12: false,
    //     });
    //         const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey.getOpenWeatherapiKey()}`
    //         const result = await axios.get(requestUrl);
    //         if (result.status === 200) {
    //             console.log(result);
                
                
    //             const reading = result.data.current;
    //             report.lat = result.data.lat
    //             report.lng = result.data.lng
    //             const {timezone} = result.data;
    //             // report.code = readingConversions.roundDownWeatherCode(reading.weather[0].id);
    //             report.temperature = reading.temp;
    //             report.windSpeed = result.data.current.wind_speed;
    //             report.pressure = result.data.current.pressure;
    //             report.windDirection = result.data.current.wind_deg;
    //             report.timeStamp = String(dateTime);
    //             report.timezone = String(timezone);
    
    //             report.tempTrend = [];
    //             report.trendLabels = [];
    //             const trends = result.data.current.daily;
    //             // eslint-disable-next-line no-plusplus
    //             for (let i=0; i<trends.length; i++) {
    //                 report.tempTrend.push(trends[i].temp.day);
    //                 const date = new Date(trends[i].dt * 1000);
    //                 report.trendLabels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` );
    //             }
                
    //         };
            
            
    //         const viewData = {
    //         title: "API Weather Report",
    //         report:report
    //         };
    //         response.render("api-view", viewData);
    
    //     },

    // }
}