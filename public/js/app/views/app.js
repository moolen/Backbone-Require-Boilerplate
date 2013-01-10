define([
	"jquery", 
	"backbone",
	"models/Model", 
	"views/start", 
	"views/blog", 
	"views/api",
	"text!templates/page/start.html"
], function($, Backbone, Model, Start, Blog, Api, template ){

        var App = Backbone.View.extend({

            el: "body",

            initialize: function() {

                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
                Backbone.Events.on( 'goBlog', this.goBlog, this );
                Backbone.Events.on( 'goApi', this.goApi, this );
                Backbone.Events.on( 'goStart', this.goStart, this );
            },

            events: {
            	"click #nextBtn" : "goFWD"
            },

            render: function() {

                if( this.options.view == undefined ){
                
	                this.goStart();
	                
                }
                if( this.options.view == "blog" ){
	                this.goBlog();
                }
                if( this.options.view == "api" ){
	                this.goApi();
                }
                
                return this;

            },
            
            /****************************
            *							*
            *	RENDER (SUB-)VIEWS		*
            *							*
            ****************************/
            
            goStart : function(){
	            new Start();
            },
            
            goBlog : function(){
	            new Blog();
            },
            
            goApi : function(){
	            new Api();
            },
                       
            /****************************
            *							*
            *	helper-functions  		*
            *	outside sub-view-scope	*				
            *							*
            ****************************/
            
            close: function(){
	        	Backbone.Events.off( 'CloseView', this.close, this );
		        $('#blog').remove();
		        this.unbind();
		        this.views = [];
            }
        });

        return App;

    }

);