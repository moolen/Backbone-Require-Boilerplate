require.config({

  baseUrl: MyApp.baseUrl,

  paths: {

      // Core Libraries
      "jquery": "js/libs/jquery",
      "jqueryui": "js/libs/jqueryui",
      "underscore": "js/libs/lodash",
      "backbone": "js/libs/backbone",

      // Plugins
      "backbone.validateAll": "js/libs/plugins/Backbone.validateAll",
      "text": "js/libs/plugins/text",
      "datepicker" : "js/libs/datepicker",

      // Application Folders
      "collections": "js/app/collections",
      "models": "js/app/models",
      "routers": "js/app/routers",
      "templates": "js/app/templates",
      "views": "js/app/views"

  },

  shim: {

      "jqueryui": ["jquery"],
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