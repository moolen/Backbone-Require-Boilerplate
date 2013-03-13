'use strict';
 
module.exports = function (grunt) {
    // load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.initConfig({
        watch: {
            files: "public/css/*.less",
            tasks: ["less:development"]
        },
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
        requirejs: {
	        compile: {
                options: {
                	baseUrl: './public/js',
                	name: "main",
                	out: "main.min.js",
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    mainConfigFile: './public/js/main.js'
                }
            },
		},
		        
    }); // end init Config

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [
    		'requirejs',
    		'less:production',
    ]);
};