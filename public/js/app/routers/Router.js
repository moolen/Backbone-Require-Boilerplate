define([
		"jquery", 
		"underscore",
		"backbone", 
		"models/model", 
		"views/app",
		"collections/Collection"
	],
    function($, _, Backbone, Model, App, Collection) {

        var Router = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },
            
            routes: {
                "*variables"				: 		"buildRoute",                
            },
            
            buildRoute: function(hash) {
            	if(MyApp.currentView !== null){
            		MyApp.currentView = hash.charAt(0).toUpperCase() + hash.slice(1);
	            	console.log("router: trigger hash #" + MyApp.currentView);
	            	if(MyApp.currentView == ""){
	            		// case: no hash - render default page
	            		console.log("router:goDashboard")
		            	Backbone.Events.trigger("goDashboard");
	            	}else{
		            	
		            	if( _.has(Backbone.Events._events, ("go" + MyApp.currentView)) ) {
		            		// case: go to view
			            	Backbone.Events.trigger("go" + MyApp.currentView);
		            	}else{
		            		console.log("no hash recognized");
			            	// hashbang has NO event!
			            	window.location.hash = "#dashboard";
			            	// does: Backbone.Events.trigger("goDashboard");
		            	}
		            	
		            	
	            	}
	            }else{
	            	console.log("##### NEW APP INSTANCE #####");
	            	if(hash){
		            	new App({ view: hash });
	            	}else{
		            	new App({ view: 'dashboard' });
	            	}
	            		
            	}
	            
            },
    
        });

        return Router;

    }

);