const cnx = require("../config/db.config");


// get leisures centers by category
exports.getAllCategories = () => new Promise((resolve, reject) => {
    cnx.query("SELECT * FROM categories", (err, res) => {
        if (err)
            return reject(err);
        resolve(res);
    })
})
exports.updateOneCategory = (category, id) => new Promise((resolve, reject) => {
    cnx.query(`UPDATE IGNORE categories SET ? WHERE id = ?;`, [category, id], (error, results) => {
        if (error)
            return reject(error);
        resolve(results);
    })
})
exports.getOneCategory = id => new Promise((resolve, reject) => {
    cnx.query(`SELECT * FROM categories WHERE id = ${id}`, (error, results) => {
        if (error)
            return reject(error);
        resolve(results);
    })
})
exports.deleteFromLeisureCategories = id => new Promise((resolve, reject) => {
    cnx.query(`DELETE FROM leisurecentre_categories WHERE leisurecentre_categories.categories_id = ${id}`, (error, results) => {
        if (error)
            return reject(error);
        resolve(results);
    })
})
exports.deleteFromCategories = id => new Promise((resolve, reject) => {
    cnx.query(`DELETE FROM categories WHERE id = ${id}`, (error, results) => {
        if (error)
            return reject(error);
        resolve(results);
    })
})

// exports.insertCategories = async (tabCategories, leisureCentreId) => {
//     let tabPromise = [];
//     //Prepare sql queries to insert them in the db
//     tabCategories.forEach(cat => {
//         categorieName = cat.trim().toLowerCase();
//         let p =  insertOneCategorie(categorieName);
//         tabPromise.push(p);
//     })

//     //Insert all categories in db and get id of each category inserted
//     let categoriesId = await Promise.all(tabPromise).then(results => {
//         return results
//     }).catch(error => {
//         throw new Error(error);
//     });
//     //Prepare data to insert into leisurecentre_categories table 
//     //e.g : [leisurecentre_id,categories_id].
//     leisureCategoryData = categoriesId.map(cat => {
//         return [leisureCentreId, cat[0].id];
//     })
//     return leisureCategoryData;
// }


exports.insertOneCategory = category => new Promise((resolve, reject) => {
    category.name = category.name.trim().toLowerCase();
    cnx.query(`INSERT IGNORE INTO categories (name)  VALUES("${category.name}");SELECT id FROM categories WHERE name = "${category.name}";`, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results[1])));
        }
    })
});