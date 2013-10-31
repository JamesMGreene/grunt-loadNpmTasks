# grunt-loadNpmTasks [![Build Status](https://secure.travis-ci.org/JamesMGreene/grunt-loadNpmTasks.png?branch=master)](http://travis-ci.org/JamesMGreene/grunt-loadNpmTasks)

A Node module (not a Grunt task itself) to help in loading NPM-based tasks without requiring a "package.json" file next to every Gruntfile.
To be used as an alternative to `grunt.loadNpmTasks`/`grunt.task.loadNpmTasks`.

## Getting Started
Install the module with: `npm install grunt-loadNpmTasks`

Within your Gruntfile (or Node.js code, if you are using Grunt programmatically), you can then do:

```js
var loader = require('grunt-loadNpmTasks')(grunt);  // Where `grunt` is an instance of Grunt
loader.loadNpmTasks('grunt-contrib-jshint');
```

Alternatively, you can have `grunt-loadNpmTasks` actually override Grunt's `loadNpmTasks` method:

```js
require('grunt-loadNpmTasks').extend(grunt);  // Where `grunt` is an instance of Grunt
grunt.loadNpmTasks('grunt-contrib-jshint');
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 James M. Greene  
Licensed under the MIT license.
