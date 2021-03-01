const {
    getLeisuresCentres,
    insertIntoLeisurecentreWeather
} = require("./leisurecentre.services")
const {
    getWeekWeather,
    insertWeather,
    deleteOldWeatherData
} = require('./openweather.services');


exports.updateWeatherDataEvery7Days = async (req, res) => {
    //GET ALL LEISURES CENTRE 7
    const leisuresCentres = await getLeisuresCentres();
    //console.log(leisuresCentres);

    //GET WETHER FOR EACH LEISURE CENTRES
    for await (const leisurecentre of leisuresCentres) {
        //FETCH WEATHER DATABASE
        let weatherData;
        try {
            weatherData = await getWeekWeather(leisurecentre.lat, leisurecentre.lon);
        } catch (error) {
            throw error;
        }
        //DELETE OLD WEATHER DATA FOR THIS LEISURE CENTRE
        try {
            await deleteOldWeatherData(leisurecentre.id);
        } catch (error) {
            throw error
        }
        //INSERT NEW WEATHER DATA INTO weather TABLES
        try {
            await insertWeather(weatherData,leisurecentre.id);
        } catch (error) {
            throw error
        }

    }
}