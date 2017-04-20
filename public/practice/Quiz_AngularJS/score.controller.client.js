(function() {
    angular
        .module("Quiz")
        .controller("ScoreController", ScoreController)

    function ScoreController($routeParams, ExamService) {
        var vm = this;
        var userId = $routeParams['userId'];
        var examId = $routeParams['examId'];

        function init() {
            var promise = ExamService.findAllData(userId,examId);

            promise.success(function (datas) {
                vm.datas = datas;
                vm.count = 0;
                for(i=0;i<vm.datas.length;i++)
                {
                    if(vm.datas[i].correct_ans == vm.datas[i].user_ans)
                    {
                        vm.count++;
                    }
                }
            })
        };
        init();
    }
}) ()
