const express = require("express")
const productsAdsRouter = express.Router();

const {
    adsList,
    createProductAds,
    createSingleProductAds,
    editProductIdAds,
    editSingleProductAds,
    deleteSingleProductAds,
} = require("../controllers/productsAdsController");

productsAdsRouter.get('/', adsList);
productsAdsRouter.get('/create-ads', createProductAds);
productsAdsRouter.post('/create-ads', createSingleProductAds);
productsAdsRouter.get('/edit-ads/:id', editProductIdAds);
productsAdsRouter.post('/edit-ads', editSingleProductAds);
productsAdsRouter.post('/delete/:id', deleteSingleProductAds);

module.exports = productsAdsRouter;