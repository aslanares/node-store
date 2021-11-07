const asyncMiddleware      = require('../utils/asyncMiddleware');
const ProductsCat          = require('../model/productsCat');

exports.categoriesList = asyncMiddleware(async (req, res, next) => {
    const [categoriesList] = await ProductsCat.getProductsCat();

    res.render('productsCat/products-cat', {
        title: 'Products Categories',
        cat_list: categoriesList,
    });
})

exports.createProductCat = asyncMiddleware(async (req, res, next) => {
    const productCat = await ProductsCat.getProductCategory();
    let productCatToString = JSON.stringify(productCat[0]);
    let productCatObject = JSON.parse(productCatToString);

    res.render('productsCat/create-cat', {
        title: 'Category creation',
        prod_cat: productCatObject,
    });
})

exports.createSingleProductCat = asyncMiddleware( async(req, res, next) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const createSingleCat = new ProductsCat();
    createSingleCat.setSingleProductCat(body.cat_name);
    await createSingleCat.addSingleProductCat();
    res.redirect("../products-cat");
})

exports.editProductIdCat = asyncMiddleware(async(req, res, next) => {
    const productId = new ProductsCat(req.params.id);
    const singleProductCat = await productId.getSingleProductCat();
    let productCatToString = JSON.stringify(singleProductCat[0]);
    let productObject = JSON.parse(productCatToString);

    res.render('productsCat/edit-cat', {
        title: 'Category edition',
        single_cat: productObject,
    })
})

exports.editSingleProductCat = asyncMiddleware( async(req, res, next) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const updateSingleProdCat = new ProductsCat(body.id);
    updateSingleProdCat.setSingleProductCat(body.cat_name)
    await updateSingleProdCat.updateSingleProductCat();
    res.redirect("../products-cat");
})

exports.deleteSingleProductCat = asyncMiddleware(async(req, res, next) => {
    const { body } = req;
    const getSingleProdCatId = new ProductsCat(req.params.id);
    await getSingleProdCatId.deleteSingleProductCat();
    res.redirect("../../../admin/products-cat");
})