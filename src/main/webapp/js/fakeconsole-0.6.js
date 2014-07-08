// Written by anson@cht.com.tw to avoid IE 8/9 problem
// Version 0.6
(function () {
    // supported functions
    var functions = [ 'log', 'debug', 'info', 'warn', 'error', 'time', 'timeEnd' ];
        c = window.console;
    if (!c) {
        c = {};
        for (var i = 0; i < functions.length; i++) {
            c[functions[i]] = function() {};
        }
        window.console = c;
    } else {
        // if not defined time, but has console
        if (typeof(c.time) === "undefined") {
            c.mytimer = {};
            c.time = function(name) {
                if(!name) return;
                var start = (new Date()).getTime(),
                    key = name.toString();
                if (!c.mytimer[key])
                    c.mytimer[key] = start;
            };
            c.timeEnd = function(name) {
                if(!name) return;
                var end = (new Date()).getTime(),
                    key = name.toString(),
                    start = c.mytimer[key];
                if (start) {
                    console.log(name + ': ' + (end - start) + 'ms');
                    delete console.mytimer[key];
                }
            };
        }
        if (typeof(c.debug) === "undefined") {
            // must have log...
            c.debug = c.log;
        }
        if (typeof(c.exception) === "undefined") {
            c.exception = function(e) {
                if (e) {
                    if (e.stack) c.error(e.stack);
                    else c.error(e);
                }
            };
        }
        // For other functions
        for (var i = 0; i < functions.length; i++) {
            if (typeof(c[functions[i]]) === "undefined")
                c[functions[i]] = function() {};
        }
    }

    //backup for enableAll
    var backupFunctions = {};
    for (var i = 0; i < functions.length; i++) {
        backupFunctions[functions[i]] = c[functions[i]];
    }
    c.disable = function (name) {
        c[name] = function() {};
    };
    c.enable = function (name) {
        c[name] = backupFunctions[name];
    };
    c.disableAll = function () {
        for (var i = 0; i < functions.length; i++) {
            c[functions[i]] = function() {};
        }
    };
    c.enableAll = function () {
        for (var i = 0; i < functions.length; i++) {
            c[functions[i]] = backupFunctions[functions[i]];
        }
    };
})();
