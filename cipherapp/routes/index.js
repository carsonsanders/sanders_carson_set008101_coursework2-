var path = require ('path');
var dbPath = path.resolve(__dirname , 'cipher.db')
var loggedIn = false;
var loginStatus = "";
var username = "";
var registerStatus = "";

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


router.get('/messageroom', function(req, res, next) {
	var dbMessages = "";
	
	let sql = `SELECT message, 
				username
				FROM messages`;
	
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
	rows.forEach((row) => {
		console.log(row.message);
		dbMessages += row.username + " " + row.message + " ";
	});
	res.render('messageroom', {messages: dbMessages});
	});
	
})

router.post('/messageroom', function(req, res, next) {
	var message = req.body.message;
	var messageUser;
	
	if(username == "") messageUser = "Anon:";
	else messageUser = username + ":";
	
	db.run(`INSERT INTO messages(message, username) VALUES(?,?)`, [message, messageUser],function(err){
		if (err){
			return console.log(err.message);
		}
		res.redirect('/messageroom');
	});

})

router.get('/login', function(req, res, next) {
	res.render('login', {title: loginStatus, username: username});
});

router.post('/login', function(req, res, next) {
	var inputUser = req.body.username;
	var inputPass = req.body.password;
	
	var dbUser;
	var dbPass;
	var passCheck = false;
	
	let sql = `SELECT username, 
				password
				FROM users`;
	
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
	rows.forEach((row) => {
		if(row.username == inputUser && row.password == inputPass) loggedIn = true;
	});
	if (loggedIn){
		loginStatus = "loggedin";
		username = inputUser;
	}else loginStatus = "loginfail";
	res.redirect('/login');
	});
})

router.get('/register', function(req, res, next) {
	res.render('register', {title: registerStatus});
});

router.post('/register', function(req, res, next) {
	var registerName = req.body.username;
	var registerPass = req.body.password;
	
	db.run(`INSERT INTO users(username, password) VALUES(?,?)`, [registerName, registerPass],function(err){
		if (err){
			return console.log(err.message);
		}
		registerStatus = "registered";
		console.log("New account created");
		res.redirect('/register');
	});

})

module.exports = router;
