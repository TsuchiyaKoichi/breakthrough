module.exports = function(grunt) {
    
    'use strict';
    
    grunt.initConfig({
       jshint: {
           options: { jshintrc: '.jshintrc' },
           files: [
               'Gruntfile.js',
               'app.js',
               'Chapter01/**/*.js'
           ]
       } 
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kss');
    
    grunt.registerTask('default', []);
};