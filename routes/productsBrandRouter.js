const express = require("express")
const productsBrandRouter = express.Router();

const {
    brandsList,
    createProductBrand,
    createSingleProductBrand,
    editProductIdBrand,
    editSingleProductBrand,
    deleteSingleProductBrand,
} = require("../controllers/productsBrandController");

productsBrandRouter.get('/', brandsList);
productsBrandRouter.get('/create-brand', createProductBrand);
productsBrandRouter.post('/create-brand', createSingleProductBrand);
productsBrandRouter.get('/edit-brand/:id', editProductIdBrand);
productsBrandRouter.post('/edit-brand', editSingleProductBrand);
productsBrandRouter.post('/delete/:id', deleteSingleProductBrand);

module.exports = productsBrandRouter;