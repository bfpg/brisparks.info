module.exports = function(grunt) {
    "use strict";

    var sourceFolders = [
	"src/PureScript/**/*.purs",
	"bower_components/**/src/**/*.purs",
	"bower_components/**/src/**/*.purs.hs"
    ];

    grunt.initConfig({
	psc: {
	    options: {
		main: "Main",
		modules: ["Main"]
	    },
	    all: {
		src: sourceFolders,
		dest: "static/Main.js"
	    }
	},
	dotPsci: {
	    all: {
		src: sourceFolders
	    }
	}
    });

    grunt.loadNpmTasks("grunt-purescript");

    grunt.registerTask("default", ["psc:all", "dotPsci:all"]);
};
