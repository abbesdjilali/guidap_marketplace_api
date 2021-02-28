const router = require('express').Router();
const {
    checkToken
} = require('../middlewares/jwt.middleware')

const {
    getCategoriesList,
    updateCategory,
    deleteCategory,
    createCategory
} = require('../controllers/categories.controller');



router.get('/',checkToken, getCategoriesList);
router.post('/',checkToken, createCategory);
router.put('/:id',checkToken, updateCategory);
router.delete('/:id',checkToken, deleteCategory);

module.exports = router;