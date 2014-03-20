'use strict';

// $resource is used for RESTful interactions
// REF: http://docs.angularjs.org/api/ngResource/service/$resource
angular.module('doing.tasks').factory('DoingTasks', ['$resource', function ($resource) {

    // 1st arg: url for resource
    // The :articleId will be replaced in if the operation specified an articleId to use.
    // EXAMPLE: Articles.get({ articleId: 123 }) will send the request to /articles/123
    
    // 2nd arg: default parameters
    // @_id tells the $resource to use its "_id" to populate :articleId in the requests.

    // 3rd arg: custom actions
    // The default actions for $resources are get, save, query, remove, and delete.
    // "update" is added for PUT operations.  "save" is for POSTs.
    return $resource('doing-tasks/:id',
        {
            id: '@_id'
        },
        {
            update: {
                method: 'PUT'
            }
        }
    );
}]);