module.exports = function(grunt) {
  grunt.initConfig({
   sass: {
      options: {
        includePaths: [
          'src/bower_components/foundation/scss',
          'src/bower_components/font-awesome/scss'
        ]
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/styles.min.css': 'src/scss/styles.scss'
        }
      }
    },

    uglify: {
      dev: {
        options: {
          preserveComments: false,
          beautify: false,
          compress: true,
          mangle: false
        },
        files: {
          'assets/js/scripts.min.js': [
// jQuery
            'src/bower_components/foundation/js/vendor/jquery.js',
// Foundation
            'src/bower_components/foundation/js/foundation.js',
// Main Script
            'src/js/scripts.js'
          ]
        }
      }
    },
    
    processhtml: {
      options: {
        // Task-specific options go here. 
      },
      dist: {
        files: {
          'dest/app.html': ['src/html/app.html']
        }
      }
    },

    copy: {
      dist: {
        files: [
// Copy the Fonts
// Roboto
          {cwd: 'src/', expand: true, flatten: true, src: 'fonts/*', dest: 'assets/css/fonts/' },
// Font-Awesome
          {cwd: 'src/', expand: true, flatten: true, src: 'bower_components/font-awesome/fonts/*', dest: 'assets/css/fonts/' }
        ]
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

// HTML-minify currently trashes the Chrome App, so it is disabled for now.
// Until a configuration can be found that doesn't trash the HTML inside the included Javascript. (htmlmin ran after processhtml)
// Or a configuration which doesn't trash the HTML comments used by processhtml. (htmlmin ran before processhtml)
//  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['sass', 'uglify', 'copy']);
  grunt.registerTask('build', ['sass', 'uglify', 'copy']);
};