// DEPENDENCIES
// ============

var express = require('express'),
	partials = require('express-partials'),
	expressValidator = require('express-validator'),
	app = express(),
	mysql = require('mysql'),
	everyauth = require('everyauth'),
	dao = require('./database/mysqlConnector.js'),
	env = require('./config/environment.js')(app, express, partials, expressValidator, dao, everyauth),
	rou = require('./controller/routes.js')(app, dao, everyauth);
	  


// SERVER
// ======
app.listen(app.settings.port, "localhost");
console.log("startet app with settings \r\n");
console.log(app.settings);