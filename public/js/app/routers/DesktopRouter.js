define([
		"jquery", 
		"backbone", 
		"models/model", 
		"views/app",
		"collections/Collection"
	],
    function($, Backbone, Model, App, Collection) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },
            routes: {
                ""				: 		"index",
                // app stuff
                "dashboard"		: 		"dashboard",
                "booking"		: 		"booking",
                "inbox" 		: 		"inbox",
                
                // nav stuff
                "blog" : "blog"
                
                
            },

            index: function() {
                new App();
            },
            blog: function() {
	            //App.goBlog();
	            Backbone.Events.trigger( 'goBlog' );
            },
            api: function() {
	            //App.goApi();
	            Backbone.Events.trigger( 'goApi' );
            },
            dashboard: function() {
	            //App.goDashboard();
	            Backbone.Events.trigger( 'goDashboard' );
            },
            inbox: function(){
	            Backbone.Events.trigger( 'goInbox' );
            },
            booking: function(){
                //App.goBooking();
                Backbone.Events.trigger( 'goBooking' );
            },
    
        });

        return DesktopRouter;

    }

);