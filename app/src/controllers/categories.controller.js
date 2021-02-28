const {
    insertOneCategory,
    updateOneCategory,
    getAllCategories,
    getOneCategory,
    deleteFromLeisureCategories,
    deleteFromCategories
} = require('../services/categorie.services');

exports.createCategory = async (req, res) => {
    let requestBody = req.body;
    console.log(requestBody)
    try {
        const category_id = await insertOneCategory(requestBody);
        return res.json(category_id)
    } catch (error) {
        return res.status(400).send(error);
    }
}
exports.getCategoriesList = async (req, res) => {
    const categories = await getAllCategories();
    console.log(categories);
    return res.json(categories)
}
exports.updateCategory = async (req, res) => {
    let requestBody = req.body;
    const id = req.params.id;
    if (Object.entries(requestBody).length === 0 || !requestBody.name || !id)
        return res.json({
            status: 400,
            message: "INVALID DATA TO UPDATE CATEGORY"
        });
    let category = await getOneCategory(id);
    console.log("category :", category);
    if (!category)
        return res.json({
            status: 404,
            message: "NOT FOUND CATEGORY WITH THIS ID"
        })
    try {
        await updateOneCategory(requestBody, id);
        return res.json({
            status: 200,
            message: "Category was updated successfully"
        });
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        });
    }
}
exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.json({
            status: 400,
            message: "INVALID ID"
        })
    let category = await getOneCategory(id);
    if (!category.length)
        return res.json({
            status: 404,
            message: "NOT FOUND CATEGORY WITH THIS ID"
        })

    //DELETE RELATION WITH LEISURECENTRE AND CATEGORIES
    try {
        let result1 = await deleteFromLeisureCategories(id);
        let result2 = await deleteFromCategories(id)
        if(result1.affectedRows && result2.affectedRows)
            return res.json({
                status:200,
                message:"Category was deleted successfully"
            })
    } catch (error) {
        return res.json({
            status:400,
            message:error.message
        })
    }

    //DELETE FROM CATEGORIES
}