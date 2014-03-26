'use strict';

angular.module('doing.categories').controller('CategoriesCtrl',
['$scope', 'DoingCategories', function ($scope, DoingCategories) {

    $scope.categoryName = '';
    $scope.categories = [];

    $scope.create = function () {
        var doingCategory = new DoingCategories({
            name: $scope.categoryName
        });

        var success = function (doingCategory) {
            if (doingCategory.errors) {
                console.error(doingCategory.errors);
            } else {
                $scope.categories.unshift(doingCategory);
                $scope.categoryName = '';
            }
        };

        var failure = function (http) {
            console.error(':(', http);
        };

        doingCategory.$save(success, failure);
    };

    $scope.read = function () {
        var success = function (categories) {
            $scope.categories = categories;
        };

        var failure = function () {
            console.error('unable to fetch categories');
        };

        DoingCategories.query(success, failure);
    };

    $scope.delete = function (category) {

        var success = function (categories) {
            var i;
            
            $scope.categories = categories;
            
            for (i in $scope.categories) {
                if ($scope.categories[i] === category) {
                    $scope.categories.splice(i, 1);
                    break;
                }
            }
        };

        var failure = function () {
            console.error('unable to delete category');
        };
        
        category.$remove(success, failure);

    };
}]);
