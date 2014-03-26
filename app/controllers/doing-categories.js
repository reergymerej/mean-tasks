'use strict';

var mongoose = require('mongoose'),
    DoingCategory = mongoose.model('Category'),
    _ = require('lodash');

var catchError = function (err, res) {
    if (err) {
        res.status(500).end('dang');
    }
};

exports.addCategoryToReq = function (req, res, next, id) {
    DoingCategory.load(id, function (err, doingCategory) {
        if (!err) {
            if (doingCategory) {
                req.doingCategory = doingCategory;
                next();
            } else {
                return next(new Error('Failed to load doingCategory ' + id));
            }
        } else {
            return next(err);
        }
    });
};

exports.create = function (req, res) {
    var doingCategory = new DoingCategory(req.body);

    doingCategory.save(function (err) {
        catchError(err, res);
        res.jsonp(doingCategory);
    });
};

exports.update = function (req, res) {
    var doingCategory = req.doingCategory;

    doingCategory = _.extend(doingCategory, req.body);

    doingCategory.save(function (err) {
        catchError(err, res);
        res.jsonp(doingCategory);
    });
};

exports.destroy = function (req, res) {
    var doingCategory = req.doingCategory;

    doingCategory.remove(function (err) {
        catchError(err, res);
        res.jsonp(doingCategory);
    });
};

exports.list = function (req, res) {

    var callback = function (err, doingCategories) {
        catchError(err, res);
        res.jsonp(doingCategories);
    };

    DoingCategory
        .find({})
        .sort('-start')
        .populate('user')
        .exec(callback);
};
