define([
		"jquery", 
		"backbone", 
		"models/model", 
		"views/app",
		"views/start", 
		"views/blog", 
		"views/api",
		"views/dashboard",
		"views/inbox",
		"collections/Collection"
	],
    function($, Backbone, Model, App, Start, Blog, Api, Dashboard, Collection) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },
            routes: {
                "": "index",
                "blog" : "blog",
                "api" : "api",
                "dashboard" : "dashboard",
                "inbox" : "inbox"
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
            }
    
        });

        return DesktopRouter;

    }

);