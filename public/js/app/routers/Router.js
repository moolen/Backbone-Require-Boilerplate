define([
		"jquery", 
		"backbone", 
		"models/model", 
		"views/app",
		"collections/Collection"
	],
    function($, Backbone, Model, App, Collection) {

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
	            		// case: no hash - render start
	            		console.log("router:goStart")
		            	Backbone.Events.trigger("goStart");
	            	}else{
		            	// case: go to view defined in hash
		            	Backbone.Events.trigger("go" + MyApp.currentView);
	            	}
	            }else{
	            	console.log("##### NEW APP INSTANCE #####");
	            	new App({ view: hash });
            	}
	            
            },
            /*
            index: function() {
                new App();
            },
            blog: function() {
	            Backbone.Events.trigger( 'goBlog' );
            },
            api: function() {
	            Backbone.Events.trigger( 'goApi' );
            },
            dashboard: function() {
	            Backbone.Events.trigger( 'goDashboard' );
            },
            inbox: function(){
	            Backbone.Events.trigger( 'goInbox' );
            },
            booking: function(){
                Backbone.Events.trigger( 'goBooking' );
            },
            */
    
        });

        return Router;

    }

);