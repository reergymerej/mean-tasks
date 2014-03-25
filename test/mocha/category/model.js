'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category');

//Globals
var category;

//The tests
describe('<Unit Test>', function() {
    describe('Model Category:', function() {
        before(function(done) {
            category = new Category({
                name: 'test category'
            });

            done();
        });

        describe('Method Save', function() {
            it('should begin without the test category', function (done) {
                Category.find({ name: 'test category'}, function (err, categories) {
                    categories.should.have.length(0);
                    done();
                });
            });

            it('should throw an error when saving without a name', function (done) {
                category.name = null;
                category.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to save', function (done) {
                category.name = 'now I have a name';
                category.save(function (err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should fail when trying to save a duplicate', function (done) {

                category.save(function (err, category) {
                    var dupe = new Category({
                        name: category.name
                    });

                    dupe.save(function (err) {
                        err.should.have.property('code', 11000);
                        done();
                    });
                });
            });
        });

        after(function(done) {
            category.remove(function () {
                done();
            });
        });
    });
});
