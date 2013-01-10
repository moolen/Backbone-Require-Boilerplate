// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/Model", "views/LandingPage", "collections/Collection"],
        
    function($, Backbone, UserModel, LandingPage, Collection) {

        var MobileRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                
                // When there is no hash bang on the url, the home method is called
                "": "index"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new LandingPage();

            }
    
        });

        // Returns the MobileRouter class
        return MobileRouter;

    }

);