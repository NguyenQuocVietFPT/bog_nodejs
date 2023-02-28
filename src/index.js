const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const port = 3000;
const app = express();
const methodOverride = require('method-override');
const db = require('./config/db');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

const routes = require('./routes');

//Custom middleware
app.use(sortMiddleware);

//Set static files
app.use(express.static(path.join(__dirname, 'public')));

//Connect to MongoDB
db.connect();

// override with POST having ?_method=
app.use(methodOverride('_method'));

//Get form data from form [BODY]
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebar')        
    }),
    
);
app.set(
    'view engine',
    'hbs',
);
app.set('views', path.join(__dirname, 'resources','views'));

//HTTP Logger
// app.use(morgan('combined'));

//Routes init
routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
