
var express = require('express');
var app = express();
var dateFormat = require('dateformat');

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db');

app.use('/', express.static(__dirname + '/public/'));

app.use('/packages', express.static(__dirname + '/node_modules/'));

app.get('/personnels', function(req, res) {
	let sql = 'SELECT * FROM Personnels';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

/*
app.get('/addUser', function(req, res) {
	let username = req.query.username;
	let date = new Date();
	db.run(`INSERT INTO Utilisateurs(nom, date_inscr) VALUES(?,?)`, [username, date], function(err) {
		if (err) {
			console.log(err);
			res.send({retCode:-1, message: err.message});
		} else {
			let message = "nouvel utilisateur "+username+" enregistré";
			console.log(message)
			res.send({retCode:0, data:"Nouvel utilisateur créé"});
		}
	});
});
*/

var port = 8080;
var server = app.listen(port, function(){
  console.log('listening on *:'+port);
});

