var CountriesContainer = require('../models/country_container');

var UI = function() {
  var countries = new CountriesContainer();
  countries.all(function (countries) {
    this.render(countries);
  }.bind(this));

}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  render: function(countries) {
    var container = document.getElementById('countries');
    container.innerHTML = '';

    for (var country of countries) {
      var li = document.createElement('li');
      this.appendText(li, country.name, 'Name: ');
      this.appendText(li, country.population, 'Population: ');
      
      container.appendChild(li);
    }
  },
  
}

module.exports = UI;
