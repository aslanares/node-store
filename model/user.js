const dbConnection = require("../utils/dbConnection");

module.exports = class User {
    constructor(id, name, email, pass) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._pass = pass;
    }

    getSingleUser() {
        return dbConnection.execute("SELECT * FROM `users` WHERE `id`=?", [this._id]);
    }

    getUserEmail() {
        return dbConnection.execute("SELECT * FROM `users` WHERE `email`=?", [this._email]);
    }

    getUserPass() {
        return dbConnection.execute(
            "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
            [this._name, this._email, this._pass]
        );
    }
}