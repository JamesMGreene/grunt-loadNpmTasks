'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    watch: {
      all: {
        files: '<%= jshint.all %>',
        tasks: ['jshint']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

  // Task for Travis CI.
  grunt.registerTask('travis', ['jshint', 'nodeunit']);

};
