'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TodoTask = mongoose.model('TodoTask'),
    _ = require('lodash');


/**
* Find task by id
*/
exports.task = function(req, res, next, id) {

    TodoTask.load(id, function (err, todoTask) {
        if (!err) {
            if (todoTask) {
                req.todoTask = todoTask;
                next();
            } else {
                return next(new Error('Failed to load todoTask ' + id));
            }
        }

        return next(err);
    });
};

/**
* Creates a new TodoTask.
*/
exports.create = function (req, res) {
    var todoTask = new TodoTask(req.body);

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
 * Update an article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
* Delete a TodoTask
*/
exports.destroy = function(req, res) {
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
* Renders all TodoTasks as JSON.
*/
exports.all = function (req, res) {
    // REF: http://mongoosejs.com/docs/populate.html
    // REF: http://mongoosejs.com/docs/api.html#query_Query-sort
    TodoTask.find().sort('-created').populate('user').exec(function (err, todoTasks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(todoTasks);
        }
    });
};
