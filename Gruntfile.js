var config = {
    bower: 'bower_components/',
    dist: 'assets/dist/',
    css: 'assets/css/*.css',
    js_app:'assets/js/*.js'
}

module.exports = function(grunt) {
  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    fileName: '<%= grunt.config.get("pkg").name.toLowerCase().replace(/ /g, "-") %>',
    jsFiles:  
        [
            '<%= config.bower %>/jquery/dist/jquery.js',
            //'<%= config.bower %>/colorbox/jquery.colorbox.js',
            '<%= config.bower %>/isotope/dist/isotope.pkgd.js',
            '<%= config.bower %>/fancybox/source/jquery.fancybox.js'
        ],
    concat: {
      options: {
        banner: '/*! <%= fileName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        stripBanners: true
      },
      js_libs: {
        src: '<%= jsFiles %>',
        dest: '<%= config.dist %><%= fileName %>.libs.js'
      },
      js_app: {
        src: '<%= config.js_app %>',
        dest: '<%= config.dist %><%= fileName %>.app.js'
      },
      css: {
        src: '<%= config.css %>',
        dest: '<%= config.dist %><%= fileName %>.all.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= fileName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= config.dist %><%= fileName %>.libs.js',
        dest: '<%= config.dist %><%= fileName %>.libs.min.js'
      }
    },
    cssmin: {
      build: {
        src: '<%= config.dist %><%= fileName %>.all.css',
        dest: '<%= config.dist %><%= fileName %>.all.min.css'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          optimization: 2
        },
        files: {
          'assets/css/style.css': 'assets/less/style.less'
        }
      }
    },
    copy: {

    },
    watch: {
      styles: {
        files: ['assets/less/style.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      js_libs: {
        files: '<%= jsFiles %>',
        tasks: ['concat:js_libs']
      },
      js_app: {
        files: '<%= config.js_app %>',
        tasks: ['concat:js_app']
      },
      css: {
        files: '<%= config.css %>',
        tasks: ['concat:css', 'cssmin']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  return grunt.registerTask('default', ['concat', 'cssmin', 'less']);
};
