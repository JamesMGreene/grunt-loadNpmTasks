/*
 * grunt-task-loader
 * https://github.com/JamesMGreene/grunt-task-loader
 *
 * Copyright (c) 2013 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');


/**
* A Node module (not a Grunt task itself) to help in loading NPM-based tasks without requiring a "package.json"
* file next to every Gruntfile. To be used as an alternative to `grunt.loadNpmTasks`/`grunt.task.loadNpmTasks`.
*/
function GruntTaskLoader(grunt) {
  // Don't require the `new` keyword
  if (!(this instanceof GruntTaskLoader)) {
    return new GruntTaskLoader(grunt);
  }

  // Validate the input
  if (!
      (
        grunt &&
        typeof grunt.loadNpmTasks === 'function' &&
        grunt.task && typeof grunt.task.loadNpmTasks === 'function' &&
        grunt.file && typeof grunt.file.findup === 'function'
      )
  ) {
    throw new TypeError('The `grunt` argument did not match expectations');
  }

  // Save references to the Grunt instance's original `loadNpmTasks` method definition
  var _grunt_loadNpmTasks = grunt.loadNpmTasks;

  this.loadNpmTasks = function(name) {
    var requiredFile, folderIndex, filepath,
        modulePartialPath = 'node_modules/' + name;
    try {
      requiredFile = require.resolve(name);
    }
    catch (e) {
      requiredFile = null;
    }

    if (requiredFile &&
        requiredFile.length > modulePartialPath.length &&
        (
          (folderIndex = requiredFile.indexOf(modulePartialPath)) &&
          folderIndex !== -1 &&
          (
            folderIndex === (requiredFile.length - modulePartialPath.length) ||
            requiredFile.charAt(folderIndex + modulePartialPath.length) === '/'
          )
        )
    ) {
      filepath = requiredFile.slice(0, folderIndex + modulePartialPath.length);
    }
    else {
      // TODO: Verify the initial `require.resolve` approach should already cover this whole scenario. If so, remove the `findup` dependency.
      filepath = grunt.file.findup(modulePartialPath, {
        cwd: path.resolve('node_modules', name),
        nocase: true
      });
    }

    // If we found a magically hidden version of this Node module while ignoring "package.json" files
    if (filepath) {
      _grunt_loadNpmTasks.call(grunt, path.relative(path.resolve('node_modules'), filepath));
    }
    else {
      // Let Grunt do its thing and hope for the best (e.g. that there is a "gruntcollection" at play)
      _grunt_loadNpmTasks.call(grunt, name);
    }
  };
  this.loadNpmTasks.bind(this);
}

/**
* Override a Grunt instance's `loadNpmTasks` methods.
*/
GruntTaskLoader.extend = function(grunt) {
  if (grunt) {
    var loader = GruntTaskLoader(grunt);

    if (typeof grunt.loadNpmTasks === 'function') {
      grunt.loadNpmTasks = loader.loadNpmTasks;
    }
    if (grunt.task && typeof grunt.task.loadNpmTasks === 'function') {
      grunt.task.loadNpmTasks = loader.loadNpmTasks;
    }
  }
  return grunt;
};


// Export
module.exports = GruntTaskLoader;
