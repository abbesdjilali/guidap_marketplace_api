const mysql = require('mysql');
const getAllLeisureCentresQuery =(start,end)=>{
    return `SELECT l.centreName,l.description,l.website,l.addressName,l.zipCode,l.cite,l.country,l.lat,l.lon,
                                CONCAT(l.addressName,', ',l.zipCode,', ',cite,', ',country,'.') as fullAddress,
                                CONCAT("[", GROUP_CONCAT(c.name), "]") categories,
                                w.weatherData
                                FROM leisurecentre l 
                                JOIN leisurecentre_categories lc 
                                ON lc.leisurecentre_id = l.id
                                JOIN categories c
                                ON lc.categories_id = c.id
                                JOIN leisurecentre_weather lw
                                ON lw.leisurecentre_id = l.id
                                JOIN weather w
                                ON lw.weather_id = w.id AND w.dt_timestamp BETWEEN ${start} AND ${end}
                                GROUP BY l.id;
                                `;
} 
exports.getLeisurCentreByCategorie = (categories_id) => {
    let str = ""
    categories_id.forEach(id => {
        str += `lc.categories_id = ${parseInt(id)}OR `;
    });
    return `SELECT l.centreName, l.description, l.website, l.addressName, l.cite, l.zipCode, l.long, l.lat
            FROM leisurecentre l
            INNER JOIN leisurecentre_categories lc
            WHERE l.id = lc.leisurecentre_id AND(${str.substring(0, str.length - 3)})
            GROUP BY l.id;`;
}
const leisureCentreExsistQuery = `SELECT * FROM leisurecentre WHERE lat = ? AND lon = ? LIMIT 1;`;

const insertLeisureCentreQuery = 'INSERT INTO leisurecentre set ?';

const updateLeisureCentreQuery = `UPDATE leisurecentre set ? WHERE id = ?;`;

exports.insertIntoLeisurecentreCategoriesQuery = `DELETE FROM leisurecentre_categories WHERE leisurecentre_categories.leisurecentre_id = ?;INSERT IGNORE INTO leisurecentre_categories (leisurecentre_id,categories_id) VALUES ?;`
exports.insertIntoLeisurecentreWeatherQuery = `DELETE FROM leisurecentre_weather WHERE leisurecentre_weather.leisurecentre_id = ?;INSERT IGNORE INTO leisurecentre_weather (leisurecentre_id,weather_id) VALUES ?;`

module.exports.getAllLeisureCentresQuery = getAllLeisureCentresQuery;
module.exports.leisureCentreExsistQuery = leisureCentreExsistQuery;
module.exports.insertLeisureCentreQuery = insertLeisureCentreQuery;
module.exports.updateLeisureCentreQuery = updateLeisureCentreQuery;