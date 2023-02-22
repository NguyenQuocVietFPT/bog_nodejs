const express = require('express');
const {engine}  = require ('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const port = 3000

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'))
//Template engine
app.engine('hbs', engine({
  extname : '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

//HTTP Logger
app.use(morgan('combined'));

//Routes
app.get('/trang-chu', (req, res) => {
    res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.listen(port,() => console.log('App is listening at http://localhost:${port}'));