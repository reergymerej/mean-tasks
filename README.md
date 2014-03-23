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

### What's the RESTful way to deal with collections?
[REST collections](https://restful-api-design.readthedocs.org/en/latest/resources.html)
For now, I'm just going to add an optional "group by" param to the resource.
[mongo group](http://docs.mongodb.org/manual/reference/method/db.collection.group/)

console.log() doesn't work in MongoDB shell.  Use printjson.

### Group Example

    // given
    { "_id" : ObjectId("532d99ffb9c3d11b8d1a400a"), "a" : 1, "b" : 2 }
    { "_id" : ObjectId("532d9a0ab9c3d11b8d1a400b"), "a" : 7, "b" : 8 }
    { "_id" : ObjectId("532d9d74b9c3d11b8d1a400c"), "a" : 1, "b" : 99 }


    db.foo.group({
        key: {
            a: 1
        },
        reduce: function (currentDoc, aggregatedDoc) {
            aggregatedDoc.totalB += currentDoc.b;
        },
        initial: { totalB: 0 }
    });

    // produces
    [ { "a" : 1, "totalB" : 101 }, { "a" : 7, "totalB" : 8 } ]



    db.doingtasks.group({
        key: {
            category: 1,
            description: 1
        },
        cond: {
            done: {
                $ne: false
            }
        },
        reduce: function (currentDoc, aggregatedDoc) {
            var start = (new Date(currentDoc.start)).getTime(),
                end = (new Date(currentDoc.end)).getTime(),
                duration = end - start;

            aggregatedDoc.duration += duration;

        },
        initial: { duration: 0 }
    });

===

* I'm trying to get Mongoose to run the group operation and it's failing.  If I try "group", I get

    TypeError: Object function model(doc, fields, skipId) {
        if (!(this instanceof model))
          return new model(doc, fields, skipId);
        Model.call(this, doc, fields, skipId);
      } has no method 'group'

If I try, "aggregate", I get

    { [MongoError: no such cmd: aggregate]
      name: 'MongoError',
      errmsg: 'no such cmd: aggregate',
      'bad cmd': { aggregate: 'doingtasks', pipeline: [ [Object] ] },
      ok: 0 }

[Mongo Aggregation Intro](http://docs.mongodb.org/manual/aggregation/)

# Figuring out Group By

* Does the model have aggregate? - yes
* Find an example of it being used and adapt it.
** http://mongoosejs.com/docs/3.2.x/docs/api.html#model_Model-aggregate
* Does it work? - The function works and executes the callback, but an error is still thrown; MongoError: no such cmd: aggregate
* It's not a Mongoose error, since Mongoose is handling it correctly.
* What version of MongoDB did aggregate come from? - MongoDB 2.2 introduced a new aggregation framework,
* What version of MongoDB am I using?
** How do you find the version of MongoDB? - From the console, use db.version();
** I'm using 2.0.4.
* How can I upgrade to 2.2?
** http://docs.mongodb.org/manual/tutorial/upgrade-revision/
** http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
** http://askubuntu.com/questions/147135/how-can-i-uninstall-mongodb-and-reinstall-the-latest-version

It looks like the problem is the MongoDB that comes with Ubuntu is old.  I fumbled through installing MongoDB the first time, so who knows what's going on with the system now.  Lesson: Don't fumble around.

I purged everything using the directions [here](http://askubuntu.com/questions/147135/how-can-i-uninstall-mongodb-and-reinstall-the-latest-version) and reinstalled using the directions [here](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/).  Now we're on version 2.4.9.

mongo worked, but mongod died.  Exit out of all terminals and try again.  No dice.

Unable to create/open lock file: /data/db/mongod.lock

http://askubuntu.com/a/295576
* sudo rm /var/lib/mongodb/mongod.lock

That cleared the lock, but now I'm getting this, even after rebooting.
    Address already in use for socket: 0.0.0.0:27017

Maybe it's already running.  Try with the server.
- Sweet, looks like it *was* already running.

================================================

db.doingtasks.aggregate({
    $group: {
        _id: 'category',
        count: {
            $sum: 1
        }   
    }
});


{ "result" : [ { "_id" : "category", "count" : 5 } ], "ok" : 1 }


db.doingtasks.aggregate({
    $group: {
        _id: '$category',
        duration: {
            $sum: '$duration'
        },
        count: {
            $sum: 1
        }   
    }
});

{
    "result" : [
        {
            "_id" : "admin",
            "duration" : 314256,
            "count" : 2
        },
        {
            "_id" : "dev",
            "duration" : 310633,
            "count" : 4
        }
    ],
    "ok" : 1
}


TODO: 
# Explain the pieces of the aggregate function.