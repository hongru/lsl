#!/usr/bin/env node

var lsl = require('../index');
var program = require('commander');
var pkg = require('../package.json');
 
program
  .version(pkg.version)
  .option('-c, --collapse <dir1/,dir2/>', 'the dirs you want to collapse')
  .option('-n, --nochalk', 'no chalk decoration on dirs')
  .parse(process.argv);

if (!program.args.length) {
    program.args.push(process.cwd());
}
program.args.forEach(function (a) {
    var config = {};
    if (program.collapse) {
        config.collapseDirs = program.collapse.split(',');
    }
    if (program.nochalk) {
        config.noChalk = true;
    }
    console.log(lsl(a, config));
})
