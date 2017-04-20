(function() {
    angular
        .module("Quiz")
        .factory("ExamService", ExamService);

    function ExamService($http) {
        var api = {
            findAllData: findAllData,
            insertData: insertData
        };
        return api;

        function findAllData(userId,examId) {
            return $http.get("/api/user/"+userId+"/exam/" + examId);
        }

        function insertData(data) {
            return $http.post("/api/exam", data);
        }
    }
}) ();
