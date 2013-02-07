define([
	"jquery", 
	"backbone",
	"models/Model", 
	"text!templates/page/start.html"
], function($, Backbone, Model, template ){

        var Dashboard = Backbone.View.extend({

            el: "body",

            initialize: function() {

                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
            },

            events: {
            },

            render: function() {

                this.template = _.template(template, {});
                this.$el.find('.viewport').html("HEELELAOSD");
                this.$el.find(".viewport-wrapper").show();
                this.$el.find(".content-box").hide();
                this.$el.find(".arrow-top").attr("class", "arrow-top inbox");
                
                return this;

            },
           
            close: function(){
	        	Backbone.Events.off( 'CloseView', this.close, this );
	        	this.$el.find(".content-box").show();
	        	this.$el.find(".viewport-wrapper").hide();
		        this.unbind();
		        this.views = [];   // Clear the view array
            }
        });

        return Dashboard;

    }

);