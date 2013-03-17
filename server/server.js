// DEPENDENCIES
// ============

var express = require('express'),
	partials = require('express-partials'),
	expressValidator = require('express-validator'),
	app = express(),
	mysql = require('mysql'),
	dao = require('./modules/mysqlConnector.js'),
	env = require('./environment.js')(app, express, partials, expressValidator, dao),
	rou = require('./routes.js')(app, dao);
	  


// SERVER
// ======
app.listen(app.settings.port, "localhost");
console.log("startet app with settings \r\n");
console.log(app.settings);
console.log(__dirname.replace('\server','\public'));