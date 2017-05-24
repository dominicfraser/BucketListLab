var MongoClient = require('mongodb').MongoClient;

var DbQueryHelper = function(){
  this.url = "mongodb://localhost:27017/world_countries"
};


DbQueryHelper.prototype = {
  add: function(countryToAdd, onQueryFinishedCallback){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        var collection = db.collection('countries');
        collection.insert(countryToAdd);
        collection.find().toArray(function(err, docs){
          onQueryFinishedCallback(docs);
        })
      }
    })
  },

  all: function(onQueryFinishedCallback){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        var collection = db.collection('countries');
        collection.find().toArray(function(err, docs){
          onQueryFinishedCallback(docs);
        })
      }
    })
  }
}


module.exports = DbQueryHelper;