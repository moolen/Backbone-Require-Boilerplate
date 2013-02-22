define([
	"jquery", 
	"backbone",
	"models/model", 
	"text!templates/page/dashboard.html"
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
	            this.$el.find(".top-nav .left a").removeClass("active");
                this.template = _.template(template, {});
                this.$el.find('.viewport').html(this.template);
                this.$el.find(".viewport-wrapper").show();
                this.$el.find(".content-box").hide();
                this.$el.find(".arrow-top").attr("class", "arrow-top dashboard");
                //this.$el.find(".viewport").css("padding","0");
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