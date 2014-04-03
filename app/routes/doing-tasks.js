'use strict';

// Articles routes use doingTasks controller
var doingTasks = require('../controllers/doing-tasks');
var authorization = require('./middlewares/authorization');

// authorization helpers
var hasAuthorization = function (req, res, next) {
    if (req.doingTask.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/doing-tasks', doingTasks.list);
    app.post('/doing-tasks', authorization.requiresLogin, doingTasks.create);
    app.get('/doing-tasks/:doingTaskId', doingTasks.show);
    app.put('/doing-tasks/:doingTaskId', authorization.requiresLogin, hasAuthorization, doingTasks.update);
    app.del('/doing-tasks/:doingTaskId', authorization.requiresLogin, hasAuthorization, doingTasks.destroy);

    // Finish with setting up the articleId param
    app.param('doingTaskId', doingTasks.task);
};