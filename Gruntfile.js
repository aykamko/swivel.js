var configureGrunt = function(grunt) {
  var npmTasks = [
    'grunt-es6-module-transpiler',
    'grunt-contrib-watch',
  ];
  for (var i = 0; i < npmTasks.length; i++) {
    grunt.loadNpmTasks(npmTasks[i]);
  }

  grunt.initConfig({
    watch: {
      scripts: {
        files: 'src/swivel.js',
        tasks: 'transpile',
      },
    },
    transpile: {
      main: {
        type: 'globals',
        files: {
          'dist/swivel.js': 'src/swivel.js',
        },
      },
    },
  });

  grunt.registerTask('default', ['transpile'])
}

module.exports = configureGrunt;
