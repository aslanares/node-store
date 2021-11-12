const asyncMiddleware = require('../utils/asyncMiddleware');
const ProductsAds     = require('../model/productsAds');

exports.adsList = asyncMiddleware(async (req, res) => {
    const [productsAdsList] = await ProductsAds.getProductsAds();

    res.render('productsAdsList/products-ads', {
        title: 'Products Ads List',
        ads_list: productsAdsList,
    });
});

exports.createProductAds = asyncMiddleware(async (req, res) => {
    res.render('productsAdsList/create-ads', {
        title: 'Product ads creation',
    });
})

exports.createSingleProductAds = asyncMiddleware( async(req, res) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const createSingleProdAds = new ProductsAds();

    createSingleProdAds.setSingleProductAds(
        body.product_name,
        body.product_image,
        body.product_price,
    );

    await createSingleProdAds.addSingleProductAds();
    res.redirect("../products-ads");
});

exports.editProductIdAds = asyncMiddleware(async(req, res) => {
    const productId = new ProductsAds(req.params.id);
    const singleProductAds = await productId.getSingleProductAds();
    let productAdsToString = JSON.stringify(singleProductAds[0]);
    let productAdsObject = JSON.parse(productAdsToString);

    res.render('productsAdsList/edit-ads', {
        title: 'Product ads edition',
        single_product_ads: productAdsObject,
    });
});

exports.editSingleProductAds = asyncMiddleware( async(req, res) => {
    if(!req.body) return res.sendStatuc(400);
    const { body } = req;
    const updateSingleProdAds = new ProductsAds(body.id);

    updateSingleProdAds.setSingleProductAds(
        body.product_name,
        body.product_image,
        body.product_price,
    );

    await updateSingleProdAds.updateSingleProductAds();
    res.redirect("../products-ads");
});

exports.deleteSingleProductAds = asyncMiddleware(async(req, res) => {
    const getSingleProdAdsId = new ProductsAds(req.params.id);
    await getSingleProdAdsId.deleteSingleProductAds();
    res.redirect("../../../admin/products-ads");
});