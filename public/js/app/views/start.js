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
                $(".content-box").show();
                
                // set navi active-class
                $('#header li').removeClass('active');
                $('#NavGoHome').addClass('active');
                
                // render nextBtn
                if( $('#nextBtn').length == "" ){
	                 $('.viewport').append('<button class="btn nextBtn" id="nextBtn">goForward</button>');
                }
                return this;

            },

            close: function(){
		        $('#blog').remove();
		        this.unbind();
		        this.views = [];   // Clear the view array
            }
        });

        return Start;

    }

);