const {
    getLeisuresCentres,
    insertIntoLeisurecentreWeather
} = require("./leisurecentre.services")
const {
    getWeekWeather,
    insertWeather
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
            weatherData = await getWeekWeather();
        } catch (error) {
            throw error;
        }

        //INSERT NEW WEATHER DATA INTO weather TABLES
        //AND GET ALL INSERTED ID 
        let tabInsertedId;
        try {
            tabInsertedId = await insertWeather(weatherData);
        } catch (error) {
            throw error
        }

        //GET INSERT NEW RELATION WITH LEISURE CENTRE AND WEATHER TABLES
        //AND DELETE OLD RELATION
        // try {
        //     await insertIntoLeisurecentreWeather(leisurecentre.id,tabInsertedId);
        // } catch (error) {
        //     throw error
        // } 

        //DELETE OLD WEATHER DATA FROM weather TABLE
        



    }
}