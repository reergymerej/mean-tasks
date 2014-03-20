'use strict';

// $scope       This is created for each directive.
// $stateParams This comes from AngularUI Router.
// $location    http://docs.angularjs.org/guide/dev_guide.services.$location
// Global       /public/js/services/global.js
angular.module('todo.tasks').controller('TodoCtrl', ['$scope', '$filter', '$stateParams', '$location', 'Global', 'Tasks',
    function ($scope, $filter, $stateParams, $location, Global, Tasks) {

    // Give this controller's scope access to the Global values.
    $scope.global = Global;

    $scope.fromDate = '';
    $scope.taskDescription = '';
    $scope.tasks = [];

    $scope.filter = function () {
        var from = new Date($scope.fromDate);

        if (from.toString() === 'Invalid Date') {
            from = undefined;
        }

        $scope.find(from);
    };

    $scope.create = function () {

        // Create a new instance of the Articles $resource.
        // $resource allows for easy CRUD operations.
        // 
        // this === $scope
        // this.title and this.content are added to the scope
        // through ngModel in the view (/public/views/articles/create.html).
        var todoTask = new Tasks({

            // Load the values into the $resource.
            description: $scope.taskDescription
        });

        // Save the $resource.
        // REF: http://docs.angularjs.org/api/ngResource/service/$resource
        // If the XHR fails, the 2nd callback will run.
        todoTask.$save(function (response) {

            // response === article

            // Since the template uses native form validation ("required" attribute), it should
            // not be possible to submit without the required fields.
            // If it were possible, the response would contain response.errors
            // with the validation errors defined in /app/models/article.js.

            // All MongoDB items (AKA documents) have an
            // auto-generated _id field.
            // REF: http://docs.mongodb.org/manual/core/document/

            // Redirect to view the saved article.
            // REF: http://docs.angularjs.org/api/ng/service/$location
            // GOTO: /public/js/config.js (GET /articles/article_id)
            // $location.path('articles/' + response._id);
            if (response.errors) {
                console.error(response.errors);
            } else {
                $scope.tasks.unshift(response);
                $scope.taskDescription = '';
            }
        }, function (response) {
            console.error('oh, shit', response);
        });
    };

    // Delete a task.
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

    // Toggle the done state of a task.
    $scope.toggleDone = function (task) {
        task.$update(function () {
            

        }, function (http) {
            console.error('unable to update task', http);
        });
    };

    // This is called by the edit page. (/public/views/articles/edit.html)
    $scope.update = function () {
        var article = $scope.article;

        // QUESTION: What does this array do?
        // The updated array is sent to the server, but the model
        // doesn't have an updated field.  "updated" is not referenced
        // anywhere else on the client-side.
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        // PUT the updates.
        // REF: http://docs.angularjs.org/api/ngResource/service/$resource
        article.$update(function() {

            // Once updated, redirect to view the article.
            // GOTO: /public/js/config.js (GET /articles/articleId)
            $location.path('articles/' + article._id);
        });
    };

    // Find all tasks.
    /**
    * @param {Date} from
    */
    $scope.find = function (from) {

        var params = {
            from: from ? from.getTime() : undefined
        };

        var success = function (tasks) {
            $scope.tasks = tasks;
        };

        var failure = function () {
            console.error('unable to fetch tasks');
        };

        Tasks.query(params, success, failure);
    };

    // This finds a specific article by id.
    $scope.findOne = function() {

        // Use our Articles service.
        // "get" appears to be used instead of "query"
        // for fetching a specific record.
        // Articles.get({

        //     // Specify the "articleId" the resource should use.
        //     // Pull the value from $stateParams.  The $stateParams
        //     // value was set when the route was handled (/public/js/config.js).
        //     // GOTO: /public/js/services/articles.js to see how the articleId
        //     // is inserted into the url.
        //     articleId: $stateParams.articleId
        // }, function(article) {

        //     // Assign the article to the controller's scope.
        //     $scope.article = article;
        // });
    };
}]);