(function() {
    angular
        .module("Quiz")
        .factory("QuizService", QuizService);

    function QuizService($http) {
        var api = {
            findAllData: findAllData,
            insertData: insertData
        };
        return api;

        function findAllData(category) {
            return $http.get("/api/quiz/" + category);
        }

        function insertData(category, data) {
            return $http.post("/api/quiz/" + category, data);
        }
    }
}) ();