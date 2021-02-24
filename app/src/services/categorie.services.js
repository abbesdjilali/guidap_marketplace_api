const cnx = require("../config/db.config");



exports.insertCategories = async (tabCategories, leisureCentreId) => {
    let tabPromise = [];
    //Prepare sql queries to insert them in the db
    tabCategories.forEach(cat => {
        categorieName = cat.trim().toLowerCase();
        let p =  insertOneCategorie(categorieName);
        tabPromise.push(p);
    })

    //Insert all categories in db and get id of each category inserted
    let categoriesId = await Promise.all(tabPromise).then(results => {
        return results
    }).catch(error => {
        throw new Error(error);
    });
    //Prepare data to insert into leisurecentre_categories table 
    //e.g : [leisurecentre_id,categories_id].
    leisureCategoryData = categoriesId.map(cat => {
        return [leisureCentreId, cat[0].id];
    })
    return leisureCategoryData;
}


const insertOneCategorie = categorieName => new Promise((resolve, reject) => {
    cnx.query(`INSERT IGNORE INTO categories (name) values("${categorieName}");SELECT id FROM categories WHERE name = "${categorieName}";`, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results[1])));
        }
    })
});