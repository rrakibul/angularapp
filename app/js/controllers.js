'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope, $http) {
    $http.get('json/json.json').success(function(data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';
});