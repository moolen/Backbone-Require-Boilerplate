require.config({

  paths: {

      // Core Libraries
      "jquery": "./libs/jquery/jquery.min",
      "underscore": "./libs/lodash/lodash",
      "backbone": "./libs/backbone/backbone-min",
      "jqueryui": "./libs/jquery-ui/ui/jquery-ui.custom",
      
      // Plugins
      "backbone.validateAll": "./libs/Backbone.validateAll/src/javascripts/Backbone.validateAll",
      "text": "./libs/requirejstext/index",
      "datepicker" : "./libs/datepicker/js/bootstrap-datepicker",
      

      // Application Folders
      "collections": "./app/collections",
      "models": "./app/models",
      "routers": "./app/routers",
      "templates": "./app/templates",
      "views": "./app/views"

  },

  shim: {

      "jqueryui": [ "jquery" ],
      "backbone": {
            "deps": [ "underscore", "jquery" ],
            "exports": "Backbone"
      },
      "datepicker" : [ "jquery" ],
      "backbone.validateAll": [ "backbone" ]

  }

});

require(["jquery", "backbone", "routers/Router", "jqueryui", "backbone.validateAll"],
	function($, Backbone, Router) {
		new Router();
});