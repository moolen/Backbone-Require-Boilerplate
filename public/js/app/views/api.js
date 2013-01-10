// SomeWhereElse.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/page/api.html"],

    function($, Backbone, Model, template){

        var Api = Backbone.View.extend({

            el: "body",

            initialize: function() {
                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
            },

            events: {
	            
            },

            render: function() {

                this.template = _.template(template, {});

                $('.viewport').html( this.template );
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