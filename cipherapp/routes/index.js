var path = require ('path');
var dbPath = path.resolve(__dirname , 'cipher.db')
var loggedIn = false;

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, (err => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to SQlite database');
}));
db.serialize( function () {
db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
db.run("CREATE TABLE IF NOT EXISTS messages (message TEXT, username TEXT)");
//db.run("INSERT INTO users VALUES('admin', 'pass')");
});

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

router.get('/login', function(req, res, next) {
	res.render('login', {title: 'login'});
});

router.get('/messageroom', function(req, res, next) {
	res.render('messageroom', {title: 'messageroom'});
})

router.post('/messageroom', function(req, res, next) {
	var message = req.body.message;
	db.run(`INSERT INTO messages(message) VALUES(?)`, [message],function(err){
		if (err){
			return console.log(err.message);
		}
		res.redirect('/messageroom');
	});

})

router.post('/login', function(req, res, next) {
	var inputUser = req.body.username;
	var inputPass = req.body.password;
	
	var dbUser;
	var dbPass;
	var passCheck = false;
	
	let sql = `SELECT username, 
				password
				FROM users`;
						
	db.each(sql, [], (err, row) => {
		if (err) {
			return console.error(err.message);
		}
		if (row.username == inputUser && row.password == inputPass) res.redirect('/ceaser');
		else res.redirect('/morse');
	});
	

})

module.exports = router;
