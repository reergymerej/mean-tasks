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
                $scope.categories.push(doingCategory);
                $scope.categories = sortCategories($scope.categories);
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
            $scope.categories = sortCategories(categories);
        };

        var failure = function () {
            console.error('unable to fetch categories');
        };

        DoingCategories.query(success, failure);
    };

    $scope.saveCategory = function (category) {
        var success = function () {};

        var failure = function (http) {
            console.error('unable to update category', http);
        };
        
        category.$update(success, failure);
    };

    $scope.delete = function (category) {

        var success = function () {
            var i;
            
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

    var sortCategories = function (categories) {
        return categories.sort(function (a, b) {
            var result = 0;
            if (a.name < b.name) {
                result = -1;
            } else if (b.name < a.name) {
                result = 1;
            }
            return result;
        });
    };
}]);
