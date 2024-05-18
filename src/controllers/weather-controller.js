import axios from "axios";
import { db } from "../models/db.js";
import { apiKey } from "../config.js";
import { readingConversions } from "../../utils/weather-conversions.js";

export const weatherController = {

    indexAPI: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            console.log("groupID", group._id);
            const lighthouse = await db.lighthouseStore.getLighthouseById(request.params.lighthouseid);
            console.log("lighthouseID", lighthouse);

            const lat =  lighthouse.latitude;
            const lng =  lighthouse.longitude;
            const report = {};
            const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey.getOpenWeatherapiKey()}`
            const result = await axios.get(requestUrl);
            if (result.status === 200) {
                console.log(result);
                
                const reading = result.data.current;
                report.lat = Number(result.data.lat)
                report.lng = Number(result.data.lon)

                report.timezone = String(result.data.timezone);

                report.code = readingConversions.roundDownWeatherCode(reading.weather[0].id);
                report.codeText = readingConversions.convertWeatherCodeToText(report.code);
                report.codeIcon = readingConversions.convertWeatherToIcon(report.code);

                report.temperature = reading.temp;
                report.farhn = readingConversions.convertTemp(report.temperature);

                report.windSpeed = reading.wind_speed;
                report.windSpeedBFT = readingConversions.convertWindSpeedToBeaufortIndex(report.windSpeed);
                report.windSpeedBFTText = readingConversions.convertBFTCodeToText(report.windSpeedBFT);
                
                report.pressure = reading.pressure;

                report.windDirection = reading.wind_deg;
                report.windDirectionText = readingConversions.convertWindDirectionToText(report.windDirection);
                report.windChill = readingConversions.calculateWindChill(report.temperature,report.windSpeed);

                report.visibility = reading.visibility;
                report.visibilityToText = readingConversions.convertVisibilityToText(report.visibility);
    
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
            const viewData1 = {
                title: "API Weather Report",
                report:report,
                group:group,
                lighthouse:lighthouse
                };


            console.log("viewdata", viewData1);
            return h.view("api-view", viewData1);
        }
    },

}