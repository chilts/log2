Log2 - Customisable logger where most things are optional.

# Log2 #

Unfortunately loggers are very personal and people like what they like. I like this one. You might too.

## Example ##

```
var log2 = require('log2');

# options
var log = log2();
var logWithFilename = log2({ filename : __filename });
var logWithProcessInfo = log2({ title : true, pid : true, hostname : true });
var logToStream = log2({ stream : fs.createWriteStream('filename.log') });
```

Once you have set up your log object, you can call it with your messages:

```
# log() is the same as log.info()
log('This is a log message, which defaults to info');

# levels
log.debug('Used for Debugging');
log.info('Regularly info messages');
log.warn('Let the user know that something needs looking at');
log.error('Interestingly, somewhere went wrong');
log.fatal('Something went badly wrong');
```

Outputs:

```
# simple line, just log.info()
2013-03-29T03:15:32.458Z -  INFO: This is a log message, which defaults to info

# this line has an ID
2013-03-29T03:15:32.458Z - (259)  INFO: This is a log message, which defaults to info

# this line shows the program title, pid and hostname
2013-03-29T03:45:23.811Z -  INFO: {test-log2/16982@cheetah} Same level as the line above

# this shows the filename and method
2013-03-29T03:45:23.812Z -  INFO: [/home/chilts/src/chilts-log2/examples/t2.js::start] Same level as the line above

# this shows an id, program title, pid, hostname, filename and method
2013-03-29T03:45:23.812Z - (804)  INFO: {test-log2/20795@cheetah} [/home/chilts/src/chilts-log2/examples/t2.js::start] Same level as the line above
```

## General Format ##

```
timestamp - (id) LEVEL: {title/pid@hostname} [filename::method] Message
```

If anything in the group is not wanted, then the rest of the group still shows. e.g. ```{title@hostname}``` even if the
pid isn't required. However, if none of title, pid and hostname is required, the braces also get left out.

## Options ##

### timestamp ###

Default: true

Whether to show or not show the timestamp of the log.

### stream ###

Default: process.stdout

The stream to output messages to. Must have a ```.write()``` method.

### filename ###

Pass in the current filename so you can log it too. e.g.

```
var log = log2({ filename : __filename });
```

### method ###

Pass in the current method so you can log it too. e.g.

```
var log = log2({ method : 'makeServer' });
```

### id ###

Pass in an 'id' so we can see which log lines relate to others. e.g. usually used with things like ```connect-flake```
or ```connect-uuid``` to attach an ID to a request.

```
app.use(connectFlake());
app.use(function(req, res, next) {
    req.log = log2({ id : req.flake });
    req.log('This is an info message with a unique ID for this request');
    next();
});
```

### title ###

Default: false

Shows the process.title.

### pid ###

Default: false

Shows the process.pid.

### hostname ###

Default: false

Shows the hostname the program is running on.

# Author #

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

# License #

* [Copyright 2013 Andrew Chilton.  All rights reserved.](http://chilts.mit-license.org/2013/)

(Ends)
