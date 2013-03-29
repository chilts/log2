// ----------------------------------------------------------------------------

var util = require('util');
var fs = require('fs');
var os = require('os');

// ----------------------------------------------------------------------------

var level = {
    'debug' : 'DEBUG',
    'info'  : ' INFO',
    'warn'  : ' WARN',
    'error' : 'ERROR',
    'fatal' : 'FATAL',
};

var defaults = {
    timestamp : true,
    stream    : process.stdout,
    title     : false,
    pid       : false,
    hostname  : false,
};

function extend (a, b) {
    for (var x in b)
        a[x] = b[x];
    return a;
}

// ----------------------------------------------------------------------------
// filename, method, id
function log2(options) {
    var opts = extend({}, defaults);
    opts = extend(opts, options);

    var logger = function(msg, lvl, callback) {
        lvl = lvl || 'info';
        callback = callback || function() {};
        if ( typeof lvl === 'function' ) {
            callback = lvl;
            lvl = 'info';
        }

        // get either the filename, ::method or filename::method
        var program = ''
        if ( opts.title ) {
            program += process.title;
        }
        if ( opts.pid ) {
            program += (program ? '/' : '') + process.pid;
        }
        if ( opts.hostname ) {
            program += '@' + os.hostname();
        }

        var where = '';
        if ( opts.filename ) {
            where += opts.filename;
            if ( opts.method ) {
                where += '::' + opts.method;
            }
        }
        else {
            if ( opts.method ) {
                where += (where ? '::' : '') + opts.method;
            }
        }

        // create the log message
        var message = [];
        if ( opts.timestamp ) {
            message.push((new Date()).toISOString(), '-');
        }
        if ( opts.id ) {
            message.push('(' + opts.id + ')');
        }
        message.push(level[lvl] + ':');
        if ( program ) {
            message.push('{' + program + '}');
        }
        if ( where ) {
            message.push('[' + where + ']');
        }
        if ( typeof msg === 'string' ) {
            message.push(msg);
        }
        else {
            message.push(util.inspect(msg, false, null, false));
        }

        // write it out to the stream
        var longMsg = message.join(' ');
        opts.stream.write(longMsg + "\n", function(err) {
            if (err) return callback(err);
            callback(null, longMsg);
        });
    }

    logger.debug = function(msg) { logger(msg, 'debug'); }
    logger.info  = function(msg) { logger(msg, 'info' ); }
    logger.warn  = function(msg) { logger(msg, 'warn' ); }
    logger.error = function(msg) {
        logger(msg, 'error', function(err, longMsg) {
            console.warn(longMsg);
        });
    }
    logger.fatal = function(msg) {
        logger(msg, 'fatal', function(err, longMsg) {
            console.warn(longMsg);
        });
    }

    return logger;
};

// ----------------------------------------------------------------------------

module.exports = log2;

// ----------------------------------------------------------------------------
