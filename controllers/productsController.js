const dbConnection         = require("../utils/dbConnection");
const singleProdGeneration = require('../utils/singleProdGeneration');
const shortCatAndBrand     = require('../utils/shortCatAndBrand');
const getProductObject     = require('../utils/getProductObject');
const asyncMiddleware      = require('../utils/asyncMiddleware');
const Products             = require('../model/products');

exports.shopPage = asyncMiddleware(async (req, res, next) => {
    const [productList] = await Products.getProducts();

    res.render('productsList/products', {
        title: 'Products List',
        products_list: productList,
    });
})

exports.createProduct = asyncMiddleware(async (req, res, next) => {
    const productCat = await Products.getProductCategory();
    let productCatToString = JSON.stringify(productCat[0]);
    let productCatObject = JSON.parse(productCatToString);

    const productBrand = await Products.getProductBrand();
    let productBrandToString = JSON.stringify(productBrand[0]);
    let productBrandObject = JSON.parse(productBrandToString);

    res.render('productsList/create', {
        title: 'Product creation',
        prod_cat: productCatObject,
        prod_brand: productBrandObject,
    });
})

exports.createSingleProduct = asyncMiddleware( async(req, res, next) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const createSingleProd = new Products();
    createSingleProd.setSingleProduct(
        body.product_name,
        body.product_desc,
        body.product_price,
        body.product_image,
        body.product_gallery,
        body.product_num,
        body.cat_name,
        body.brand_name,
    )
    await createSingleProd.addSingleProduct();
    res.redirect("../products");
})

exports.editProductId = asyncMiddleware(async(req, res, next) => {
    const productId = new Products(req.params.id);
    const singleProduct = await productId.getSingleProduct();
    let productToString = JSON.stringify(singleProduct[0]);
    let productObject = JSON.parse(productToString);

    const productCat = await Products.getProductCategory();
    let productCatToString = JSON.stringify(productCat[0]);
    let productCatObject = JSON.parse(productCatToString);

    const productBrand = await Products.getProductBrand();
    let productBrandToString = JSON.stringify(productBrand[0]);
    let productBrandObject = JSON.parse(productBrandToString);

    res.render('productsList/edit', {
        title: 'Product edition',
        prod_cat: productCatObject,
        prod_brand: productBrandObject,
        single_product: productObject,
    })
})

exports.editSingleProduct = asyncMiddleware( async(req, res, next) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const updateSingleProd = new Products(body.id);

    updateSingleProd.setSingleProduct(
        body.product_name,
        body.product_desc,
        body.product_price,
        body.product_image,
        body.product_gallery,
        body.product_num,
        body.cat_name,
        body.brand_name,
    )

    await updateSingleProd.updateSingleProduct();
    res.redirect("../products");
})

exports.deleteSingleProduct = asyncMiddleware(async(req, res, next) => {
    const { body } = req;
    const getSingleProdId = new Products(req.params.id);
    await getSingleProdId.deleteSingleProduct();
    res.redirect("../../../admin/products");
})