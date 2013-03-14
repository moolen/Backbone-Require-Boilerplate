define(["jquery", "backbone", "models/model", "text!templates/page/blog.html"],

    function($, Backbone, model, template){

        var Blog = Backbone.View.extend({

            el: ".content-box",

            initialize: function() {
                this.render();
            },

            events: {
            	
            },

            render: function() {
	           
                this.template = _.template(template, {  });
                this.$el.html( this.template );
                $('#header .left a').removeClass('active');
                $('#NavGoBlog').addClass('active');
                $(".content-box").show();
                return this;

            },
            close: function(){
	             Backbone.Events.trigger( 'clearView');
		        $("#blog-container").remove();
		        this.unbind();
		        this.views = [];   // Clear the view array

            }
        });

        return Blog;

    }

);