define([
		"jquery", 
		"backbone", 
		"models/model", 
		"views/app",
		"views/start", 
		"views/blog", 
		"views/api",
		"collections/Collection"
	],
    function($, Backbone, Model, App, Start, Blog, Api, Collection) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {
                Backbone.history.start();
            },
            routes: {
                "": "index",
                "blog" : "blog",
                "api" : "api"
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
            }
    
        });

        return DesktopRouter;

    }

);