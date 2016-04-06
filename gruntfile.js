module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options:{livereload:true},
      sass: {
        files: ['style/*.scss'],
        tasks: ['sass','concat','cssmin','uglify'],
      }
    },


    concat: {
        dist: {
            src: [
                'bower_components/bootstrap/js/affix.js',
                'bower_components/bootstrap/js/alert.js',
                'bower_components/bootstrap/js/button.js',
                'bower_components/bootstrap/js/carousel.js',
                'bower_components/bootstrap/js/collapse.js',
                'bower_components/bootstrap/js/dropdown.js',
                'bower_components/bootstrap/js/modal.js',
                'bower_components/bootstrap/js/tooltip.js',
                'bower_components/bootstrap/js/popover.js',
                'bower_components/bootstrap/js/scrollspy.js',
                'bower_components/bootstrap/js/tab.js',
                'bower_components/bootstrap/js/transition.js',
            ],
            dest: 'compiled/js/app.js'
        }
    },

    uglify: {
        dist: {
            files: {
                'compiled/js/app.min.js': 'compiled/js/app.js',
                'compiled/js/myscript.min.js': 'js/myscript.js'
            }
        }
    },

    sass: {
      dist: {
        files: {
          'compiled/style/style.css' : 'style/style.scss'
        }
      }
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'compiled/style',
          src: ['*.css', '!*min.css'],
          dest: 'compiled/style',
          ext: '.min.css'
        }]
      }
    },

    express: {
      all: {
        options: {
          port: 9000,
          hostname: 'localhost',
          bases: ['.'],
          livereload: true
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default',["sass","concat","uglify","cssmin"]);
  grunt.registerTask('compile',["sass","concat","uglify","cssmin"]);
  grunt.registerTask('server',["express","watch"]);
};
