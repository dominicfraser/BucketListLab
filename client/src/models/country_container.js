var Country = require('./country');
var RequestHelper = require('../helpers/requestHelper');

var CountriesContainer = function() {
  this.requestHelper = new RequestHelper
}

CountriesContainer.prototype = {
  all: function (callback) {
    this.requestHelper.makeGetRequest('http://localhost:3000/api/countries', function (results) {
      console.log(results)
      var countries = this.populateCountries(results)
      console.log(countries)
      callback(countries);
    }.bind(this));
  },
  populateCountries: function (results) {
    var countries = results.map(function (resultObject) {
      return new Country(resultObject)
    });
    return countries;
  },
  add: function (newCountry, callback) {
    var countryData = JSON.stringify(newCountry);
    this.requestHelper.makePostRequest('http://localhost:3000/api/countries', callback, countryData);
  },
  allRest: function (callback) {
    this.requestHelper.makeGetRequest('https://restcountries.eu/rest/v2/all', function (results) {
      console.log(results)
      var countries = this.populateCountries(results)
      console.log(countries)
      callback(countries);
    }.bind(this));
  }
};

module.exports = CountriesContainer;
