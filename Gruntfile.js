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
          'assets/css/styles.min.css': 'src/scss/styles.scss',
          'src/html/_includes/assets/css/index-atf.min.css': 'src/scss/index-atf.scss',
          'src/html/_includes/assets/css/conversion-rate-optimisation-atf.min.css': 'src/scss/conversion-rate-optimisation-atf.scss',
          'src/html/_includes/assets/css/conversion-rate-optimisation-enquiry-atf.min.css': 'src/scss/conversion-rate-optimisation-enquiry-atf.scss',
          'src/html/_includes/assets/css/pay-per-click-marketing-atf.min.css': 'src/scss/pay-per-click-marketing-atf.scss',
          'src/html/_includes/assets/css/pay-per-click-marketing-enquiry-atf.min.css': 'src/scss/pay-per-click-marketing-enquiry-atf.scss',
          'src/html/_includes/assets/css/website-design-atf.min.css': 'src/scss/website-design-atf.scss',
          'src/html/_includes/assets/css/website-design-enquiry-atf.min.css': 'src/scss/website-design-enquiry-atf.scss'
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
    
    imagemin: {                           // Task 
      dist: {                             // Target 
        options: {                        // Target options 
          optimizationLevel: 7,
          svgoPlugins: [{ removeViewBox: false }],
//          use: [mozjpeg()]
        },
        files: [{
          expand: true,                   // Enable dynamic expansion 
          cwd: 'src/images/',             // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'],    // Actual patterns to match 
          dest: 'assets/images/'          // Destination path prefix 
        }]
      }
    },

    copy: {
      dist: {
        files: [
// Copy the Fonts
// Roboto
          {cwd: 'src/', expand: true, flatten: true, src: 'fonts/*', dest: 'assets/fonts/' },
// Font-Awesome
          {cwd: 'src/', expand: true, flatten: true, src: 'bower_components/font-awesome/fonts/*', dest: 'assets/fonts/' }
        ]
      }
    },

    processhtml: {
      options: {
        data: { },
        recursive: true
      },
      dist: {
        files: {
          'index.html': ['src/html/index.html'],
          'conversion-rate-optimisation/index.html': ['src/html/conversion-rate-optimisation/index.html'],
          'conversion-rate-optimisation/enquiry/index.html': ['src/html/conversion-rate-optimisation/enquiry/index.html'],
          'conversion-rate-optimisation/enquiry/completed/index.html': ['src/html/conversion-rate-optimisation/enquiry/completed/index.html'],
          'pay-per-click-marketing/index.html': ['src/html/pay-per-click-marketing/index.html'],
          'pay-per-click-marketing/enquiry/index.html': ['src/html/pay-per-click-marketing/enquiry/index.html'],
          'pay-per-click-marketing/enquiry/completed/index.html': ['src/html/pay-per-click-marketing/enquiry/completed/index.html'],
          'website-design/index.html': ['src/html/website-design/index.html'],
          'website-design/enquiry/index.html': ['src/html/website-design/enquiry/index.html'],
          'website-design/enquiry/completed/index.html': ['src/html/website-design/enquiry/completed/index.html']
        }
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-processhtml');

// HTML-minify currently trashes the Chrome App, so it is disabled for now.
// Until a configuration can be found that doesn't trash the HTML inside the included Javascript. (htmlmin ran after processhtml)
// Or a configuration which doesn't trash the HTML comments used by processhtml. (htmlmin ran before processhtml)
//  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['sass', 'uglify', 'imagemin', 'copy', 'processhtml']);
  grunt.registerTask('build', ['sass', 'uglify', 'imagemin', 'copy', 'processhtml']);
};