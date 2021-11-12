const hoverProdImg         = require('./hoverProdImg');
const lowerCatAndBrand     = require('./lowerCatAndBrand');

module.exports = async (singleTaxonomy, Model) => {
    let productCatToString = JSON.stringify(singleTaxonomy[0]);
    let productCatToObject = JSON.parse(productCatToString);

    hoverProdImg(productCatToObject);

    const [productCategory] = await Model.getProductCategory();
    const [productBrand] = await Model.getProductBrand();

    let [prodCatToObject, prodBrandToObject] = lowerCatAndBrand(productCategory, productBrand);
    return [prodCatToObject, prodBrandToObject, productCatToObject];
}