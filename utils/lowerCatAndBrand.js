module.exports = (productCategory, productBrand) => {
    let prodStringCat = JSON.stringify([productCategory][0]);
    let prodCatToObject = JSON.parse(prodStringCat);

    for (let cat = 0; cat < prodCatToObject.length; cat++) {
        prodCatToObject[cat]['cat_name'] = prodCatToObject[cat]['cat_name'].toLowerCase();
    }

    let prodStringBrand = JSON.stringify([productBrand][0]);
    let prodBrandToObject = JSON.parse(prodStringBrand);

    for (let brand = 0; brand < prodBrandToObject.length; brand++) {
        prodBrandToObject[brand]['brand_name'] = prodBrandToObject[brand]['brand_name'].toLowerCase();
    }

    return [prodCatToObject, prodBrandToObject];
}