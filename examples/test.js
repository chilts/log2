// ----------------------------------------------------------------------------

var log2 = require('../log2');
process.title = 'test';

// ----------------------------------------------------------------------------

function logThese(log) {
    log('This is a log message, which defaults to info');
    log.info('Same level as the line above');
    log.debug('Debug level');
}

// ----------------------------------------------------------------------------

logThese( log2({ id : parseInt(Math.random() * 1000, 10) }) );
logThese( log2({ filename : __filename }) );
logThese( log2({ method : 'start' }) );
logThese( log2({ title : true, method : 'start' }) );
logThese( log2({ hostname : true, filename : __filename }) );
logThese( log2({ pid : true }) );
logThese( log2({ pid : true, title : true }) );
logThese( log2({ title : true, hostname : true }) );
logThese( log2({ pid : true, title : true, hostname : true }) );
logThese( log2({
    pid       : true,
    title     : true,
    hostname  : true,
    timestamp : true,
    method    : 'start',
    filename  : __filename,
    id        : parseInt(Math.random() * 1000, 10),
}) );

// ----------------------------------------------------------------------------
