var http = require('http'),
	https = require('https'),
	util = require('util'),
	querystring = require('querystring'),
	check = require('validator').check,
	sanitize = require('validator').sanitize;	

module.exports = function(app, dao, everyauth) {

	app.get("/", function(req, res, next) {
		res.render("start", { layout : false });
	});

    app.get("/app", function(req, res, next){
    	if( req.session.user_id != undefined ){
	    	res.render("app", { layout : false } );
    	}else{
	    	res.render("login", { layout : false });
    	}
    });
    
    /***************
    *
    *	AUTH stuff
    *
    ****************/
    
	app.post("/login", function(req, res, next) 
    {
    	var post = req.body;
		  if (post.username == 'tobias' && post.password == '1234' ) {
		    req.session.user_id = '345163';
		    res.redirect('/app');
		  } else {
		  	req.session.loginError = "username or password is incorrect";
		    res.redirect('/login');
		  }
    });
        
    app.get('/login', function(req, res, next){
    
    	var options = { layout : false, error : req.session.loginError }
	    res.render("login", options);
    });
    
    app.get('/logout', function (req, res) {
	  delete req.session.user_id;
	  res.redirect('/login');
	});      
	
	/*********
    *
    *	404 
    *
    **********/
    
	app.get('*', function(req, res){
	  res.render('404', { layout : false });
	});
}
 