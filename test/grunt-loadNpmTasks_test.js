'use strict';

var Loader = require('../lib/grunt-loadNpmTasks.js');

exports['loadNpmTasks'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  '`extend` modifies Grunt instance methods': function(test) {
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
  },
};
