(function() {
    angular
        .module("Quiz")
        .config(Config);

    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl: "main.html",
                controller: "QuizOptionController",
                controllerAs: "model"
            })
        $routeProvider
            .when("/user/:userId/exam/:examId/category/:category/type/dropdown/order/:ord/nowords/:nows/language/:lang", {
                templateUrl: "quiz.html",
                controller: "QuizDropDownController",
                controllerAs: "model"
            })
        $routeProvider
            .when("/user/:userId/exam/:examId/category/:category/type/fib/order/:ord/nowords/:nows/language/:lang", {
                templateUrl: "quizfib.html",
                controller: "QuizFIBController",
                controllerAs: "model"
            })
        $routeProvider
            .when("/:category/insert", {
                templateUrl: "insertData.html",
                controller: "InsertDataController",
                controllerAs: "model"
            })
        $routeProvider
            .when("/user/:userId/exam/:examId/score", {
                templateUrl: "score.html",
                controller: "ScoreController",
                controllerAs: "model"
            })

    }
}) ();
