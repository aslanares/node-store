const dbConnection = require("../utils/dbConnection");

module.exports = class ProductsBrand {
    constructor(id) {
        this._id = id;
    }

    setSingleProductBrand(name) {
        this._name = name;
    }

    getSingleProductBrand() {
        return dbConnection.execute('SELECT id, brand_name FROM product_brand WHERE id = ?', [this._id]);
    }

    addSingleProductBrand() {
        return dbConnection.execute(
            'INSERT INTO product_brand (brand_name) VALUES (?)', [this._name]);
    }

    updateSingleProductBrand() {
        return dbConnection.execute(
            'UPDATE product_brand SET brand_name = ? WHERE id = ?', [this._name, this._id]);
    }

    deleteSingleProductBrand() {
        return dbConnection.execute(
            'DELETE FROM product_brand WHERE id = ?', [this._id]);
    }

    static getProductsBrand() {
        return dbConnection.execute('SELECT id, brand_name FROM product_brand');
    }

    static getProductBrand() {
        return dbConnection.execute('SELECT * FROM product_brand');
    }
}