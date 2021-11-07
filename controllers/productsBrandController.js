const asyncMiddleware      = require('../utils/asyncMiddleware');
const ProductsBrand          = require('../model/productsBrand');

exports.brandsList = asyncMiddleware(async (req, res, next) => {
    const [brandsList] = await ProductsBrand.getProductsBrand();

    res.render('productsBrand/products-brand', {
        title: 'Products Brands',
        brands_list: brandsList,
    });
})

exports.createProductBrand = asyncMiddleware(async (req, res, next) => {
    const productBrand = await ProductsBrand.getProductBrand();
    let productBrandToString = JSON.stringify(productBrand[0]);
    let productBrandObject = JSON.parse(productBrandToString);

    res.render('productsBrand/create-brand', {
        title: 'Brand creation',
        prod_brand: productBrandObject,
    });
})

exports.createSingleProductBrand = asyncMiddleware( async(req, res, next) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const createSingleBrand = new ProductsBrand();
    createSingleBrand.setSingleProductBrand(body.brand_name);
    await createSingleBrand.addSingleProductBrand();
    res.redirect("../products-brand");
})

exports.editProductIdBrand = asyncMiddleware(async(req, res, next) => {
    const productId = new ProductsBrand(req.params.id);
    const singleProductBrand = await productId.getSingleProductBrand();
    let productBrandToString = JSON.stringify(singleProductBrand[0]);
    let productObject = JSON.parse(productBrandToString);

    res.render('productsBrand/edit-brand', {
        title: 'Brand edition',
        single_brand: productObject,
    })
})

exports.editSingleProductBrand = asyncMiddleware( async(req, res, next) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const updateSingleProdBrand = new ProductsBrand(body.id);
    updateSingleProdBrand.setSingleProductBrand(body.brand_name)
    await updateSingleProdBrand.updateSingleProductBrand();
    res.redirect("../products-brand");
})

exports.deleteSingleProductBrand = asyncMiddleware(async(req, res, next) => {
    const { body } = req;
    const getSingleProdBrandId = new ProductsBrand(req.params.id);
    await getSingleProdBrandId.deleteSingleProductBrand();
    res.redirect("../../../admin/products-brand");
})