var express = require('express');
// var app = express();
var countryRouter = express.Router();
var DbQueryHelper = require('../db/dbQueryHelper.js')
var query = new DbQueryHelper();

//country index
countryRouter.get('/', function(req, res){
  query.all(function(countries){
    res.json(countries);
  })
})

module.exports = countryRouter;