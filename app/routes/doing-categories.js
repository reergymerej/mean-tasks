'use strict';

var doingCategories = require('../controllers/doing-categories');

module.exports = function (app) {
    app.get('/doing-categories', doingCategories.list);
    app.post('/doing-categories', doingCategories.create);
    app.put('/doing-categories/:id', doingCategories.update);
    app.del('/doing-categories/:id', doingCategories.destroy);
};