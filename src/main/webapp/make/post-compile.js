var myCodePrefix = 'Ext.define("MyApp.Config"';

var fs = require('fs');
var util = require('util');
var os = require('os');

fs.writeFile('../all-classes.js', util.format('console.info("JS build timestamp=%s");', (new Date()).toString()));
fs.appendFile('../all-classes.js', os.EOL);

// append locale.js
fs.appendFile('../all-classes.js', fs.readFileSync('../js/locale-min.js').toString());
fs.appendFile('../all-classes.js', os.EOL);

// append all-classes-tmp.js (all classes without ExtJS itself)
var line = fs.readFileSync('../all-classes-tmp.js').toString();
fs.appendFile('../all-classes.js', line.substr(line.indexOf(myCodePrefix)));

fs.unlinkSync('../all-classes-tmp.js');
fs.renameSync('../all-classes.js', '../all-classes.js');
