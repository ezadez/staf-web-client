/*jslint node: true*/
"use strict";

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower:{
      install:{
        options:{
          install:true,
          layout: 'byType',
          copy:false,
          targetDir:'./libs',
          cleanTargetDir:false
        }
      }
    }, // end of bower

    jshint:{
      options: {
        globals : {
          $:false,
          jQuery: false,
          navigator:false
        },
        devel:true
      },
      all:['Gruntfile.js','app/*.js','app/**/*.js']
    }, // end of jshint

    karma:{
      options:{
        configFile:'config/karma.conf.js'
      },
      unit:{
        singleRun:true
      },
      continuous:{
        singleRun:false,
        autoWatch:true
      }
    }, // end of karma

    html2js:{
      dist:{
        src:['app/templates/**/*.html'],
        dest:'tmp/templates.js'
      }
    }, // end of html2js

    concat:{
      options:{
        separator: ";"
      },
      dist: {
        src: ['app/js/*.js', 'tmp/*.js'],
        dest: 'dist/app/js/app.js'
      }
    }, // end of concat

    uglify:{
      dist:{
        files: {
          'dist/app/js/app.js':['dist/app/js/app.js']
        },
        options:{
          mangle: false  //One thingto know is that, when using AngularJS you have to disable the mangle option, since injection goes fail.
        }
      }
    }, // end of uglify

    clean:{
      temp: {
        src: ['tmp']
      }
    }, // end of clean

    watch:{
      dev: {
        files: ['Gruntfile.js','app/js/*.js','app/view/**/*.html','app/templates/**/*.html'],
        //tasks: ['copy','jshint','karma:unit','html2js:dist','concat:dist','clean:temp'],
        tasks: ['jshint', 'karma:unit', 'casperjs', 'copy:main', 'clean:temp'],
        options: {
          atBegin: true
        }
      }, // end of dev
      min: {
        files: ['Gruntfile.js','app/js/*.js','app/view/**/*.html','app/templates/**/*.html'],
        tasks: ['jshint', 'karma:unit', 'casperjs', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist'],
        options: {
          atBegin: true
        }
      }
    }, // end of watch

    connect: {
      server: {
        options: {
          host: 'localhost',
          port: 9090
        }
      }
    }, // end of connect

    compress: {
      dist: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          {
            src: ['app/js/**','app/templates/**','app/view/**','assets/**','libs/**'], dest: '/'
          }
        ]
      } // end of dist
    }, // end of compress
    copy: {
      main: {
        files: [
          {expand: true, src: ['app/view/*'], dest: 'dist/'},
          {expand: true, src: ['app/view/**/*'], dest: 'dist/'},
          {expand: true, src: ['app/js/*'], dest: 'dist/'},
          {expand: true, src: ['app/templates/**'], dest: 'dist/'},
          {expand: true, src: ['libs/**/*.min.js','libs/**/*.js', 'libs/**/*.css', 'libs/**/*.min.css'], dest: 'dist/'},
          {expand: true, src: ['libs/**/*.min.js.map', 'libs/**/*.min.map'], dest: 'dist/'},
          {expand: true, src: ['assets/**'], dest: 'dist/'},
          {expand: true, src: ['app/**'], dest: '/Users/KORLM-yyoo/DEV/java/apache-tomcat-8.0.21/webapps/staf-web-client'},
          {expand: true, src: ['assets/**'], dest: '/Users/KORLM-yyoo/DEV/java/apache-tomcat-8.0.21/webapps/staf-web-client'},
          {expand: true, src: ['libs/**'], dest: '/Users/KORLM-yyoo/DEV/java/apache-tomcat-8.0.21/webapps/staf-web-client'}
        ]
      }
    },  // end of copy
    casperjs : {
      options: {
        caspserjsOptions : ['--verbos', '--log-level=debug'],
        async: {
          parallel : false  // If tests are independent, you can run them in parallel.
        }
      },
      files : ['tests/casperjs/*.js']
    } // end of casperjs
  });

  /** loadNpmTasks **/
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  //grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-casperjs');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  /** register task **/
  grunt.registerTask('dev',['bower', 'connect:server', 'watch:dev']);
  grunt.registerTask('test',['bower', 'jshint', 'karma:continuous' ]);
  grunt.registerTask('minified',['bower', 'connect:server', 'watch:min' ]);
  grunt.registerTask('package',['bower', 'jshint', 'karma:unit', 'html2js:dist','concat:dist', 'uglify:dist', 'clean:temp', 'compress:dist' ]);
};
