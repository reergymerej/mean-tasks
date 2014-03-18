'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    TodoTask = mongoose.model('TodoTask');

//Globals
var user;
var todoTask;

//The tests
describe('<Unit Test>', function() {
    describe('Model TodoTask:', function() {

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
                todoTask = new TodoTask({
                    user: user,
                    description: 'some description'
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function (done) {

                return todoTask.save(function (err) {
                    // REF: https://github.com/visionmedia/should.js/#chaining-assertions
                    should.not.exist(err);
                    done();
                });
            });

            it('should throw an error when saving without a user', function (done) {
                todoTask.user = undefined;

                return todoTask.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should throw an error when saving without a description', function (done) {
                todoTask.description = undefined;

                return todoTask.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });

        describe('fields', function () {
            it('should not be done by default', function (done) {
                todoTask.should.have.property('done', false);
                done();
            });

            it('should set done to true when setting the end date', function (done) {
                todoTask.end = new Date();

                return todoTask.save(function (err, task) {
                    task.should.have.property('done', true);
                    done();
                });
            });

            it('should have a created date', function (done) {
                todoTask.should.have.property('created');
                done();
            });

            it('should have a description', function (done) {
                todoTask.should.have.property('description');
                done();
            });
        });

        // This runs after each test.
        // It appears to errantly remove ALL
        // of the articles and users.
        afterEach(function(done) {
            user.remove(function () {
                done();
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