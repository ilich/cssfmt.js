#!/usr/bin/env node

"use strict";

var fs = require("fs"),
	css = require("css"),
	commander = require("commander"),
	program = new commander.Command("cssfmt");
	
var cssfmt = (function() {
	
	function main() {
		program
			.version("0.0.1")
			.description("Apply CSS formatting guidelines to a file")
			.usage("[options] file")
			.option("-t, --tabs", "use tabs instead of spaces for indentation")
			.option("-i, --indent <size>", "set indentation size. The option is ignored if -t switch has been used.", 4);
			
		program.parse(process.argv);
		if (program.args.length === 0) {
			program.outputHelp();
			return;
		}
		
		applyCssGuidelines();
	}
	
	function applyCssGuidelines() {
		var cssFile = program.args[0];
		if (!fs.existsSync(cssFile)) {
			console.log("error: %s is not found", cssFile);
			return;
		}
		
		var content = fs.readFileSync(cssFile, "utf8");
		var ast = css.parse(content);
		var indent = "";
		if (program.tabs) {
			indent = "\t";
		} else {
			for (var i = 0; i < program.indent; i++) {
				indent += " ";
			}
		}
		
		content = css.stringify(ast, {
			indent: indent
		});
		
		fs.writeFileSync(cssFile, content);
		console.log("DONE.")
	}
	
	return {
		start: main
	};
	
})();

if (require.main === module) {
	cssfmt.start();
}