# MEAN Tasks

This is an app you shouldn't be interested in.  It's just for me learning the MEAN stack.  I *probaby* also use it at work to keep track of things.

## Fun, npm Errors!

npm install results in

    npm ERR! peerinvalid The package karma-requirejs does not satisfy its siblings' peerDependencies requirements!
    npm ERR! peerinvalid Peer karma@0.10.10 wants karma-requirejs@~0.2.0

    npm ERR! System Linux 3.8.0-36-generic
    npm ERR! command "/usr/local/bin/node" "/usr/local/bin/npm" "install"
    npm ERR! cwd /home/grizzle/code/mean-tasks
    npm ERR! node -v v0.11.11-pre
    npm ERR! npm -v 1.3.22
    npm ERR! code EPEERINVALID
    npm ERR! 
    npm ERR! Additional logging details can be found in:
    npm ERR!     /home/grizzle/code/mean-tasks/npm-debug.log
    npm ERR! not ok code 0

As specified in the error, the full log is in ./npm-debug.log.

### What the hell is happening?

karma@0.10.10 wants karma-requirejs@~0.2.0

npm install karma keeps installing karma 0.10.10

Trying npm update...

Changed dependency in package.json to use karma-requirejs 0.2.0.

    npm update
    npm install

no dice

### How do you see what version of an npm module you have?

    npm -v karma-requirejs

I still have 1.3.22 for some reason.

### How do you uninstall a package?

    npm uninstall karma-requirejs
    npm install karma-requirejs@~0.2.0

I've tried this and npm -v still shows that I have the old version.
I uninstalled globally, which requires sudo, and it still thinks it's there.

### Clear npm Cache

    npm cache clean
    npm update

Well, it got further, but there was another error.  I finally just tried grunt and it's working.

Whatever.  :|

======

### Where do you change the app name?

Somehow, appName is populated in head.html from /config/env/development.js (app.name).  Apparently, lodash
doesn't extend recursively, so it's all or nothing.

In /config/express.js it is setting the app name from the config.
    app.use(helpers(config.app.name));

-----

I'm trying to resume this on my older machine, but nothing seems to be working.

* I have to `sudo` for npm.
* I'm getting the package errors again.
* `grunt` is not working

Let's see if we can update this sucker.