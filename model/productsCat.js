const dbConnection = require("../utils/dbConnection");

module.exports = class ProductsCat {
    constructor(id) {
        this._id = id;
    }

    setSingleProductCat(name) {
        this._name = name;
    }

    getSingleProductCat() {
        return dbConnection.execute('SELECT id, cat_name FROM product_category WHERE id = ?', [this._id]);
    }

    addSingleProductCat() {
        return dbConnection.execute(
            'INSERT INTO product_category (cat_name) VALUES (?)', [this._name]);
    }

    updateSingleProductCat() {
        return dbConnection.execute(
            'UPDATE product_category SET cat_name = ? WHERE id = ?', [this._name, this._id]);
    }

    deleteSingleProductCat() {
        return dbConnection.execute(
            'DELETE FROM product_category WHERE id = ?', [this._id]);
    }

    static getProductsCat() {
        return dbConnection.execute('SELECT id, cat_name FROM product_category');
    }

    static getProductBrand() {
        return dbConnection.execute('SELECT * FROM product_brand');
    }
}