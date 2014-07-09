var myCodePrefix = 'Ext.define("MyApp.Config"';

var fs = require('fs');
var util = require('util');
var os = require('os');

fs.writeFile('../all-classes-tmp.js', util.format('console.info("JS build timestamp=%s");', (new Date()).toString()));
fs.appendFile('../all-classes-tmp.js', os.EOL);

// append locale.js
fs.appendFile('../all-classes-tmp.js', fs.readFileSync('../js/locale-min.js').toString());
fs.appendFile('../all-classes-tmp.js', os.EOL);

// append all-classes.js without ExtJS itself
var line = fs.readFileSync('../all-classes.js').toString();
fs.appendFile('../all-classes-tmp.js', line.substr(line.indexOf(myCodePrefix)));

fs.unlinkSync('../all-classes.js');
fs.renameSync('../all-classes-tmp.js', '../all-classes.js');
