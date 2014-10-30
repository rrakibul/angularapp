var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {
    $scope.items = [];
    $scope.corrects = [];

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

    $scope.selectedFilter = {name: 'goNext', filterExpr: {id: 1}}

    $scope.yourAnswer = function(itemId, i) {
        $scope.items[itemId - 1].ansGiven = i;

    }

    $scope.showAnswers = function(itemId, i) {
        $http.get('json/answers.json').then(function(res) {
            $scope.corrects = res.data;
            var i = 0;
            for (x in $scope.corrects) {
                console.log($scope.corrects[x])
                $scope.items[i].correct = $scope.corrects[x]['correct'];
                i++;
            }
            $scope.corrects = [];
        });
    }
});

