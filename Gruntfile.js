module.exports = function(grunt) {
    "use strict";

    var sourceFolders = [
	"bower_components/**/src/**/*.purs",
	"bower_components/**/src/**/*.purs.hs",
	"src/PureScript/**/*.purs"
    ];

    grunt.initConfig({
	psc: {
	    options: {
		main: "BrissyParks",
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
