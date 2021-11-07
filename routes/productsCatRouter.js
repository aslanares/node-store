const express = require("express")
const productsCatRouter = express.Router();

const {
    categoriesList,
    createProductCat,
    createSingleProductCat,
    editProductIdCat,
    editSingleProductCat,
    deleteSingleProductCat,
} = require("../controllers/productsCatController");

productsCatRouter.get('/', categoriesList);
productsCatRouter.get('/create-cat', createProductCat);
productsCatRouter.post('/create-cat', createSingleProductCat);
productsCatRouter.get('/edit-cat/:id', editProductIdCat);
productsCatRouter.post('/edit-cat', editSingleProductCat);
productsCatRouter.post('/delete/:id', deleteSingleProductCat);

module.exports = productsCatRouter;