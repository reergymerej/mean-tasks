'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TodoTask = mongoose.model('TodoTask'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    TodoTask.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
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
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
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
