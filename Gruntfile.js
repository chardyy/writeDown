(function(){
  'use strict';
    module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
        
        typescript: {
          options: {
            module: 'commonjs'
          },

          all: {
            src: ['./www/plsRemindMe.Web/js/*/*.ts'],
            dest: './www/plsRemindMe/js/_output'
          }
        },

        jshint: {
          files: ['Gruntfile.js', 'public/app/**/*.js'] 
        },

         watch: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint']
        }

      });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //register all the tasks
    grunt.registerTask('default', ['jshint']);
    
  };

})();