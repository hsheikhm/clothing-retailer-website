module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: ['gruntfile.js', 'app/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    concat: {
      options: {
        separator: '\n// next file:\n'
      },
      dist: {
        src: ['app/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': ['app/css/app.css', 'app/css/animations.css']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/partials/category-page.html': 'app/partials/category-page.html',
          'dist/partials/home-page.html': 'app/partials/home-page.html',
          'dist/partials/items-ordered.html': 'app/partials/items-ordered.html',
          'dist/partials/mens-categories.html': 'app/partials/mens-categories.html',
          'dist/partials/products-list.html': 'app/partials/products-list.html',
          'dist/partials/shopping-cart-page.html': 'app/partials/shopping-cart-page.html',
          'dist/partials/womens-categories.html': 'app/partials/womens-categories.html'
        }
      }
    },

    watch: {
      app: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'htmlmin']);

};
