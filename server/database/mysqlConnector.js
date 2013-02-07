var mysql = require('mysql'),
	bcrypt = require('bcrypt');
var dbConnect = exports;

dbConnect.setClient = function (options) {
    dbConnect.client = mysql.createConnection({
        host: options.host || 'localhost',
        port: options.port || '3306',
        user: options.user || 'root',
        password: options.password || '',
        database: options.database || 'myapp'
    });
};

dbConnect.UserCheckPassword = function (id, callback) {
		dbConnect.client.query(
	        'SELECT password FROM user WHERE login = ' + dbConnect.client.escape(id), function (err, results, fields) {
	            if (err) {
	                callback(err, results);
	            } else {
			        callback(null, results)
	            }
	    });
    
};

dbConnect.UserCreateAccount = function (login, password, callback) {
    dbConnect.client.query(
        'INSERT INTO user ( login, password ) VALUES ( ' + dbConnect.client.escape(login) + ', "' + password + '" )'  , function (err, results, fields) {
            if (err) {
                callback(err, results);
            } else {
                callback(null, results);
            }
    });
};