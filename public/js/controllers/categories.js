'use strict';

angular.module('doing.categories').controller('CategoriesCtrl',
['$scope', 'DoingCategories', function ($scope, DoingCategories) {

    $scope.categoryName = '';
    $scope.categories = [];

    $scope.init = function () {

        var success = function (categories) {
            $scope.categories = categories;
        };

        var failure = function () {
            console.error('unable to fetch tasks');
        };

        DoingCategories.query(success, failure);
    };

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

}]);
