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