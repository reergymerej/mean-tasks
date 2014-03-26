'use strict';

var doingCategories = require('../controllers/doing-categories');

module.exports = function (app) {
    app.get('/doing-categories', doingCategories.list);
    app.post('/doing-categories', doingCategories.create);
    app.put('/doing-categories/:diongCategoryId', doingCategories.update);
    app.del('/doing-categories/:diongCategoryId', doingCategories.destroy);

    app.param('diongCategoryId', doingCategories.addCategoryToReq);
};