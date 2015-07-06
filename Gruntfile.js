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
          options: {
            force: false
          },
          files: ['Gruntfile.js', 'public/app/**/*.js', 'app/**/*.js', 'test/**/*.spec.js'],
          all: ['Gruntfile.js', 'public/app/**/*.js', 'app/**/*.js', 'test/**/*.spec.js']
        },

         watch: {
          files: ['Gruntfile.js','<%= jshint.files %>'],
          tasks: ['jshint']
        },

        notify_hooks: {
            options: {
              enabled: true,
              max_jshint_notifications: 3, // maximum number of notifications from jshint output
              success: true, // whether successful grunt executions should be notified automatically
              duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },

        simplemocha: {
          options: {
              globals: ['expect'],
              timeout: 3000,
              ignoreLeaks: false,
              ui: 'bdd',
              reporter: 'tap'
          },
      
          all: { src: ['tests/*.js'] }
        }

    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');
    

    //register all the tasks
    grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask('development', ['jshint', 'simplemocha']);
    grunt.task.run('notify_hooks');
    grunt.task.run('simplemocha');
    
    
  };

})();