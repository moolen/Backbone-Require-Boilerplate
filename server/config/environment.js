module.exports = function(app, express, partials,  expressValidator, mysql, everyauth) {

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
        app.use(express.session({ secret: 'MasDAf$tr3eARGW5gwsE$6ghsRT', store: store }));
        app.use(app.router);
	});
	everyauth.password
	  .respondToLoginSucceed( function (res, user, data) {
	    if (user) {
	      this.redirect(res, data.session.redirectTo)
	    }   
	  })
	  .respondToRegistrationSucceed( function (res, user, data) {
	    this.redirect(res, data.session.redirectTo)
	  })
    // config for prod
    app.configure('production', function() {
        console.log('Using prod env');
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
    });


	// config for dev
    app.configure('development', function() {
        console.log('Using dev env');
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
    });
}