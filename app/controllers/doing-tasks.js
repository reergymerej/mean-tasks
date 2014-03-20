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

    DoingTask.load(id, function (err, todoTask) {
        if (!err) {
            if (todoTask) {
                req.todoTask = todoTask;
                next();
            } else {
                return next(new Error('Failed to load todoTask ' + id));
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
    var todoTask = new DoingTask(req.body);

    // Really?  We're passing the hashed pw back to the client?!
    todoTask.user = req.user;

    todoTask.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                todoTask: todoTask
            });
        } else {
            res.jsonp(todoTask);
        }
    });
};

/**
* update a DoingTask
*/
exports.update = function (req, res) {
    var todoTask = req.todoTask;

    // merge the body contents with the todoTask
    // added by the helper (persisted task)
    todoTask = _.extend(todoTask, req.body);

    todoTask.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                todoTask: todoTask
            });
        } else {
            res.jsonp(todoTask);
        }
    });
};

/**
* Delete a DoingTask
*/
exports.destroy = function (req, res) {
    var todoTask = req.todoTask;

    todoTask.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                todoTask: todoTask
            });
        } else {
            res.jsonp(todoTask);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
* Renders a group of DoingTasks as JSON.
*/
exports.list = function (req, res) {

    var query = {};

    if (req.query.from) {
        query.created = {
            $gte: new Date(parseInt(req.query.from, 10))
        };
    }

    // REF: http://mongoosejs.com/docs/populate.html
    // REF: http://mongoosejs.com/docs/api.html#query_Query-sort
    DoingTask.find(query).sort('-created').populate('user').exec(function (err, todoTasks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(todoTasks);
        }
    });
};
