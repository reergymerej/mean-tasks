'use strict';

angular.module('doing.categories').factory('DoingCategories', ['$resource', function ($resource) {

    return $resource('doing-categories/:id',
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