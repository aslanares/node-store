module.exports = (queryObj) => {
    let galleryCollection = [];
    for(let img = 0; img < queryObj.length; img++ ) {
        galleryCollection.push((queryObj[img]['prod_gallery']).split(','));
        queryObj[img]['prod_hover'] = galleryCollection[img][galleryCollection[img].length - 1];
    }
};