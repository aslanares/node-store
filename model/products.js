const dbConnection = require("../utils/dbConnection");

module.exports = class Product {
    constructor(id) {
        this._id = id;
    }

    setSingleProduct(name, desc, price, image, gallery, amount, category, brand) {
        this._name     = name;
        this._desc     = desc;
        this._price    = price;
        this._image    = image;
        this._gallery  = gallery;
        this._amount   = amount;
        this._category = category;
        this._brand    = brand;
    }

    getSingleProduct() {
        return dbConnection.execute(
            'SELECT pr.id, pr.prod_name, pr.prod_desc, pr.prod_price, ' +
            'pr.prod_image, pr.prod_gallery, pr.prod_num, pc.cat_name, pb.brand_name ' +
            'FROM products pr, product_category pc, product_brand pb ' +
            'WHERE pr.prod_cat_id = pc.id and pr.prod_brand_id = pb.id and pr.id=?', [this._id]);
    }


    addSingleProduct() {
        return dbConnection.execute(
            'INSERT INTO products ' +
            '(prod_name, prod_desc, prod_price, prod_image, prod_gallery, prod_num, prod_cat_id, prod_brand_id) ' +
            'VALUES (?,?,?,?,?,?,?,?)', [this._name, this._desc, this._price, this._image,
             this._gallery, this._amount, this._category, this._brand]);
    }

    updateSingleProduct() {
        return dbConnection.execute(
            'UPDATE products SET prod_name = ?, prod_desc = ?, prod_price = ?, prod_image = ?, ' +
            'prod_gallery = ?, prod_num = ?, prod_cat_id = ?, prod_brand_id = ? ' +
            'WHERE id = ?', [this._name, this._desc, this._price, this._image,
             this._gallery, this._amount, this._category, this._brand, this._id]);
    }

    deleteSingleProduct() {
        return dbConnection.execute(
            'DELETE FROM products WHERE id = ?', [this._id]);
    }


    static getProducts() {
        return dbConnection.execute('SELECT id, prod_name, prod_desc, prod_price, prod_image, prod_gallery FROM products');
    }

    static getProductBrand() {
        return dbConnection.execute('SELECT * FROM product_brand');
    }

    static getProductCategory() {
        return dbConnection.execute('SELECT * FROM product_category');
    }
}