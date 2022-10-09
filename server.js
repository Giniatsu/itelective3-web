var express = require('express');
var app = express();
var weather = require('weather-js');
const dayjs = require('dayjs')
var fetchUrl = require("fetch").fetchUrl;

app.set('view engine', 'ejs');

app.listen(3000)

app.get('/', function (req, res) {
    weather.find({search: 'Davao City, PH', degreeType: 'C'}, function(err, result) {
        var weather_data = null;
        if(err) console.log(err);
       else{
        console.log(JSON.stringify(result, null, 2));
        weather_data = result;
       }
       res.render('index', {title: 'Weather',panahon: weather_data, dayjs});
      });
});

app.get('/other', async function (req, res) {
    if (req.query.pokemoninput) {
        fetchUrl(`https://pokeapi.co/api/v2/pokemon/${req.query.pokemoninput}`, function(error, meta, body){
            var meals = JSON.parse(body)
            var data = {
                itemData: meals
            }
            console.log(data.itemData)
            res.render('other', {title:'PokeAPI', data});
        });
    } else {
        var data = {
            itemData: null
        }
        res.render('other', {title:'PokeAPI', data});
    }
});