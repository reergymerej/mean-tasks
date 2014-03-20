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

=======

# More Notes

## Make it yours
Changed db in all /config/env as well as app name
Changed title in /app/views/includes/head.html
Changed /public/views/index.html

## Alter model

I don't want to require a full name *and* a user name, so let's alter the user model.
Attempting to use TDD, let's change the test.  These tests are run with Mocha.

/test/mocha/user/model.js

Delete "name" from test user.
Delete the 'should show an error when try to save without name' test.
Run test `grunt mochaTest` -> failure!

Where is the validation happening?  /app/models/user.js
UserSchema is defined with a required "name".
Delete it from the schema and the *UserSchema.path('name').validate* validation.

Test again, `grunt mochaTest` -> green!

Write a test to check that there is no name field.
What is used to test the front-end?  Karma

How do you run the Karma tests?
    Check gruntfile.js
    `grunt karma`

How do we write a test to check for the absense of this field?
    All the existing specs are testing the controllers, not the view.  These are unit tests, not [E2E tests](http://docs.angularjs.org/guide/e2e-testing).

    It doesn't look like integration testing is set up in the MEAN stack and I don't want to mess with it right now.

[Year of Moo](http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html#karma) has a very good writeup on testing with Karma.


Remove the name field from `/app/views/users/signup.html`

## Update a field when another field is updated

You can do this by adding a pre hook. 
http://mongoosejs.com/docs/middleware.html

---

When you rename a Heroku app, it's best to do it from the CLI.