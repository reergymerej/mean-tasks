'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    DoingTask = mongoose.model('DoingTask'),
    _ = require('lodash');

/**
* Find task by id
*/
exports.task = function (req, res, next, id) {

    DoingTask.load(id, function (err, doingTask) {
        if (!err) {
            if (doingTask) {
                req.doingTask = doingTask;
                next();
            } else {
                return next(new Error('Failed to load doingTask ' + id));
            }
        } else {
            return next(err);
        }
    });
};

/**
* Creates a new DoingTask.
*/
exports.create = function (req, res) {
    var doingTask = new DoingTask(req.body);

    // Really?  We're passing the hashed pw back to the client?!
    doingTask.user = req.user;

    doingTask.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                doingTask: doingTask
            });
        } else {
            res.jsonp(doingTask);
        }
    });
};

/**
* update a DoingTask
*/
exports.update = function (req, res) {
    var doingTask = req.doingTask;

    // merge the body contents with the doingTask
    // added by the helper (persisted task)
    doingTask = _.extend(doingTask, req.body);

    doingTask.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                doingTask: doingTask
            });
        } else {
            res.jsonp(doingTask);
        }
    });
};

/**
* Delete a DoingTask
*/
exports.destroy = function (req, res) {
    var doingTask = req.doingTask;

    doingTask.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                doingTask: doingTask
            });
        } else {
            res.jsonp(doingTask);
        }
    });
};

/**
 * Show an article
 */
// exports.show = function(req, res) {
//     res.jsonp(req.article);
// };

/**
* Renders a group of DoingTasks as JSON.
*/
exports.list = function (req, res) {

    var query = {};

    if (req.query.from) {
        query.start = {
            $gte: new Date(parseInt(req.query.from, 10))
        };
    }

    if (req.query.start) {
        query.start = {
            $gte: new Date(parseInt(req.query.start, 10))
        };
    }

    if (req.query.end) {
        query.end = {
            $lte: new Date(parseInt(req.query.end, 10))
        };
    }

    DoingTask.find(query)
    .sort('-start')
    .populate('user')
    .exec(function (err, todoTasks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(todoTasks);
        }
    });
};
