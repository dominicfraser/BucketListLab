var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/countries', require('./countries_controller'));

router.get('/', function(req, res) {
  res.json({ hello: 'This is temporary'});
})

module.exports = router;