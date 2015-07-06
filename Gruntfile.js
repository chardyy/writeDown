(function(){

  'use strict';
    module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
        
       
        jshint: {
          options: {
            force: false
          },

          files: ['Gruntfile.js', 'public/app/**/*.js', 'app/**/*.js', 'tests/**.tests.js'],
          all: ['Gruntfile.js', 'public/app/**/*.js', 'app/**/*.js', 'test/**/*.tests.js']
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
              duration: 1 // the duration of notification in seconds, for `notify-send only
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
        }, 

        notify: {
            task_name: {
                options: {
                  // Task-specific options go here.
                }
            },

            watch: {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'SASS and Uglify finished running', //required
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');
    

    //register all the tasks
    grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask('development', ['jshint', 'simplemocha:all', 'notify:watch']);
    grunt.task.run('notify_hooks');
    grunt.task.run('simplemocha:all');
  };

})();