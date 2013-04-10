// login.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        var User = Backbone.Model.extend({

            initialize: function() {
	            this.on("change:username", function(model){
	                var name = model.get("username"); // 'Stewie Griffin'
	                Backbone.Events.trigger("changeUserName", name);
	            });
            },

            defaults: {
            	username : "",
            	type : "user"
            },

            validate: function(attrs) {
	            console.log(attrs);
            }

        });

        return User;

    }

);