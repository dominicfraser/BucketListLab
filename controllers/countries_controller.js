var express = require('express');
// var app = express();
var countryRouter = express.Router();

var Country = require('../client/src/models/country.js')

var DbQueryHelper = require('../db/dbQueryHelper.js')
var query = new DbQueryHelper();


//country index
countryRouter.get('/', function(req, res){
  query.all(function(countries){
    res.json(countries);
  })
})

//add new country
countryRouter.post('/', function(req, res) {
  var country = new Country({
    name: req.body.name,
    population: req.body.population,
    capital: req.body.capital 
  });
  query.add(country, function (results) {
    res.json(results)
  })
});

module.exports = countryRouter;