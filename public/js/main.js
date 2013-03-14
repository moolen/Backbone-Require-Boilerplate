require.config({

  paths: {

      // Core Libraries
      "jquery": "./libs/jquery",
      "jqueryui": "./libs/jqueryui",
      "underscore": "./libs/lodash",
      "backbone": "./libs/backbone",

      // Plugins
      "backbone.validateAll": "./libs/plugins/Backbone.validateAll",
      "text": "./libs/plugins/text",
      "datepicker" : "./libs/datepicker",

      // Application Folders
      "collections": "./app/collections",
      "models": "./app/models",
      "routers": "./app/routers",
      "templates": "./app/templates",
      "views": "./app/views"

  },

  shim: {

      "jqueryui": ["jquery", "datepicker"],
      "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"
      },
      "datepicker" : ["jquery"],
      "backbone.validateAll": ["backbone"]

  }

});

require(["jquery", "backbone", "routers/Router", "jqueryui", "backbone.validateAll"],
	function($, Backbone, Router) {
		new Router();
});