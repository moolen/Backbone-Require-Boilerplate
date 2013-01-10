define(["jquery", "backbone", "models/Model", "text!templates/page/blog.html"],

    function($, Backbone, Model, template){

        var Blog = Backbone.View.extend({

            el: "body",

            initialize: function() {
                this.render();
                Backbone.Events.on( 'CloseView', this.close, this );
            },

            events: {
            	
            },

            render: function() {
	           
                this.template = _.template(template, {  });
                $('.viewport').html( this.template );
                $('#header li').removeClass('active');
                $('#NavGoBlog').addClass('active');

                return this;

            },
            close: function(){
	            Backbone.Events.off( 'CloseView', this.close, this );
		        $('#blog').remove();
		        this.unbind();
		        this.views = [];   // Clear the view array

            }
        });

        return Blog;

    }

);