var app = angular.module('myApp', []);

app.controller('initCtrl', function ($scope, $http) {
    $scope.items = [];

    $http.get('json/quizzes.json').then(function(res) {
        $scope.items = res.data.quizzes;

    });
})

app.controller('singleQuizCtrl', function ($scope, $http) {
    $scope.quiz = '';
    $scope.items = [];
    $scope.resShowing = false;
    $scope.currentQuizId = null;

    $http.get('json/quizzes.json').then(function(res) {
        $scope.currentQuiz = $scope.getParameterByName('id');
        if ($scope.currentQuiz !== null) {
            $scope.quiz = res.data.quizzes[$scope.currentQuiz];
            console.log($scope.quiz)
            $scope.items = $scope.quiz.data;
            $scope.quizTitle = $scope.quiz.title;
        }
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
                        console.log($scope.items[j].id)
                        if (res.data[i].qId == $scope.items[j].id) {
                            for (k in $scope.items[j].answers) {
                                if ($scope.items[j].answers[k].id == res.data[i].qId) {
                                    console.log($scope.items[j].answers[k].correct = 'true')
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

    $scope.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
})

app.controller('myCtrl', function ($scope, $http) {
    $scope.items = [];
    $scope.resShowing = false;

    $http.get('json/quizzes_backup.json').then(function(res) {
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
                                    console.log($scope.items[j].answers[k].correct = 'true')
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

