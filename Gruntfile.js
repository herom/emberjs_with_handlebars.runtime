/*jshint camelcase: false */
/*global module:false */
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      dev: {
        buildPath: '.'
      },
      prod: {
        buildPath: '.'
      }
    },

    neuter: {
	  pass: {
        options: {
          includeSourceURL: true
		},
	    files: [
		  {
			 src: [
            /**
             * The jQuery dependency for running Ember.js.
             * <p>
             *   Project at GitHub: https://github.com/jquery/jquery
             *
             * @module jQuery
             * @version 2.0.2
             * @license The MIT License, see https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
             */
              'js/libs/jquery/jquery.js',

            /**
             * The Handlebars dependency which is used to run Ember.js properly.
             *
             * <p>
             *   This would change to the 'handlebars-runtime' microlib instead,
             *   because the template will be precompiled on the server.
             * <p>
             *   Project at GitHub: https://github.com/wycats/handlebars.js/
             *
             * @module Handlebars.js Runtime Microlib
             * @version 1.0.0 (v1.0.12)
             * @license The MIT License, see https://github.com/wycats/handlebars.js/blob/master/LICENSE
             */
              'js/libs/handlebars/handlebars.runtime100.js',

            /**
             * Ember.js framework.
             * <p>
             *   Project at GitHub: https://github.com/emberjs/ember.js/
             *
             * @module Ember.js
             * @version 1.3.0
             * @license The MIT License, see https://github.com/emberjs/ember.js/blob/master/LICENSE
             */
              'js/libs/ember/ember.min.js',

			  /**
			  * The precompiled templates.
			  */
			  'js/libs/compiled/templates.js',

            /**
             * The Application.
             *
             * @module App
             */
              'app/app.js'
            ],
            dest: '<%= meta.dev.buildPath %>/js/application.pass.js' 
		  }
		]
	  },

      fail: {
        options: {
          includeSourceURL: true
        },
        files: [
          {
            src: [
            /**
             * The jQuery dependency for running Ember.js.
             * <p>
             *   Project at GitHub: https://github.com/jquery/jquery
             *
             * @module jQuery
             * @version 2.0.2
             * @license The MIT License, see https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
             */
              'js/libs/jquery/jquery.js',

            /**
             * The Handlebars dependency which is used to run Ember.js properly.
             *
             * <p>
             *   This would change to the 'handlebars-runtime' microlib instead,
             *   because the template will be precompiled on the server.
             * <p>
             *   Project at GitHub: https://github.com/wycats/handlebars.js/
             *
             * @module Handlebars.js Runtime
             * @version 1.3.0
             * @license The MIT License, see https://github.com/wycats/handlebars.js/blob/master/LICENSE
             */
              'js/libs/handlebars/handlebars.runtime.js',

            /**
             * Ember.js framework.
             * <p>
             *   Project at GitHub: https://github.com/emberjs/ember.js/
             *
             * @module Ember.js
             * @version 1.3.0
             * @license The MIT License, see https://github.com/emberjs/ember.js/blob/master/LICENSE
             */
              'js/libs/ember/ember.min.js',

			  /**	  				
			  * The precompiled templates.
			  */
			  'js/libs/compiled/templates.js',


            /**
             * The Application.
             *
             * @module App
             */
              'app/app.js'
            ],
            dest: '<%= meta.dev.buildPath %>/js/application.fail.js'
          }
        ]
      }
    },

   
    watch: {
      application_code: {
        files: ['js/libs/ember/*.js', 'app/**/*.js'],
        tasks: ['neuter']
      },
    
      handlebars_templates: {
        files: ['app/**/*.hbs'],
        tasks: ['emberTemplates', 'neuter']
      }
    },

    
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', '!js/libs/*.*'],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    emberTemplates: {
      options: {
        templateName: function (sourceFile) {
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      files: {
        src: [
          'app/templates/**/*.hbs'
        ],
        dest: '<%= meta.dev.buildPath %>/js/libs/compiled/templates.js'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');



  grunt.registerTask('lint_tasks', ['jshint']);
  grunt.registerTask('lint', 'JavaScript Code Linting', function () {
    grunt.task.run('lint_tasks');
  });
 
  grunt.registerTask('fail_tasks', ['emberTemplates', 'neuter:fail', 'watch']);
  grunt.registerTask('fail', 'Build fails due to implementation of Handlebars.runtime microlib (1.3.0)', function () {
    grunt.task.run('fail_tasks');
  });

   grunt.registerTask('pass_tasks', ['emberTemplates', 'neuter:pass', 'watch']);
  grunt.registerTask('pass', 'Build passes due to implementation of full Handlebars lib (1.3.0)', function () {
    grunt.task.run('pass_tasks');
  });

  grunt.registerTask('default', 'fail');
};
