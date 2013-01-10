var mysql = require('mysql');

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
