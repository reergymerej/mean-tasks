'use strict';

angular.module('doing.categories').controller('CategoriesCtrl', 
    ['$scope', 'DoingCategories', function ($scope, DoingCategories) {

    $scope.categories = [];

    $scope.init = function () {
        $scope.categories = [{name: 'a'}, {name: 'b'}];
        console.log(DoingCategories);
    };

}]);
