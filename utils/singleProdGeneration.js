module.exports = async (req, res, dbConnection, Model) => {
    const home = new Model(req.params.id, req.params.cat_name, req.params.brand_name);
    const singleProduct = await home.getSingleProduct();
    const productCategory = await home.getSingleProductCategory();

    let productCatToString = JSON.stringify(productCategory[0][0]);
    let productCatToObject = JSON.parse(productCatToString);
    let productToString = JSON.stringify(singleProduct[0]);
    let productObject = JSON.parse(productToString);

    let galleryCollection = [];
    galleryCollection.push(productObject[0]['prod_gallery'].split(','));
    productObject[0]['prod_img_arr'] = galleryCollection[0];
    productObject[0]['cur_cat_name'] = productCatToObject.cat_name;

    if(productObject[0]['prod_num'] > 3) {
        productObject[0]['instock'] = true;
    } else {
        productObject[0]['lowstock'] = false;
    }

    res.render('product', {
        page_title: 'Product details',
        single_product: productObject,
    });
}