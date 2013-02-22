// SomeWhereElse.js
// -------
define(["jquery", "backbone", "models/model", "text!templates/page/api.html"],

    function($, Backbone, model, template){

        var Api = Backbone.View.extend({

            el: ".content-box",

            initialize: function() {
                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
            },

            events: {
	            
            },

            render: function() {

                this.template = _.template(template, {});

                this.$el.html( this.template );
                $('header li').removeClass('active');
                $('#NavGoAPI').addClass('active');
                // Maintains chainability
                return this;
            },
            close: function(){
	          	Backbone.Events.off( 'CloseView', this.close, this );
		        $('#api').remove();
		        this.unbind();
		        this.views = [];   // Clear the view array
  
            },

        });

        return Api;

    }

);