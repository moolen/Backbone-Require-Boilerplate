'use strict';
 
module.exports = function (grunt) {
    // load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({
        watch: {
            files: "public/css/app.less",
            tasks: ["less:production", "concat", "cssmin"]
        },
        /****************************
        *
        *			LESS
        *
        ****************************/
        less: {
            development: {
                options: {
                    paths: ["public/css/"],
                    compress: false,
                    yuicompress: false,
                },
                files: {
                    "public/css/app.css": "public/css/app.less"
                }
            },
            production: {
                options: {
                    paths: ["public/css/"],
                    compress: true,
                    yuicompress: true,
                },
                files: {
                    "public/css/app.css": "public/css/app.less"
                }
            },
        },
        /****************************
        *
        *			concat
        *
        ****************************/
        concat: {
	        css: {
		        src: ['public/css/normalize.css','public/css/fontawesome.css','public/css/datepicker.css','public/css/jqueryui.lightness.min.css', 'public/css/app.css'],
		        dest: 'public/css/main.css'
	        },
        },
        
        /****************************
        *
        *			concat
        *
        ****************************/
        
        cssmin: {
	        css: {
		        src: 'public/css/main.css',
		        dest: 'public/css/main.min.css'
	        },
        },
        
        /****************************
        *
        *		requirejs
        *
        ****************************/
        requirejs: {
	        compile: {
                options: {
                	baseUrl: './public/js',
                	name: "main",
                	out: "./public/js/main.min.js",
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    mainConfigFile: './public/js/main.js'
                }
            },
		},
		        
    }); // end init Config

    grunt.registerTask( 'default', ['watch'] );
    grunt.registerTask( 'build', ['requirejs','less:production','concat', 'cssmin'] );
};