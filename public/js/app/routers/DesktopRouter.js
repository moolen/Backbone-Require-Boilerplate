// DesktopRouter.js
// ----------------
define([
		"jquery", 
		"backbone", 
		"models/model", 
		"views/start", 
		"views/blog", 
		"views/api",
		"collections/Collection"
	],
    function($, Backbone, Model, Start, Blog, Api, Collection) {

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
                new Start();

            },
            blog: function() {
            	Backbone.Events.trigger("CloseView");
	            new Blog();
            },
            api: function() {
            	Backbone.Events.trigger("CloseView");
	            new Api();
            }
    
        });

        return DesktopRouter;

    }

);