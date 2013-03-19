define([
	"jquery", 
	"backbone",
	"models/model", 
	"views/start", 
	"views/blog", 
	"views/api",
	"views/dashboard",
	"views/inbox",
             "views/booking",
	"text!templates/page/start.html"
], function($, Backbone, model, Start, Blog, Api, Dashboard, Inbox, Booking, template ){

        var App = Backbone.View.extend({

            el: "body",

            initialize: function() {
	            MyApp.currentView = "App";
                this.render(this.options);
                Backbone.Events.on( 'goBlog', this.goBlog, this );
                Backbone.Events.on( 'goApi', this.goApi, this );
                Backbone.Events.on( 'goStart', this.goStart, this );
                Backbone.Events.on( 'goBooking', this.goBooking, this);
                Backbone.Events.on( 'goDashboard', this.goDashboard, this );
                Backbone.Events.on( 'goInbox', this.goInbox, this );
                Backbone.Events.on( 'slideWindowTo', this.slideWindowTo, this );
                Backbone.Events.on( 'moveFrameRight', this.moveFrameRight, this );
                Backbone.Events.on( 'moveFrameLeft', this.moveFrameLeft, this );
                Backbone.Events.on( 'clearView', this.clearView, this );
            },

            events: {
            	//"click #godashboard" : "goDashboard",
            	//"click #gobooking" : "goBooking",
            	//"click #goinbox" : "goInbox",
            	//"click #NavGoBlog" : "goBlog",
            	//"click #NavGoApi" : "goApi",
            },

            render: function() {
            	this.clearView();
	            console.log(this.options);
	            switch(this.options.view) {
		            case "blog" 		: this.goBlog(); break;
		            case "api" 			: this.goApi(); break;
		            case "dashboard" 	: this.goDashboard(); break;
		            case "inbox"		: this.goInbox(); break;
                    case "booking"      : this.goBooking(); break;
		            default 			: this.goStart(); break;
	            }
                return this;

            },
            
            /****************************
            *							*
            *	RENDER (SUB-)VIEWS		*
            *							*
            ****************************/

            goStart : function() {
                this.currentView ? this.currentView.close() : null;
	            var itemView = new Start();
	            this.currentView = itemView;
            },
            
            goBlog : function() {
                this.currentView ? this.currentView.close() : null;
	            var itemView = new Blog();
	            this.currentView = itemView;
            },
            
            goApi : function() {
                this.currentView ? this.currentView.close() : null;
	            var itemView = new Api();
	            this.currentView = itemView;
            },
            
            goDashboard : function() {
                this.currentView ? this.currentView.close() : null;
	            var itemView = new Dashboard();
	            this.currentView = itemView;
            },     
            goInbox : function() {
                this.currentView ? this.currentView.close() : null;
	            var itemView = new Inbox();
	            this.currentView = itemView;
            },      
            goBooking: function() {
                this.currentView ? this.currentView.close() : null;
                var itemView = new Booking();
                this.currentView = itemView;
            },
            
            /****************************
            *							*
            *	   global-functions  	*
            *							*
            ****************************/
            
            slideWindowTo: function($element, time, additionalOffset) {
           		var duration = time || 350;
           		var addOffset = -additionalOffset || -25;
           		var offset = this.getOffset($element);
           		
	       		$("html, body").animate({
		       		scrollTop: offset.top + addOffset,
		       	}, duration);
            },
            
            moveFrameRight: function( HTMLtemplate, data, callback ) {
            
            	var d = data || {},
           	    	template = _.template( HTMLtemplate, d );
           		
           		$(".frames").append("<div class='frame-loading'>" + template + "</div>");
	            $(".frame").animate({
		           left: "1020px",
		           
	            }, 300, function(){
	            	// animate height
	            	var newHeight = $(".frame-loading").height();
		           
	            	$(".frames").animate({
			           height: newHeight
			           }, 500, null);
		            $(".frame").remove();
		            $(".frame-loading").attr("class","frame");
	            });
	            if( callback != undefined){
		            callback();
	            }
	            
            },
            
            moveFrameLeft: function( HTMLtemplate, data, callback ) {
            	var d = data || {},
            		template = _.template( HTMLtemplate, d );
	           		
	           		$(".frames").append("<div class='frame-loading'>" + template + "</div>");
		            $(".frame").animate({
			           left: "-1020px",
			           
		            }, 300, function(){
			           // onComplete
			           var newHeight = $(".frame-loading").height();
			           $(".frames").animate({
				           height: newHeight
			           }, 500, null);
			           $(".frame").remove();
			           $(".frame-loading").attr("class","frame");
		            });
		            if( callback != undefined){
			            callback();
		            }
            },
            
            clearView: function(){
	            $(".app-nav a").removeClass("active");
	        	$(".top-nav .left a").removeClass("active");
                    $(".arrow-popup").remove();
                $(".viewport").children().remove();
                $("#blog-container").remove();
                $(".content-box").hide();
	        	$(".viewport-wrapper").hide();
            },
            
            close: function() {
            	// close AppView here.
            	console.log("closing AppView");
	        	Backbone.Events.off( 'slideWindowTo', this.slideWindowTo, this );
                Backbone.Events.off( 'moveFrameRight', this.moveFrameRight, this );
                Backbone.Events.off( 'moveFrameLeft', this.moveFrameLeft, this );
                this.unbind();
		        this.views = [];
            }
        });

        return App;

    }
);