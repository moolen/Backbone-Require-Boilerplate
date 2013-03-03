'use strict';
 
module.exports = function (grunt) {
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
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
    });
 
     grunt.registerTask('default', ['watch']);
};