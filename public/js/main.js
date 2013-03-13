require.config({

  baseUrl: "./js",

  paths: {

      // Core Libraries
      "jquery": "public/js/libs/jquery",

      "jqueryui": "public/js/libs/jqueryui",

      "underscore": "public/js/libs/lodash",

      "backbone": "public/js/libs/backbone",

      // Plugins
      "backbone.validateAll": "public/js/libs/plugins/Backbone.validateAll",

      "text": "public/js/libs/plugins/text",

      "datepicker" : "public/js/libs/datepicker",

      // Application Folders
      "collections": "public/js/app/collections",

      "models": "public/js/app/models",

      "routers": "public/js/app/routers",

      "templates": "public/js/app/templates",

      "views": "public/js/app/views"

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

require(["jquery", "backbone", "routers/DesktopRouter", "jqueryui", "backbone.validateAll"],
  function($, Backbone, DesktopRouter) {
    new DesktopRouter();    

  }

);