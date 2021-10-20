const express              = require("express");
const userRouter           = express.Router();
const asyncMiddleware      = require('../utils/asyncMiddleware');
const { body }             = require("express-validator");

const {
    profilePage,
    register,
    registerPage,
    login,
    loginPage,
} = require("../controllers/userController");

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.userID){
        return res.redirect('/admin/login');
    }
    next();
}

userRouter.get('/profile', ifNotLoggedin, profilePage);

userRouter.get("/login", loginPage);
userRouter.use("/login",
    [
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    login
);

userRouter.get("/signup", registerPage);
userRouter.use("/signup",
    [
        body("_name", "The name must be of minimum 3 characters length")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

userRouter.get('/logout', asyncMiddleware((req, res, next) => {
    req.session.destroy((err) => {
        next(err);
    });
    res.redirect('/');
}));

module.exports = userRouter;