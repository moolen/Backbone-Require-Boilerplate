define([
	"jquery", 
	"backbone",
	"models/model", 
	"text!templates/page/dashboard.html"
], function($, Backbone, model, template ){

        var Dashboard = Backbone.View.extend({

            el: "body",

            initialize: function() {
	            console.log("initializing dashboardView")
	            $("#godashboard").addClass("active");
                this.render();
            },

            events: {
            },

            render: function() {
            	
	            this.$el.find(".top-nav .left a").removeClass("active");
	            $(".app-nav a.godashboard").addClass("active");
                this.template = _.template(template, {});
                this.$el.find('.viewport').html(this.template);
                this.$el.find(".viewport-wrapper").show();
                this.$el.find(".arrow-top").attr("class", "arrow-top dashboard");
                return this;

            },
           
            close: function(){
	        	this.$el.off();
	        	Backbone.Events.trigger( 'clearView');
                this.views = [];
                this.unbind();
                console.log("dashboard.close");
            }
        });

        return Dashboard;

    }

);