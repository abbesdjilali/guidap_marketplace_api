// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
//https: //api.openweathermap.org/data/2.5/onecall?lat=&lon=&exclude=minutely&appid=
const fetch = require('node-fetch');
const cnx = require('../config/db.config');


const baseUrl = "https://api.openweathermap.org/data/2.5/";
exports.getWeekWeather = async (lat, lon) => {
    try {
        const response = await fetch(`${baseUrl}onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        console.log("response weather api :", response.statusText)
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}


exports.insertWeather = async (weatherData, leisureCentreId) => {
    let tabPromise = [];
    console.log("weatherData :", weatherData)
    //Prepare sql queries to insert them in the db
    weatherData.daily.forEach(day => {
        let data = {
            weather: day,
            dt: day.dt
        }
        let p = insertOneWeather(data);
        tabPromise.push(p);
    })

    //Insert all categories in db and get id of each category inserted
    let weathersId = await Promise.all(tabPromise).then(results => {
        return results
    }).catch(error => {
        throw new Error(error);
    });
    //Prepare data to insert into leisurecentre_categories table 
    //e.g : [leisurecentre_id,categories_id].
    leisureWeatherData = weathersId.map(weather => {
        return [leisureCentreId, weather[0].id];
    })
    return leisureWeatherData;
}


const insertOneWeather = data => new Promise((resolve, reject) => {
    cnx.query(`INSERT INTO weather (weatherData,dt_timestamp) values('${JSON.stringify(data.weather)}',${parseInt(data.dt)});SELECT id FROM weather WHERE dt_timestamp = "${data.dt}";`, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results[1])));
        }
    })
});