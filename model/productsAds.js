const dbConnection = require("../utils/dbConnection");

module.exports = class ProductAds {
    constructor(id) {
        this._id = id;
    }

    setSingleProductAds(name, image, price) {
        this._name     = name;
        this._image    = image;
        this._price    = price;
    }

    static getProductsAds() {
        return dbConnection.execute('SELECT id, prod_name, prod_image, prod_price FROM products_ads');
    }

    getSingleProductAds() {
        return dbConnection.execute('SELECT id, prod_name, prod_image, prod_price FROM products_ads WHERE id = ?', [this._id]);
    }

    addSingleProductAds() {
        return dbConnection.execute(
            'INSERT INTO products_ads (prod_name, prod_image, prod_price) ' +
            'VALUES (?,?,?)', [this._name, this._price, this._image]);
    }

    updateSingleProductAds() {
        return dbConnection.execute(
            'UPDATE products_ads SET prod_name = ?, prod_image = ?, prod_price = ? ' +
            'WHERE id = ?', [this._name, this._price, this._image, this._id]);
    }

    deleteSingleProductAds() {
        return dbConnection.execute(
            'DELETE FROM products_ads WHERE id = ?', [this._id]);
    }
}