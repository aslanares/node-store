const dbConnection         = require("../utils/dbConnection");
const singleProdGeneration = require('../utils/singleProdGeneration');
const shortCatAndBrand     = require('../utils/shortCatAndBrand');
const getProductObject     = require('../utils/getProductObject');
const asyncMiddleware      = require('../utils/asyncMiddleware');
const Home                 = require('../model/home');

exports.homePage = asyncMiddleware(async (req, res, next) => {
    const [productsAds] = await Home.getProductsAds();

    res.render('main', {
        page_title: 'Home',
        products_ads: productsAds,
    });
});

exports.shopPage = asyncMiddleware(async(req, res, next) => {
    const [products] = await Home.getProducts();

    let shortCatArr = shortCatAndBrand([products], Home);

    res.render('shop', {
        page_title: 'Shop',
        categories: await getProductObject(shortCatArr, 0),
        brands: await getProductObject(shortCatArr, 1),
        products: await getProductObject(shortCatArr, 2),
    });
});

exports.categoryPage = asyncMiddleware( async (req, res, next) => {
    const catName = new Home(req.params.id, req.params.cat_name, req.params.brand_name);
    const singleTaxonomy = await catName.getSingleCategory();

    let shortCatArr = shortCatAndBrand(singleTaxonomy, Home);

    res.render('category', {
        page_title: 'Category',
        categories: await getProductObject(shortCatArr, 0),
        brands: await getProductObject(shortCatArr, 1),
        category_products: await getProductObject(shortCatArr, 2)
    });
});

exports.cartPage = asyncMiddleware( async(req, res, next) => {
    res.render('cart', { page_title: 'Cart'});
});

exports.checkoutPage = asyncMiddleware( async (req, res) => {
    res.render('checkout', { page_title: 'Checkout'});
});

exports.brandPage = asyncMiddleware( async(req, res, next) => {
    const brandName = new Home(req.params.id, req.params.cat_name, req.params.brand_name);
    const singleBrand = await brandName.getSingleBrand();

    let shortCatArr = shortCatAndBrand(singleBrand, Home);

    res.render('brand', {
        page_title: 'Brand',
        categories: await getProductObject(shortCatArr, 0),
        brands: await getProductObject(shortCatArr, 1),
        brand_products: await getProductObject(shortCatArr, 2)
    });
});

exports.productPage = asyncMiddleware(async (req, res, next) => {
    singleProdGeneration(req, res, dbConnection, Home);
});

exports.categoryPageId = asyncMiddleware(async (req, res, next) => {
    singleProdGeneration(req, res, dbConnection, Home);
});

exports.brandPageId = asyncMiddleware(async (req, res, next) => {
    singleProdGeneration(req, res, dbConnection, Home);
});