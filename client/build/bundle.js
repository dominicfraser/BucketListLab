/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var CountriesContainer = __webpack_require__(4);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function() {
  new UI();
}

window.addEventListener('load', app);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var RequestHelper = function() {

}

RequestHelper.prototype = {
  makeGetRequest: function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send();
  },
  makePostRequest: function (url, callback, payload) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    request.send(payload);
  }
}

module.exports = RequestHelper;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Country = function(options) {
  this.name = options.name;
  this.population = options.population;
  this.capital = options.capital
}

Country.prototype = {
  // addReview: function(review) {
  //   this.reviews.push(review);
  // }
}

module.exports = Country;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__(3);
var RequestHelper = __webpack_require__(2);

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
  },
  specificRest: function(countryName, callback){
    console.log(countryName)
    var url = "https://restcountries.eu/rest/v2/name/" + countryName;
    this.requestHelper.makeGetRequest(url, function (results) {
      console.log(results)
      var country = this.populateCountries(results)[0]
      console.log(country)
      callback(country);
    }.bind(this));

  }
};

module.exports = CountriesContainer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map