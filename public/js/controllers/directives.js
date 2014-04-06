'use strict';

angular.module('tests.directives').controller('DirectiveCtrl', [
    '$scope',
    function ($scope) {

        var a = 'a'.charCodeAt(0);

        var makeFoos = function (count) {
            var foos = [],
                i = 0;

            for (; i < count; i++) {
                foos.push({
                    name: String.fromCharCode(a + i),
                    value: i
                });
            }

            return foos;
        };

        $scope.foo = 'the foo';

        $scope.funkyDoodle = 123;
        $scope.donkeyTown = 987;

        $scope.theFoos = makeFoos(7);

        $scope.rando = function (val) {
            $scope[val] = Math.random();
        }

        $scope.outerScopeA = 111;
    }
]);