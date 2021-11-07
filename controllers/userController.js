const { validationResult } = require("express-validator");
const bcrypt               = require('bcryptjs');
const asyncMiddleware      = require('../utils/asyncMiddleware');
const User                 = require('../model/user');
// Profile Page
exports.profilePage = asyncMiddleware(async (req, res, next) => {
    const userProfile = new User(req.session.userID);
    const [row] = await userProfile.getSingleUser();

    if (row.length !== 1) {
        return res.redirect('/logout');
    }

    res.render('profile', {
        page_title: 'Store entities',
        list_array: [
            {'entity':'Products', 'entityLink':'products'},
            {'entity':'Products Ads', 'entityLink':'products-ads'},
            {'entity':'Products Category', 'entityLink':'products-cat'},
            {'entity':'Products Brand', 'entityLink':'products-brand'},
        ],
        user: row[0],
    });
});

// Register Page
exports.registerPage = asyncMiddleware((req, res, next) => {
    res.render("register");
});

// User Registration
exports.register = asyncMiddleware(async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }

    try {

        const userEmail = new User(req.session.userID, body._name, body._email, '');
        const [row] = await userEmail.getUserEmail();

        if (row.length >= 1) {
            return res.render('register', {
                error: 'This email already in use.'
            });
        }

        const hashPass = await bcrypt.hash(body._password, 12);

        const userPass = new User(req.session.userID, body._name, body._email, hashPass);
        const [rows] = await userPass.getUserPass();

        if (rows.affectedRows !== 1) {
            return res.render('register', {
                error: 'Your registration has failed.'
            });
        }
        
        res.render("register", {
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
});

// Login Page
exports.loginPage = asyncMiddleware((req, res, next) => {
    res.render("login");
});

// Login User
exports.login = asyncMiddleware(async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('login', {
            error: errors.array()[0].msg
        });
    }

    try {

        const userEmail = new User(req.session.userID, body._name, body._email, '');
        const [row] = await userEmail.getUserEmail();

        if (row.length != 1) {
            return res.render('login', {
                error: 'Invalid email address.'
            });
        }

        const checkPass = await bcrypt.compare(body._password, row[0].password);

        if (checkPass === true) {
            req.session.userID = row[0].id;
            return res.redirect('/admin/profile');
        }

        res.render('login', {
            error: 'Invalid Password.'
        });


    }
    catch (e) {
        next(e);
    }

});
