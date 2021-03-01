// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
//https: //api.openweathermap.org/data/2.5/onecall?lat=&lon=&exclude=minutely&appid=
const fetch = require('node-fetch');
const cnx = require('../config/db.config');


const baseUrl = "https://api.openweathermap.org/data/2.5/";
exports.getWeekWeather = async (lat, lon) => {
    try {
        const response = await fetch(`${baseUrl}onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}


/**
 * INSERT WETHER DATA 
 * 
 * @param {object} weatherData 
 * @param {integer} leisureCentreId 
 * @returns {array} tabLeisureWeatherId TAB OF RELATION WITH LEISURECENTRE AND WEATHER TABLE
 */
exports.insertWeather = async (weatherData, leisurecentre_id) => {
    let tabPromise = [];
    //Prepare sql queries to insert them in the db
    weatherData.daily.forEach(day => {
        let data = {
            leisurecentre_id,
            weather: day,
            dt: day.dt
        }
        let p = insertOneWeather(data);
        tabPromise.push(p)
    })
    await Promise.all(tabPromise).then(results => {
        return results
    }).catch(error => {
        throw error;
    });

}


const insertOneWeather = data => new Promise((resolve, reject) => {
    cnx.query(`INSERT INTO weather (leisurecentre_id,weatherData,dt_timestamp) values(${data.leisurecentre_id},'${JSON.stringify(data.weather)}',${parseInt(data.dt)});`, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    })
});
exports.deleteOldWeatherData = leisurecentre_id => new Promise((resolve, reject) => {
    cnx.query(`DELETE FROM weather WHERE leisurecentre_id = ${leisurecentre_id};`, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    })
})