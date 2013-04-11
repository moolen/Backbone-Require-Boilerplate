define([
	"jquery", 
	"backbone",
	"models/model", 
	"models/user",
	"views/start", 
	"views/blog", 
	"views/api",
	"views/dashboard",
	"views/inbox",
    "views/booking",
    "views/login",
	"text!templates/page/start.html"
], function($, Backbone, model, userModel, Start, Blog, Api, Dashboard, Inbox, Booking, Login, template ){

        var App = Backbone.View.extend({

            el: "body",

            initialize: function() {
	            MyApp.currentView = "App";
	            this.user = new userModel();
                this.render(this.options);
                Backbone.Events.on( 'goBlog', this.goBlog, this );
                Backbone.Events.on( 'goApi', this.goApi, this );
                Backbone.Events.on( 'goStart', this.goStart, this );
                Backbone.Events.on( 'goBooking', this.goBooking, this);
                Backbone.Events.on( 'goDashboard', this.goDashboard, this );
                Backbone.Events.on( 'goLogin', this.goLogin, this );
                Backbone.Events.on( 'goInbox', this.goInbox, this );
                Backbone.Events.on( 'slideWindowTo', this.slideWindowTo, this );
                Backbone.Events.on( 'moveFrameRight', this.moveFrameRight, this );
                Backbone.Events.on( 'moveFrameLeft', this.moveFrameLeft, this );
                Backbone.Events.on( 'signIn', this.signIn, this);
                Backbone.Events.on( 'clearView', this.clearView, this );
                Backbone.Events.on( 'changeUserName', this.changeUserName, this );
            },

            events: {
            	"click #LoginButton" : "goLogin",
            	"click #signInBtn" : "signIn",
            	//"click #goinbox" : "goInbox",
            	//"click #NavGoBlog" : "goBlog",
            	//"click #NavGoApi" : "goApi",
            },

            render: function() {
            	this.clearView();
	            console.log(this.options);
	            switch(this.options.view) {
		            //case "blog" 		: this.goBlog(); break;
		            //case "api" 			: this.goApi(); break;
		            case "dashboard" 	: this.goDashboard(); break;
		            //case "inbox"		: this.goInbox(); break;
                    case "booking"      : this.goBooking(); break;
		            default 			: this.goDashboard(); break;
	            }
                return this;

            },
            
            /****************************
            *							*
            *	RENDER (SUB-)VIEWS		*
            *							*
            ****************************/

            goStart : function() {
                //this.currentView ? this.currentView.close() : null;
	            var itemView = new Start();
	            this.currentView = itemView;
            },
            
            goBlog : function() {
                //this.currentView ? this.currentView.close() : null;
	            var itemView = new Blog();
	            this.currentView = itemView;
            },
            
            goApi : function() {
                //this.currentView ? this.currentView.close() : null;
	            var itemView = new Api();
	            this.currentView = itemView;
            },
            
            goLogin : function(e) {
            	e ? e.preventDefault() : null;
            	$btn =  $("#LoginButton");
            	if( $btn.hasClass("active") ){
            		// is already open!
            		$btn.removeClass("active");
	            	Backbone.Events.trigger("closeLoginView");
            	}else{
            		// it is not open!
            		if( !$btn.hasClass("isLoggedIn") ){
            			// user is not logged in, show view
	            		$btn.addClass("active");
		            	new Login();
            		}
            	}
            },
            
            goDashboard : function() {
            	(MyApp.currentView == "Dashboard") ? this.currentView.close() : null;
	            var itemView = new Dashboard();
	            this.currentView = itemView;
            },     
            goInbox : function() {
                this.currentView ? this.currentView.close() : null;
	            var itemView = new Inbox();
	            this.currentView = itemView;
            },      
            goBooking: function() {
            	(MyApp.currentView == "Booking") ? this.currentView.close() : null;
                //this.currentView ? this.currentView.close() : null;
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
            
            signIn : function(e) {
            	console.log(e);
	            e ? e.preventDefault() : null;
	            var username = $('input[name="userName"]').val();
	            if( username != "" ){
		            this.user.set({ username : username });
		            Backbone.Events.trigger( 'closeLoginView' );
	            }
	            console.log(this.user);
	            
            },
            
            changeUserName : function(username) {
	            console.log("Model:username: " + username);
	            $("#LoginButton").addClass("isLoggedIn");
	            $("#LoginButton").html("Hello " + username);
	            $(".top-nav .right").append("<span class='vertical divider'></span>");
	            $(".top-nav .right").append('<span class="fr link" id="LogOutBtn" href="#">Log Out</span>');
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