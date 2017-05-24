var CountriesContainer = require('../models/country_container');

var UI = function() {
  var countries = new CountriesContainer();
  countries.all(function (countries) {
    this.renderBucket(countries);
  }.bind(this));

  countries.allRest(function (countries) {
    this.renderRest(countries);
  }.bind(this));

  this.createForm();
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

  renderBucket: function(countries) {
    var container = document.getElementById('countries');
    container.innerHTML = '';

    for (var country of countries) {
      var li = document.createElement('li');
      this.appendText(li, country.name, 'Name: ');
      this.appendText(li, country.population, 'Population: ');
      
      container.appendChild(li);
    }
  },
  renderRest: function(countries) {
    var container = document.getElementById('countries-rest');
    container.innerHTML = '';

    for (var country of countries) {
      var option = document.createElement('option');
      this.appendText(option, country.name, '');
      
      container.appendChild(option);
    }
  },
  createForm: function(){
    //create the form and a div
    var div = document.createElement('div');
    var form = document.createElement('form');
    var body = document.querySelector('body');

    //append a button to submit the form
    var button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Add';
    form.appendChild(button);

    //add event handler to the onSubmit event of the form
    form.onsubmit = function(e){
      var selected = document.getElementById('countries-rest').value;

      e.preventDefault();
      var countries = new CountriesContainer(); 

      countries.specificRest(selected, function(result){
console.log(selected)
        var newCountry = {
          name: result.name,
          population: result.population,
          capital: result.capital
        }

        countries.add(newCountry, function(data){
          this.renderBucket(data);
        }.bind(this));
      }.bind(this))
    }.bind(this)

    div.appendChild(form);
    body.insertBefore( div, body.firstChild );
  }
  
}

module.exports = UI;
