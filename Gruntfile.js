var config = {
    bower: 'bower_components/'
}

module.exports = function(grunt) {
  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    fileName: '<%= grunt.config.get("pkg").name.toLowerCase().replace(/ /g, "-") %>',
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
    watch: {
      styles: {
        files: ['assets/less/style.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  return grunt.registerTask('default', ['less']);

};