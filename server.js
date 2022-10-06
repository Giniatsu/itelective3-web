var express = require('express');
var app = express();
var weather = require('weather-js');
const dayjs = require('dayjs')

app.set('view engine', 'ejs');

app.listen(8000)

app.get('/', function (req, res) {
    weather.find({search: 'Davao City, PH', degreeType: 'C'}, function(err, result) {
        var weather_data = null;
        if(err) console.log(err);
       else{
        console.log(JSON.stringify(result, null, 2));
        weather_data = result;
       }
       res.render('index', {panahon: weather_data, dayjs});
      });
});