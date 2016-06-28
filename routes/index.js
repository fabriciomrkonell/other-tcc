'use strict';

var express = require('express'),
		router = express.Router(),
    RawData = require('../models/rawdata');

router.get('/', function(req, res, next) {
 res.sendfile('./view/index.html');
});

router.get('/configuration', function(req, res, next) {
 res.sendfile('./view/configuration.html');
});

router.get('/reset', function(req, res, next) {
 	RawData.remove().exec(function(err, data){
 		res.send({ error: false, message: 'RawData: success.', data: data });
  });
});

module.exports = router;