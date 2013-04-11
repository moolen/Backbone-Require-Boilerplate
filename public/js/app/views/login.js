define([
	"jquery", 
	"backbone",
	"models/model", 
	"text!templates/module/login.html"
], function($, Backbone, model, template ){
	
	var Login = Backbone.View.extend({
		
		el: "#LoginWrap",

        initialize: function() {
        	console.log("initializing loginView")
            this.render();
            Backbone.Events.on( 'closeLoginView', this.close, this );
        },

        events: {
        },

		render: function() {
			
	        this.template = _.template(template, {});
	        this.$el.html(this.template);
	        $(".LoginWrap").fadeIn();
	        
	        return this;
	
	    },
	
	    close: function(){
	        var that = this;
	        $(".LoginWrap").fadeOut(function(){
		        that.$el.children().remove();
		        Backbone.Events.off( 'closeLoginView' );
		        console.log("closing LoginView");
	        });
	        
	    }
	    
	});
	
	return Login;
	
});