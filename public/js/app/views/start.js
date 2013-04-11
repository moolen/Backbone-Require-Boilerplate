define([
	"jquery", 
	"backbone",
	"models/model", 
	"text!templates/page/start.html"
], function($, Backbone, model, template ){

        var Start = Backbone.View.extend({

            el: ".content-box",

            initialize: function() {
                this.render();
            },

            events: {
            },

            render: function() {

                this.template = _.template(template, {});
                this.$el.html(this.template);
                
                return this;

            },

            close: function(){
		        $('#blog').remove();
		        Backbone.Events.trigger( 'clearView');
		        this.unbind();
		        this.views = [];   // Clear the view array
            }
        });

        return Start;

    }

);