const express       = require("express")
const productsRouter    = express.Router();

const {
    shopPage,
    createProduct,
    createSingleProduct,
    editProductId,
    editSingleProduct,
    deleteSingleProduct,
} = require("../controllers/productsController");

productsRouter.get('/', shopPage);
productsRouter.get('/create', createProduct);
productsRouter.post('/create', createSingleProduct);
productsRouter.get('/edit/:id', editProductId);
productsRouter.post('/edit', editSingleProduct);
productsRouter.post('/delete/:id', deleteSingleProduct);

module.exports = productsRouter;