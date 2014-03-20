'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    DoingTask = mongoose.model('DoingTask');

//Globals
var user;
var doingTask;

//The tests
describe('<Unit Test>', function() {
    describe('Model DoingTask:', function() {

        // Before each test, create a new user and
        // save it.  We need this because the article
        // requires an associated user.  This happens
        // before each "it" function.
        beforeEach(function (done) {

            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function () {
                doingTask = new DoingTask({
                    user: user,
                    description: 'some description',
                    category: 'some category'
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function (done) {

                return doingTask.save(function (err) {
                    // REF: https://github.com/visionmedia/should.js/#chaining-assertions
                    should.not.exist(err);
                    done();
                });
            });

            it('should throw an error when saving without a user', function (done) {
                doingTask.user = undefined;

                return doingTask.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should throw an error when saving without a description', function (done) {
                doingTask.description = undefined;

                return doingTask.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should set "done" to true when setting end', function (done) {
                doingTask.end = new Date();
                return doingTask.save(function (err) {
                    doingTask.should.have.property('done', true);
                    done();
                });
            });
        });

        describe('fields', function () {
            
            it('should have a start date', function (done) {
                doingTask.should.have.property('start');
                done();
            });

            it('should have a description', function (done) {
                doingTask.should.have.property('description');
                done();
            });

            it('done should be false by default', function (done) {
                doingTask.should.have.property('done', false);
                done();
            });
        });

        describe('deleting', function () {

            it('should remove without any problems', function (done) {
                var _id = doingTask._id;

                doingTask.remove(function () {
                    DoingTask.find({ _id: _id }, function (err, doingTasks) {
                        doingTasks.should.have.length(0);
                        done();
                    });
                });
            });
        });

        // This runs after each test.
        afterEach(function(done) {
            doingTask.remove(function () {
                user.remove(function () {
                    done();
                });
            });
        });
        after(function(done) {
            // QUESTION: What's with the exec?
            // It looks like you can do remove(fn) or remove().exec
            // to differentiate between async/sync processes.
            // We'll learn more about this when we brush up
            // on MongoDB.
            // REF: http://stackoverflow.com/a/10266789/1319850
            // User.remove().exec();
            done();
        });
    });
});