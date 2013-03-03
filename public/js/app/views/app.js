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

                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
                Backbone.Events.on( 'goBlog', this.goBlog, this );
                Backbone.Events.on( 'goApi', this.goApi, this );
                Backbone.Events.on( 'goStart', this.goStart, this );
                Backbone.Events.on('goBooking', this.goBooking, this);
                Backbone.Events.on( 'goDashboard', this.goDashboard, this );
            },

            events: {
            },

            render: function() {
	            switch(this.options.view) {
		            case "blog" 		: this.goBlog(); break;
		            case "api" 		: this.goApi(); break;
		            case "dashboard" 	: this.goDashboard(); break;
		            case "inbox"		: this.goInbox(); break;
                                      case "booking"             : this.goBooking(); break;
		            default 			: this.goStart(); break;
	            }
                return this;

            },
            
            /****************************
            *							*
            *	RENDER (SUB-)VIEWS		*
            *							*
            ****************************/
            
            goStart : function(){
                         this.close();
	            new Start();
            },
            
            goBlog : function(){
                         this.close();
	            new Blog();
            },
            
            goApi : function(){
                         this.close();
	            new Api();
            },
            
            goDashboard : function(){
                         this.close();
	            new Dashboard();
            },     
            goInbox : function() {
                         this.close();
	            new Inbox();
            },      
            goBooking: function(){
                        this.close();
                        new Booking();
            },
            /****************************
            *							*
            *	helper-functions  		*
            *	outside sub-view-scope	*				
            *							*
            ****************************/
            
            close: function(){
	        	Backbone.Events.off( 'CloseView', this.close, this );
	        	$(".top-nav .left a").removeClass("active");
		        $('#blog').remove();
		        this.unbind();
		        this.views = [];
            }
        });

        return App;

    }

);