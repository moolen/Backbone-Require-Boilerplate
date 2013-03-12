// SomeWhereElse.js
// -------
define(["jquery", "backbone", "models/model", "text!templates/page/api.html"],

    function($, Backbone, model, template){

        var Api = Backbone.View.extend({

            el: ".content-box",

            initialize: function() {
                this.render();
            },

            events: {
	            
            },

            render: function() {

                this.template = _.template(template, {});

                this.$el.html( this.template );
                $('#NavGoAPI').addClass('active');
                $(".content-box").show();
                
                return this;
            },
            close: function(){
	            Backbone.Events.trigger( 'clearView');
		        $('#api').remove();
		        this.unbind();
		        this.views = [];   // Clear the view array
  
            },

        });

        return Api;

    }

);