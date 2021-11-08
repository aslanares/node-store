const dbConnection = require("../utils/dbConnection");

module.exports = class Home {
    constructor(id, catName, brandName) {
        this._id = id;
        this._catName = catName;
        this._brandName = brandName;
    }

    setSingleProduct(name, image, price, amount) {
        this._name     = name;
        this._image    = image;
        this._price    = price;
        this._amount   = amount;
    }

    static getProductsAds() {
        return dbConnection.execute('SELECT * FROM products_ads');
    }

    static getProducts() {
        return dbConnection.execute('SELECT id, prod_name, prod_price, prod_image, prod_gallery FROM products');
    }

    static getProductCategory() {
        return dbConnection.execute('SELECT * FROM product_category');
    }

    static getProductBrand() {
        return dbConnection.execute('SELECT * FROM product_brand');
    }

    static getSingleProductDiscount() {
        return dbConnection.execute(
          'SELECT prod_name, prod_price, prod_image, prod_gallery ' +
          'FROM products, product_discount ' +
          'WHERE products.prod_disc_id = product_discount.id');
    }

    static getSingleProductDiscountValue() {
        return dbConnection.execute(
          'SELECT prod_discount ' +
          'FROM products, product_discount ' +
          'WHERE products.prod_disc_id = product_discount.id');
    }

    static getProductsCart() {
        return dbConnection.execute('SELECT * FROM product_cart');
    }

    getSingleProduct() {
        return dbConnection.execute('SELECT * FROM products WHERE id=?', [this._id]);
    }

    getSingleProductCategory() {
        return dbConnection.execute(
            'SELECT cat_name FROM products, product_category ' +
            'WHERE products.id = ? and products.prod_cat_id = product_category.id ' +
            'GROUP BY cat_name', [this._id]
        );
    }

    getSingleCategory() {
        return dbConnection.execute(
            "SELECT pr.id, pr.prod_name, pr.prod_price, pr.prod_image, pr.prod_gallery " +
            "FROM products pr, product_category pc " +
            "WHERE pr.prod_cat_id = pc.id and pc.cat_name = ?", [this._catName]
        );
    }

    getSingleBrand() {
        return dbConnection.execute(
            "SELECT pr.id, pr.prod_name, pr.prod_price, pr.prod_image, pr.prod_gallery " +
            "FROM products pr, product_brand pb " +
            "WHERE pr.prod_cat_id = pb.id and pb.brand_name = ?", [this._brandName]
        );

    }

    addSingleProductCart() {
        return dbConnection.execute(
          'INSERT INTO product_cart ' +
          '(prod_name, prod_image, prod_price, prod_num) ' +
          'VALUES (?,?,?,?)', [this._name, this._image, this._price, this._amount]);
    }

    deleteSingleProductCart() {
        return dbConnection.execute(
          'DELETE FROM product_cart WHERE id = ?', [this._id]);
    }
}