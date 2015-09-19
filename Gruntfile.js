// Generated on 2015-09-01 using generator-angular 0.12.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    express: {
      options: {
        // Override defaults here
      },
      web: {
        options: {
          script: 'server.js',
        }
      },
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'app/styles/',
          cssDir: 'app/styles/',
          environment: 'production'
        }
      }
    },
    watch: {
      frontend: {
        options: {
          livereload: true
        },
        files: [
          // triggering livereload when the .css file is updated
          // (compared to triggering when sass completes)
          // allows livereload to not do a full page refresh
          'app/styles/*.css',
          'app/*.html',
          'app/views/*.html',
          'app/scripts/**/*.js'
        ]
      },
      sass: {
        files: ['app/styles/*.{scss,sass}'],
        tasks: ['sass:server', 'postcss'],
        options: {
          livereload: true
        }
      },
      web: {
        files: [
          '*.js',
          'server/controllers/*.js'
        ],
        tasks: [
          'express:web'
        ],
        options: {
          nospawn: true, //Without this option specified express won't be reloaded
          atBegin: true,
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: ['.']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.{scss,sass}'],
          dest: 'app/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.{scss,sass}'],
          dest: 'app/styles',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          // Add vendor prefixed styles
          require('autoprefixer-core')({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles/',
          src: '{,*/}*.css',
          dest: 'app/styles/'
        }]
      }
    },

    parallel: {
      web: {
        options: {
          stream: true
        },
        tasks: [{
          grunt: true,
          args: ['watch:frontend']
        }, {
          grunt: true,
          args: ['watch:web']
        }]
      },
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-compass');
  
  grunt.registerTask('web', 'launch webserver and watch tasks', [
    'parallel:web',
  ]);
  
  grunt.registerTask('default', ['web']);
};