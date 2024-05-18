/**
 * This class handles things related to the reading conversions
 *
 */
export const readingConversions = {
    
    /**
      * This method converts celsius temp to fahrenheit temp
      * @param celsius
      * 
      *  @return rounded number
      */
   convertTemp(celsius) {
     const fahrenheitTemp =((celsius*9)/5)+32;
     return Math.round(fahrenheitTemp);
   },
 
    /**
      * This method floors the weathercode number to the nearest hundreth
      * @param code
      * 
      * @return integer
      */
   roundDownWeatherCode(code){
     const nearestHundred = Math.floor(code/100)*100;
     return nearestHundred;
   },
   
    /**
      * This method converts the weathercode to a descriptive text
      * @param WeatherCode
      * 
      * @return string
      */
   convertWeatherCodeToText(WeatherCode) {
 
         switch (WeatherCode) {
             case 100:
                 return "Clear";
             case 200:
                 return "Partial Clouds";
             case 300:
                 return "Cloudy";
             case 400:
                 return "Light Showers";
             case 500:
                 return "Heavy Showers";
             case 600:
                 return "Rain";
             case 700:
                 return "Snow";
             case 800:
                 return "Thunder";
             default:
                 return "No Code Number";
         }
 
     },
   
     /**
      * This method converts the weathercode to a svg icon
      * @param WeatherCode
      * 
      * @return svg icon
      */
   convertWeatherToIcon(WeatherCode) {
 
         switch (WeatherCode) {
             case 100:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-800.svg?v=1690975955616";
             case 200:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-801.svg?v=1690975953124";
             case 300:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-804.svg?v=1690975954603";
             case 400:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-520.svg?v=1690975917468";
             case 500:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-522.svg?v=1690975918393";
             case 600:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-501.svg?v=1690975922765";
             case 700:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-600.svg?v=1690975938579";
             case 800:
                 return "https://cdn.glitch.global/0fa94a6d-c73c-4106-b4c8-60a78df7dea0/weather-211.svg?v=1690975903178";
             default:
                 return "No Icon";
         }
 
     },
   
     /**
      * This method converts the windspeed range to an index integer
      * @param windSpeed
      * 
      *  @return integer
      */
   convertWindSpeedToBeaufortIndex(windSpeed) {
 
         if (windSpeed === 1)
         {
             return 0;
         }
         if ((windSpeed > 1) && (windSpeed <= 5))
         {
             return 1;
         }
         if ((windSpeed > 5) && (windSpeed <= 11))
         {
             return 2;
         }
         if ((windSpeed > 11) && (windSpeed <= 19))
         {
             return 3;
         }
         if ((windSpeed > 19) && (windSpeed <= 28))
         {
             return 4;
         }
         if ((windSpeed > 28) && (windSpeed <= 38))
         {
             return 5;
         }
         if ((windSpeed > 38) && (windSpeed <= 49))
         {
             return 6;
         }
         if ((windSpeed > 49) && (windSpeed <= 61))
         {
             return 7;
         }
         if ((windSpeed > 61) && (windSpeed <= 74))
         {
             return 8;
         }
         if ((windSpeed > 74) && (windSpeed <= 88))
         {
             return 9;
         }
         if ((windSpeed > 88) && (windSpeed <= 102))
         {
             return 10;
         }
         if ((windSpeed > 102) && (windSpeed <= 117))
         {
           return 11;
         }
         return -1;
         
    },
   
     /**
      * This method converts the beaufort code index to descriptive text
      * @param bftCode 
      * 
      *  @return string
      */
   convertBFTCodeToText(bftCode) {
 
         switch (bftCode) {
             case 0:
                 return "Calm";
             case 1:
                 return "Light Air";
             case 2:
                 return "Light Breeze";
             case 3:
                 return "Gentle Breeze";
             case 4:
                 return "Moderate Breeze";
             case 5:
                 return "Fresh Breeze";
             case 6:
                 return "Strong Breeze";
             case 7:
                 return "Near Gale";
             case 8:
                 return "Gale";
             case 9:
                 return "Severe Gale";
             case 10:
                 return "Strong Storm";
             case 11:
                 return "Violent Storm";
             default:
                 return "No wind conditions";
         }
        },
   
     /**
      * This method calculates windchill
      * Takes in 2 parameters
      * @param Temp is the stations temperature in celcius
      * @param WindSpeed is the stations windSpeed
      * 
      * @return rounded number
      */
    calculateWindChill(Temp, WindSpeed) {
         const windChill = 13.12 +0.6215*(Temp)-11.37**(WindSpeed,0.16)+0.3965*(Temp**(WindSpeed,0.16));
         return Math.round(windChill);
    },
   
//      /**
//       * This method converts wind direction number to compass text
//       * @param windDirection
//       * 
//       * @return string
//       */
    convertWindDirectionToText(windDirection) {
 
         if (((windDirection >= 0.0) && (windDirection <= 11.25))
             || ((windDirection > 348.75) && (windDirection <= 360.0)))
         {
             return "N";
         }
         if ((windDirection > 11.25) && (windDirection <= 33.75))
         {
             return "NNE";
         }
         if ((windDirection > 33.75) && (windDirection <= 56.25))
         {
             return "NE";
         }
         if ((windDirection > 56.25) && (windDirection <= 78.75))
         {
             return "ENE";
         }
         if ((windDirection > 78.75) && (windDirection <= 101.25))
         {
             return "E";
         }
         if ((windDirection > 101.25) && (windDirection <= 123.25))
         {
             return "ESE";
         }
         if ((windDirection > 123.25) && (windDirection <= 146.25))
         {
             return "SE";
         }
         if ((windDirection > 146.25) && (windDirection <= 168.75))
         {
             return "SSE";
         }
         if ((windDirection > 168.75) && (windDirection <= 191.25))
         {
             return "S";
         }
         if ((windDirection > 191.25) && (windDirection <= 213.75))
         {
             return "SSW";
         }
         if ((windDirection > 213.75) && (windDirection <= 236.25))
         {
             return "SW";
         }
         if ((windDirection > 236.25) && (windDirection <= 258.75))
         {
             return "WSW";
         }
         if ((windDirection > 258.75) && (windDirection <= 281.25))
         {
             return "W";
         }
         if ((windDirection > 281.25) && (windDirection <= 303.75))
         {
             return "WNW";
         }
         if ((windDirection > 303.75) && (windDirection <= 326.25))
         {
             return "NW";
         }
         if ((windDirection > 326.25) && (windDirection <= 348.75))
         {
             return "NNW";
         }
             return "No Wind Direction";
         },

         convertVisibilityToText(visibility) {
 
            if (visibility < 50)
            {
                return "Dense Fog";
            }
            if ((visibility >= 50) && (visibility < 200))
            {
                return "Thick Fog";
            }
            if ((visibility >= 200) && (visibility < 500))
            {
                return "Moderate Fog";
            }
            if ((visibility >= 500) && (visibility < 1000))
            {
                return "Light Fog";
            }
            if ((visibility >= 1000) && (visibility < 2000))
            {
                return "Thin Fog";
            }
            if ((visibility >= 2000) && (visibility < 4000))
            {
                return "Haze";
            }
            if ((visibility >= 4000) && (visibility < 10000))
            {
                return "Light Haze";
            }
            if ((visibility >= 4000) && (visibility < 10000))
            {
                return "Light Mist";
            }
            if ((visibility >= 10000) && (visibility < 20000))
            {
                return "Clear";
            }
            if ((visibility >= 20000) && (visibility < 50000))
            {
                 return "Very clear";
            }
            if (visibility >= 50000)
            {
                return "Exceptionally Clear";
            }
            return "None";
       },
 
        }
 
 