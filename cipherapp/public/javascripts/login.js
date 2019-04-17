var path = require ('path');
var dbPath = path.resolve(__dirname , 'cipher.db')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbPath, (err => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to SQlite database');
}));
db.serialize( function () {
db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
db.run("INSERT INTO users VALUES('admin', 'pass')");
});

function login(){
	var inputUser = document.getElementById("user");
	var inputPass = document.getElementById("pass");
	
	db.get(sql, [users], (err, row) => {
		if (err) {
			return console.error(err.message);
		}
	return row
    if(row.username == inputUser && row.password == inputPass){
		console.log("login succesful")
	}
 
	});
}