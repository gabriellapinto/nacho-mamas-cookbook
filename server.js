const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//init sequelize / sequelize store
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//init express
const app = express();
const PORT = process.env.PORT || 3001;

//init handlebars 
const hbs = exphbs.create();

//session options
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//init express sessions
app.use(session(sess));

//express.static for "static resources" like css, js, and images
app.use(express.static('public'));

//set up handlebars as the "view engine"
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware for POST / PUT requests (add req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init routing 
app.use(routes);

//sync our sequelize models with the MySQL db and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
