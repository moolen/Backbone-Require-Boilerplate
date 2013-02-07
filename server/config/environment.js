module.exports = function(app, express, partials,  expressValidator, mysql) {

    var store = new express.session.MemoryStore;
	// config for all environments
	app.configure(function() {
		
        app.use(express.bodyParser());
        app.use(express.cookieParser()); 
		app.use(express.methodOverride());
        app.use(expressValidator);
        app.use(partials());
		app.set('view engine', 'ejs');
		app.set('port', 8123);
		app.set('view options', {pretty: true});
		app.set('views', __dirname.replace('/config','') + '/views');
        app.use(express.static(__dirname.replace('/server/config','') +'/public'));
        app.use(express.cookieSession({ secret : "adfq394QW35twerTW$%&ZE%$6uzR%U&erFT", path: '/', httpOnly: true, maxAge: 1000*60*60*24 }));
        app.use(app.router);
	});
    // config for prod
    app.configure('production', function() {
        
        var appUrl = 'https://production.myapp.com',
            options = {};
        var appUrlNoSSL = 'http://apps.leanfwd.de/leibniz522013/';

        // db options
        dboptions = {
            user: 'r000dboi',
            password: 'SuperSecretPassword',
            database: 'myapp_production'
        };
        mysql.setClient(dboptions);
       
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));

        // public vars for views
        app.locals({
            appUrl : appUrl
        });
        console.log('Using prod env');
        console.log(appUrl);
    });


	// config for dev
    app.configure('development', function() {
        var appUrl = 'http://localhost:8123/',
            options = {};
        var appUrlNoSSL = 'http://localhost:8123/';
        
        // db options
        dboptions = {
            user: 'root',
            password: '',
            database: 'myapp'
        };
        mysql.setClient(dboptions);

        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));

        // public vars for views
        app.locals({
            appUrl: appUrl,
        });
        console.log('Using dev env\r\n');
        console.log(appUrl);
    });
}