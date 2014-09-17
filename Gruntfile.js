module.exports = function(grunt) {

  grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),
    watch: {
      less: {
        files: 'public/less/**/*.less',
        tasks: ['less:development']
      }
    },
    less: {
      development: {
        files: {
          'public/css/bootstrap.css': 'public/less/bootstrap.less'
        },
        options: {
          sourceMap: true
        }
      }
    },
    supervisor: {
      development: {
        script: 'server.js',
        options: {
          // args: [ 'dev' ]
          watch: ['server.js'],
          // ignore: [ 'test' ],
          // pollInterval: 500,
          extensions: ['js', 'json'],
          // exec: 'node',
          // debug: true,
          // debugBrk: true,
          // harmony: true
          // noRestartOn: 'exit',
          // forceWatch: true,
          // quiet: true,
          forceSync: true // Cooperate with watch task
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-supervisor');

  grunt.registerTask('default', [
    'less:development',
    'supervisor:development',
    'watch:less'
  ]);

};