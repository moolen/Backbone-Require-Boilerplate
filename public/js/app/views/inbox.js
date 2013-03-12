define([
	"jquery", 
	"backbone",
	"models/model", 
	"text!templates/page/start.html"
], function($, Backbone, model, template ){

        var Dashboard = Backbone.View.extend({

            el: "body",

            initialize: function() {

                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
            },

            events: {
            },

            render: function() {
	            $(".app-nav a.goinbox").addClass("active");
                this.template = _.template(template, {});
                this.$el.find('.viewport').html("HEELELAOSD");
                this.$el.find(".viewport-wrapper").show();
                this.$el.find(".content-box").hide();
                this.$el.find(".arrow-top").attr("class", "arrow-top inbox");
                
                return this;

            },
           
            close: function(){
	        	Backbone.Events.off( 'CloseView', this.close, this );
	        	console.log("inbox.close");
	        	$(".app-nav a.goinbox").removeClass("active");
	        	this.$el.find(".content-box").show();
	        	this.$el.find(".viewport-wrapper").hide();
		        this.unbind();
		        this.views = [];   // Clear the view array
            }
        });

        return Dashboard;

    }

);