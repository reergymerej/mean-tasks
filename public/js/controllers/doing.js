'use strict';

// $scope       This is created for each directive.
// $stateParams This comes from AngularUI Router.
// $location    http://docs.angularjs.org/guide/dev_guide.services.$location
// Global       /public/js/services/global.js
angular.module('doing.tasks').controller('DoingCtrl', ['$scope', '$filter', '$stateParams', '$location', 'Global', 'DoingTasks',
    function ($scope, $filter, $stateParams, $location, Global, DoingTasks) {

    $scope.categories = 'dev|other|admin|meeting'.split('|').sort();
    $scope.taskCategory = undefined;

    // Give this controller's scope access to the Global values.
    // $scope.global = Global;

    $scope.fromDate = new Date();
    $scope.taskDescription = '';
    $scope.tasks = [];

    /**
    * Filter the list of tasks.
    */
    $scope.filter = function () {
        var from = new Date($scope.fromDate);

        if (from.toString() === 'Invalid Date') {
            from = undefined;
        }

        $scope.find(from);
    };

    /**
    * Create a new task.
    */
    $scope.create = function () {

        var doingTask = new DoingTasks({
            description: $scope.taskDescription,
            category: $scope.taskCategory
        });

        var success = function (response) {
            if (response.errors) {
                console.error(response.errors);
            } else {
                $scope.tasks.unshift(response);
                $scope.taskDescription = '';
            }
        };

        var failure = function (response) {
            console.error('oh, shit', response);
        };

        doingTask.$save(success, failure);
    };

    /**
    * Delete a task.
    */
    $scope.remove = function (task) {

        if (task) {
            task.$remove();

            for (var i in $scope.tasks) {
                if ($scope.tasks[i] === task) {
                    $scope.tasks.splice(i, 1);
                    break;
                }
            }
        }
    };

    /**
    * Finish a task.
    * @param {TodoTask} task
    */
    $scope.finishTask = function (task) {
        var success = function () {};

        var failure = function (http) {
            console.error('unable to update task', http);
        };
        
        task.done = true;
        task.$update(success, failure);
    };

    // // This is called by the edit page. (/public/views/articles/edit.html)
    // $scope.update = function () {
    //     var article = $scope.article;

    //     // QUESTION: What does this array do?
    //     // The updated array is sent to the server, but the model
    //     // doesn't have an updated field.  "updated" is not referenced
    //     // anywhere else on the client-side.
    //     if (!article.updated) {
    //         article.updated = [];
    //     }
    //     article.updated.push(new Date().getTime());

    //     // PUT the updates.
    //     // REF: http://docs.angularjs.org/api/ngResource/service/$resource
    //     article.$update(function() {

    //         // Once updated, redirect to view the article.
    //         // GOTO: /public/js/config.js (GET /articles/articleId)
    //         $location.path('articles/' + article._id);
    //     });
    // };

    /**
    * Find tasks.
    * @param {Date} from
    */
    $scope.find = function (from) {

        var params = {};

        from = $scope.fromDate;

        params = {
            from: from ? from.getTime() : undefined
        };

        var success = function (tasks) {
            $scope.tasks = tasks;
        };

        var failure = function () {
            console.error('unable to fetch tasks');
        };

        DoingTasks.query(params, success, failure);
    };

    // This finds a specific article by id.
    // $scope.findOne = function() {

    //     // Use our Articles service.
    //     // "get" appears to be used instead of "query"
    //     // for fetching a specific record.
    //     // Articles.get({

    //     //     // Specify the "articleId" the resource should use.
    //     //     // Pull the value from $stateParams.  The $stateParams
    //     //     // value was set when the route was handled (/public/js/config.js).
    //     //     // GOTO: /public/js/services/articles.js to see how the articleId
    //     //     // is inserted into the url.
    //     //     articleId: $stateParams.articleId
    //     // }, function(article) {

    //     //     // Assign the article to the controller's scope.
    //     //     $scope.article = article;
    //     // });
    // };
}]);