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
                "": "index",
                "blog" : "blog",
                "api" : "api",
                "dashboard" : "dashboard",
                "inbox" : "inbox",
                "booking" : "booking",
            },

            index: function() {
                Backbone.Events.trigger("CloseView");
                new App();
            },
            blog: function() {
            	Backbone.Events.trigger("CloseView");
	            new App({ view : "blog" });
            },
            api: function() {
            	Backbone.Events.trigger("CloseView");
	            new App({ view  : "api" });
            },
            dashboard: function() {
	            Backbone.Events.trigger("CloseView");
	            new App({ view : "dashboard" });
            },
            inbox: function(){
	            Backbone.Events.trigger("CloseView");
	            new App({ view : "inbox" });
            },
            booking: function(){
                        Backbone.Events.trigger("CloseView");
                        new App({ view: "booking"});
            },
    
        });

        return DesktopRouter;

    }

);