module.exports = function(grunt) {

  var config = require('load-grunt-config')(grunt, {
    configPath: 'tasks/options',
    init: false
  });

  grunt.loadTasks('tasks');

  this.registerTask('default', ['build']);

  this.registerTask('build', 'Builds a distributable version of <%= cfg.name %>', [
    'clean',
    'set-production-env',
    'broccoli:build:dist',
    'clear-env',
    'jshint'
  ]);

  this.registerTask('server', 'Serves the tests', [
    'set-test-env',
    'broccoli:serve',
    'clear-env'
  ]);


  grunt.registerTask('set-production-env', 'Sets broccoli environment to production.', function() {
    process.env.BROCCOLI_ENV = 'production';
  });


  grunt.registerTask('set-test-env', 'Sets broccoli environment to test.', function() {
    // development instead of test because broccoli-env only supports [development, test]
    process.env.BROCCOLI_ENV = 'development';
  });

  grunt.registerTask('clear-env', 'Clears broccoli env', function() {
      process.env.BROCCOLI_ENV = null;
  });


  // Custom YUIDoc task
  this.registerTask('docs', ['yuidoc']);

  config.env = process.env;
  config.pkg = grunt.file.readJSON('package.json');

  // Load custom tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Merge config into emberConfig, overwriting existing settings
  grunt.initConfig(config);
};
