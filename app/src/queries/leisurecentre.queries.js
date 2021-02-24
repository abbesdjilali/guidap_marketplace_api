const mysql = require('mysql');
const getAllLeisureCentresQuery = `SELECT l.centreName,l.description,l.website,l.addressName,l.zipCode,l.cite,l.country,l.lat,l.lon,
                                CONCAT(l.addressName,', ',l.zipCode,', ',cite,', ',country,'.') as fullAddress,
                                CONCAT("[", GROUP_CONCAT(c.name), "]") categories
                                FROM leisurecentre l 
                                LEFT JOIN leisurecentre_categories lc 
                                ON lc.leisurecentre_id = l.id
                                LEFT JOIN categories c
                                ON lc.categories_id = c.id
                                GROUP BY l.id;`;

const leisureCentreExsistQuery =`SELECT * FROM leisurecentre WHERE lat = ? AND lon = ? LIMIT 1;`;

const insertLeisureCentreQuery ='INSERT INTO leisurecentre set ?';

const updateLeisureCentreQuery = (data, id) => {
    return mysql.format('UPDATE leisurecentre set ? WHERE id =?',[data,id]);
}
exports.insertIntoLeisurecentreCategoriesQuery = (leisureCentreId,data) =>{
    return `DELETE FROM leisurecentre_categories
            WHERE leisurecentre_categories.leisurecentre_id = ${leisureCentreId};
            INSERT IGNORE INTO leisurecentre_categories (leisurecentre_id,categories_id) VALUES(${[data]});`
}
module.exports.getAllLeisureCentresQuery = getAllLeisureCentresQuery;
module.exports.leisureCentreExsistQuery = leisureCentreExsistQuery;
module.exports.insertLeisureCentreQuery = insertLeisureCentreQuery;
module.exports.updateLeisureCentreQuery = updateLeisureCentreQuery;