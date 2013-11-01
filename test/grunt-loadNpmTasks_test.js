'use strict';

var Loader = require('../lib/grunt-loadNpmTasks.js');

exports['loadNpmTasks'] = {

  setUp: function(done) {
    // setup here
    done();
  },


  //
  //
  // Add test to verify that `Loader(grunt).loadNpmTasks` works as intended
  //
  //


  'Verify `extend` returns the original Grunt instance': function(test) {
    test.expect(1);

    // Arrange
    var grunt = require('grunt');

    // Act
    var result = Loader.extend(grunt);

    // Assert
    test.strictEqual(result, grunt, 'The `grunt` input to `extend` should also be returned as its output');
    test.done();
  },

  'Verify `extend` modifies the `loadNpmTasks` methods of the Grunt instance': function(test) {
    test.expect(2);

    // Arrange
    var grunt = require('grunt');
    var lnt1 = grunt.loadNpmTasks;
    var lnt2 = grunt.task.loadNpmTasks;

    // Act
    Loader.extend(grunt);

    // Assert
    test.notStrictEqual(grunt.loadNpmTasks, lnt1, '`grunt.loadNpmTasks` should have been modified');
    test.notStrictEqual(grunt.task.loadNpmTasks, lnt2, '`grunt.task.loadNpmTasks` should have been modified');
    test.done();
  }


  //
  //
  // Add test to verify that `Loader.extend(grunt) && grunt.loadNpmTasks` works as intended
  //
  //


  //
  //
  // Add test to verify that `Loader.extend(grunt) && grunt.task.loadNpmTasks` works as intended
  //
  //

};
