var http = require('http'),
	https = require('https'),
	util = require('util'),
	querystring = require('querystring'),
	check = require('validator').check,
	sanitize = require('validator').sanitize,	
	bcrypt = require('bcrypt');
	
module.exports = function(app, dao, everyauth) {
	
	app.get("/", function(req, res, next) {
		
    	//if( req.session.user_id != undefined ){
	    	res.render("app", { layout : false, } );
    	//}else{
	    	//res.redirect("/login");
    	//}

		//res.redirect("/app");
	});

    app.get("/app", function(req, res, next){
    	
    	if( req.session.user_id != undefined ){
	    	res.render("app", { layout : false } );
    	}else{
	    	res.redirect("/login");
    	}
    });
    
    /***************
    *
    *	API stuff
    *
    ****************/
    
    // GET / read resource 
    app.get("/api/messages", function(req, res, next){
    	if( req.session.user_id != undefined ){
	    	res.send('messages get yey!', 200);
    	}else{
	    	res.send("bad login", 403 );
    	}
    });
    
    // POST / create resource
    app.post("/api/messages", function(req, res, next){
    	if( req.session.user_id != undefined ){
	    	res.render("message post yey!", 200 );
    	}else{
	    	res.render("bad login", 403 );
    	}
    });
    
    // PUT / update resource 
    app.put("/api/messages", function(req, res, next){
    	if( req.session.user_id != undefined ){
	    	res.render("yey!", 200 );
    	}else{
	    	res.render("bad login", 403 );
    	}
    });
    
    // DELETE / delete resource
    app.delete("/api/messages", function(req, res, next){
    	if( req.session.user_id != undefined ){
	    	res.render("yey!", 200 );
    	}else{
	    	res.render("bad login", 403 );
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
    		dao.UserCheckPassword( post.username, function(err, result){
    			console.log(result)
	    		if( result.toString() == "" ){
		    		req.session.loginError = "username or password is incorrect";
		    		res.redirect('/login');
	    		}else{
	    				req.session.user_id = "yey!";
						res.redirect("/app");
	    		}
    		});
    });
        
    app.get('/login', function(req, res, next){
    	
	    if(req.session.user_id == undefined){
	    	// user is not logged in
		    if(req.session.loginError == undefined){
		    	var options = { layout : false, error : null };
	    	}else{
		    	var options = { layout : false, error : req.session.loginError };
	    	}
		    res.render("login", options);
	    }else{
		    // user is already logged in
		    res.redirect("/app");
	    }	
	    	
    });
    
    app.get('/logout', function (req, res) {
    	delete req.session.loginError;
		delete req.session;
		res.redirect('/');
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