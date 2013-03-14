require.config({

  paths: {

      // Core Libraries
      "jquery": "./libs/jquery",
      "underscore": "./libs/lodash",
      "backbone": "./libs/backbone",

      // Plugins
      "backbone.validateAll": "./libs/plugins/Backbone.validateAll",
      "text": "./libs/plugins/text",
      "datepicker" : "./libs/datepicker",
      "jqueryui": "./libs/jqueryui",

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