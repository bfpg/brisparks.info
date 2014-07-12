module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        coffee: {
            compile: {
                files: {
                    'static/Main.js': ['src/CoffeeScript/*.coffee'],
                },
            },
        },
        watch: {
            scripts: {
                files: "src/CoffeeScript/*.coffee",
                tasks: ['coffee:compile'],
                options: {
                    spawn: false
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');

    grunt.registerTask("default", ['coffee:compile']);
};
