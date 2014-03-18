'use strict';

// Articles routes use todoTasks controller
var todoTasks = require('../controllers/todo-tasks');
var authorization = require('./middlewares/authorization');

// authorization helpers
var hasAuthorization = function (req, res, next) {
    if (req.todoTask.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/todo-tasks', todoTasks.all);
    app.post('/todo-tasks', authorization.requiresLogin, todoTasks.create);
    // app.get('/todo-tasks/:articleId', todoTasks.show);
    // app.put('/todo-tasks/:articleId', authorization.requiresLogin, hasAuthorization, todoTasks.update);
    app.del('/todo-tasks/:id', authorization.requiresLogin, hasAuthorization, todoTasks.destroy);

    // Finish with setting up the articleId param
    app.param('id', todoTasks.task);

};