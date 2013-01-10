define([
	"jquery", 
	"backbone",
	"models/Model", 
	"text!templates/page/start.html"
], function($, Backbone, Model, template ){

        var Start = Backbone.View.extend({

            el: "body",

            initialize: function() {

                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
            },

            events: {
            	"click #nextBtn" : "goFWD"
            },

            render: function() {

                this.template = _.template(template, {});
                this.$el.find('.viewport').html(this.template);
                
                // set navi active-class
                $('#header li').removeClass('active');
                $('#NavGoHome').addClass('active');
                
                // render nextBtn
                if( $('#nextBtn').length == "" ){
	                 $('.viewport').append('<button class="btn nextBtn" id="nextBtn">goForward</button>');
                }
                return this;

            },
            // animate slider
            goFWD : function(e) {
	            var left = $('.slider').css('left').replace('px','');
	            var n = $('.row').length;
	            //console.log(left);
	            //console.log(n);
	            //console.log($('.slider').queue());
	            if( (n*800) >= (801+(-left)) && $('.slider').queue() != "inprogress" ){
	            
		            $('.slider').animate({ left: left - 800 + 'px'}, 800);
	            }
	            	
            },
            close: function(){
	        	Backbone.Events.off( 'CloseView', this.close, this );
		        $('#blog').remove();
		        this.unbind();
		        this.views = [];   // Clear the view array
            }
        });

        return Start;

    }

);