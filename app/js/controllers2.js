var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {
    $scope.items = [];
    $scope.resShowing = false;

    $http.get('json/quizzes.json').then(function(res) {
        $scope.items = res.data;
    });

    $scope.filters = [
        {name: 'goNext', filterExpr: ''},
        {name: 'goPrev', filterExpr: ''}
    ];
    $scope.selectedFilter = $scope.filters[0];

    $scope.setFilter = function (filter) {
        $scope.selectedFilter = filter;
    };

    $scope.setFilterGoNext = function (i) {
        $scope.selectedFilter = {name: 'goNext', filterExpr: {id: i}}
    };

    $scope.setFilterGoPrev = function (i) {
        $scope.selectedFilter = {name: 'goPrev', filterExpr: {id: i}}
    };

    $scope.selectedFilter = {name: 'goNext', filterExpr:{id: 1}}

    $scope.yourAnswer = function(itemId, i) {
        $scope.items[itemId - 1].ansGiven = i;

    }

    $scope.showResult = function() {

        if (!$scope.resShowing) {
            $http.get('json/answers.json').then(function(res) {
                for (i in res.data) {

                    for (j in $scope.items) {
                        if (res.data[i].qId == $scope.items[j].id) {
                            for (k in $scope.items[j].answers) {
                                if ($scope.items[j].answers[k].id == res.data[i].qId) {
                                    console.log($scope.items[j].answers[k].correct = 'ture')
                                }
                            }
                        }
                    }
                }
                $scope.resShowing = true;
            });
        } else {
            $scope.items = [];
            $http.get('json/quizzes.json').then(function(res) {
                $scope.items = res.data;
            });
            $scope.resShowing = false;
        }
    }



});

