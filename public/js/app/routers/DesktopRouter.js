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
                "blog" 			: 		"blog",
                "api"			: 		"api",
                
                
            },

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
    
        });

        return DesktopRouter;

    }

);