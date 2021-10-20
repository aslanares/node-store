const express              = require('express');
const app                  = express();
const session              = require('express-session');
const expressHbs           = require('express-handlebars');
const hbs                  = require('hbs');
const userRouter           = require('./routes/userRouter');
const homeRouter           = require('./routes/homeRouter');
const productsRouter       = require('./routes/productsRouter');

app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000,
    }
}));

app.set('view engine', 'hbs');

app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts',
    extname: 'hbs',
    defaultLayout: 'index'
}));

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.use("/admin/products/", productsRouter);
app.use("/admin", userRouter);
app.use("/", homeRouter);

// app.use((err, req, res, next) => {
//     // console.log(err);
//     return res.send('Internal Server Error');
// });

app.listen(3000, () => console.log('Server is runngin on port 3000'));