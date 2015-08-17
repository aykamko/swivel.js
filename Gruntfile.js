var configureGrunt = function(grunt) {
  var npmTasks = [
    'grunt-babel',
    'grunt-contrib-watch',
  ];
  for (var i = 0; i < npmTasks.length; i++) {
    grunt.loadNpmTasks(npmTasks[i]);
  }

  grunt.initConfig({
    watch: {
      scripts: {
        files: 'src/swivel.js',
        tasks: 'babel',
      },
    },
    babel: {
      options: {
        sourceMap: 'both',
      },
      dist: {
        files: {
          'dist/swivel.js': 'src/swivel.js',
        },
      },
    },
  });

  grunt.registerTask('default', ['babel'])
}

module.exports = configureGrunt;
