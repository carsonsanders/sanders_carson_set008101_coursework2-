var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ceaser', function(req, res, next) {
	res.render('cipher', {title: 'ceaser'});
});

router.get('/morse', function(req, res, next) {
	res.render('cipher', {title: 'morse'});
});

module.exports = router;
