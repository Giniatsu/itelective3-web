const express = require('express')
const morgan = require('morgan')
const {students} = require('./students')
const app = express();
const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

app.set('view engine', 'ejs');

app.listen(3000)

// Middleware
app.use((req,res, next) => {
    console.log('Request Made');
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    console.log(`Method: ${req.method}`);
    next();
});

app.use(morgan('dev'));

//get methods
app.get('/', function (req, res) {
    res.render('index', {title: 'Home', studentData: students});
    // res.sendFile('./views/index.html', {root: __dirname});
});
app.get('/about', function (req, res) {
    res.render('about', {title:'About', heading: 'New Heading'});
    // res.sendFile('./views/about.html', {root: __dirname});
});
app.get('/weather', function (req, res) {
    const weather = require('weather-js');
 
        // Options:
        // search:     location name or zipcode
        // degreeType: F or C
        
        weather.find({search: 'Davao City, PH', degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        
        console.log(JSON.stringify(result, null, 2));
        });
    res.render('weather', {title: 'Weather'});
    // res.sendFile('./views/weather.html', {root: __dirname});
});
app.get('/aboutus', function (req, res) {
    res.redirect('/about');
});

/* app.use((req,res) => {
    res.status(404).sendFile('./oldhtml/404.html', {root: __dirname});
}); */

app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
});