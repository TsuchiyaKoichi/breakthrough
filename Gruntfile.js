module.exports = function(grunt) {
    
    'use strict';
    
    grunt.initConfig({
       jshint: {
           options: { jshintrc: '.jshintrc' },
           files: [
               'Gruntfile.js',
               'app.js',
               'Chapter01/**/*.js',
               'Chapter02/**/*.js',
               'Chapter04/**/*.js'
           ]
       } 
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kss');
    
    grunt.registerTask('default', ['jshint']);
};