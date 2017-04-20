(function() {
    angular
        .module("Quiz")
        .controller("QuizOptionController", QuizOptionController)

    function QuizOptionController($location, $scope) {
        var vm = this;
        vm.gotoQuiz = gotoQuiz;
        vm.dropboxitemselected = dropboxitemselected;
        vm.insert = insert;
        vm.dropboxNumberSelected = dropboxNumberSelected;
        vm.getType = getType;
        vm.getOrder = getOrder;
        vm.dropboxLanguageSelected = dropboxLanguageSelected;

        var type;
        var order;

        vm.numberOfWords = [3,5,10]
        vm.categories = ['A', 'B'];
        vm.languages = ["English", "Spanish"];

        function getOrder(v) {
            order = v;
        }

        function getType(v) {
            type = v;
        }

        function dropboxNumberSelected(n) {
            vm.selectedNumber = n;
        }

        function dropboxLanguageSelected(n) {
            vm.selectedLanguage = n;
        }

        function insert() {
            $location.url("/" + vm.selectedItem + "/insert");
        }

        function gotoQuiz() {
            var examId = Date.now();
            var userId = "1";
            $location.url("/user/"+userId+"/exam/"+examId+"/category/" + vm.selectedItem + "/type/" + type + "/order/" + order + "/nowords/" + vm.selectedNumber + "/language/" + vm.selectedLanguage);
        }

        function dropboxitemselected(item) {
            vm.selectedItem = item;
        }
    }

}) ();
