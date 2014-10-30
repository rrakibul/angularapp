'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope, $http) {
    $http.get('json/quizzes.json').success(function(data) {
        $scope.phones = data;
    });

});