'use strict';
 
module.exports = function (grunt) {
    // load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.initConfig({
        watch: {
            files: "public/css/*.less",
            tasks: ["less"]
        },
        less: {
            development: {
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
        requirejs: {
	        dist: {
                options: {
                	name: "public/js/main",
                	out: "public/js/app.min.js",
                    baseUrl: './',
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                    mainConfigFile: 'public/js/main.js'
                }
            }
		},
		        
    }); // end init Config

    grunt.registerTask('default', ['watch']);
};