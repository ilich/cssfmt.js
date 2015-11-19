#! /usr/bin/env node

var fs = require("fs"),
	css = require("css"),
	commander = require("commander"),
	program = new commander.Command("cssfmt");
	
var cssfmt = (function() {
	function start() {
		// TODO
	}
	
	return {
		start: start
	};
})();

if (require.main === module) {
	cssfmt.start();
}