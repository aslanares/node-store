const express       = require("express")
const homeRouter    = express.Router();

const {
    homePage,
    shopPage,
    discountPage,
    cartPage,
    checkoutPage,
    brandPage,
    categoryPage,
    productPage,
    categoryPageId,
    brandPageId,
    cartPageId,
    deleteProductCart
} = require("../controllers/homeController");

homeRouter.get('/', homePage);
homeRouter.get('/shop', shopPage);
homeRouter.get('/discount', discountPage);
homeRouter.get('/cart', cartPage);
homeRouter.get('/cart/:id', cartPageId);
homeRouter.post('/delete/:id', deleteProductCart);
homeRouter.get('/checkout', checkoutPage);
homeRouter.get('/category/:cat_name', categoryPage);
homeRouter.get('/brand/:brand_name', brandPage);
homeRouter.get('/product/:id', productPage);
homeRouter.get('/category/:id', categoryPageId);
homeRouter.get('/brand/:id', brandPageId);

module.exports = homeRouter;