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

exports.discountPage = asyncMiddleware(async(req, res, next) => {
    const [products_disc] = await Home.getSingleProductDiscount();
    let shortCatArr = shortCatAndBrand([products_disc], Home);

    let getShortCatArr = await shortCatArr;
    const products_disc_val = await Home.getSingleProductDiscountValue();
    let productDiscToString = JSON.stringify(products_disc_val[0]);

    let productDiscToObject = JSON.parse(productDiscToString);
    for(let disc_id = 0; disc_id < getShortCatArr[2].length; disc_id++) {
        getShortCatArr[2][disc_id]['prod_disc'] = productDiscToObject[disc_id].prod_discount
    }

    res.render('discount', {
        page_title: 'Discount page',
        categories: await getProductObject(shortCatArr, 0),
        brands: await getProductObject(shortCatArr, 1),
        products: await getProductObject(shortCatArr, 2),
    })
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

exports.cartPageId = asyncMiddleware( async(req, res, next) => {
    const productId = new Home(req.params.id, req.params.cat_name, req.params.brand_name);
    const singleProduct = await productId.getSingleProduct();
    let productToString = JSON.stringify(singleProduct[0]);
    let productObject = JSON.parse(productToString);

    productId.setSingleProduct(
        productObject[0]['prod_name'],
        productObject[0]['prod_image'],
        productObject[0]['prod_price'],
        productObject[0]['prod_num']
    )

    productId.addSingleProductCart()

    res.render('cart', {
        title: 'Cart',
        single_product: productObject
    });

    res.redirect('/cart');
});

exports.cartPage = asyncMiddleware( async(req, res, next) => {
    const getProductCart = await Home.getProductsCart()
    let productCartToString = JSON.stringify(getProductCart[0]);
    let productCartToObject = JSON.parse(productCartToString);

    let totalCart = 0;
    for(let sum_item = 0; sum_item < productCartToObject.length; sum_item++) {
        totalCart += Number((productCartToObject[sum_item]['prod_price']).substring(1));
    }

    res.render('cart', {
        page_title: 'Cart',
        single_product: productCartToObject,
        total_cart: totalCart
    });
});

exports.deleteProductCart = asyncMiddleware(async(req, res, next) => {
    const productId = new Home(req.params.id, req.params.cat_name, req.params.brand_name);
    await productId.deleteSingleProductCart();
    res.redirect("/cart");
})

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