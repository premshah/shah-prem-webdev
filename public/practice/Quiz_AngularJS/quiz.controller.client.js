(function() {
    angular
        .module("Quiz")
        .controller("QuizDropDownController", QuizDropDownController)
        .controller("InsertDataController", InsertDataController)
        .controller("QuizFIBController", QuizFIBController)

    function QuizFIBController($location, $routeParams, QuizService, ExamService) {
        var vm = this;
        var category = $routeParams['category'];
        var order = $routeParams['ord'];
        var nowords = $routeParams['nows'];
        var language = $routeParams['lang'];
        var userId = $routeParams['userId'];
        var examId = $routeParams['examId'];
        
        vm.nowords = nowords;
        vm.typedAnswer = [];
        vm.nextSet = nextSet;
        vm.timeFinish = timeFinish;
        
        function nextSet() {
            console.log(vm.typedAnswer);
            for(i=0;i<vm.typedAnswer.length;i++)
            {
                var dt = {};
                dt.uid = userId;
                dt.examid = examId;
                dt.question = vm.questions[i];
                dt.correct_ans = vm.answers[i];
                dt.user_ans = vm.typedAnswer[i];
                console.log(dt);
                var promise = ExamService.insertData(dt);

                promise.success(function (data) {
                })
            }
            vm.typedAnswer = [];
            vm.questions.splice(0,vm.nowords);
            vm.answers.splice(0,vm.nowords);
            if(vm.questions.length==0)
            {
                $location.url("/user/" + userId + "/exam/" + examId + "/score");
            }
        }

        function timeFinish() {
            alert("time finish");
        }

        function init() {
            var promise = QuizService.findAllData(category);

            promise.success(function (data) {
                vm.data = data;
                if(order=="random")
                {
                    vm.data = vm.data.sort(randomize);
                }
                if(language=="English")
                {
                    var temp = vm.data;
                    //var newJson = [];
                    vm.questions = []
                    vm.answers = [];
                    for(var i=0;i<temp.length;i++)
                    {
                        vm.questions.push(temp[i].english);
                        vm.answers.push(temp[i].spanish);
                        //var obj = new Object();
                        //obj.question = temp[i].english;
                        //obj.answer = temp[i].spanish;
                        //obj.choices = findChoices(temp,i,language);
                        //var jsonString= JSON.stringify(obj);
                        //newJson.push(jsonString);
                    }
                    //vm.data = newJson;
                }
                else
                {
                    var temp = vm.data;
                    //var newJson = [];
                    vm.questions = []
                    vm.answers = [];
                    for(var i=0;i<temp.length;i++)
                    {
                        vm.questions.push(temp[i].spanish);
                        vm.answers.push(temp[i].english);
                        //var obj = new Object();
                        //obj.question = temp[i].spanish;
                        //obj.answer = temp[i].english;
                        //obj.choices = findChoices(temp,i,language);
                        //var jsonString= JSON.stringify(obj);
                        //newJson.push(jsonString);
                    }
                    //vm.data = newJson;
                }
            })
        }
        init();
    }

    function findChoices(t, index, lang) {
        if(lang=="English")
        {
            var choice = [];
            choice.push(t[index].spanish);
            choice = choice.sort(randomize);
            choice = choice.sort(randomize);
            for(var j=1;j<5;j++)
            {
                var p = (j+index)%10;
                choice.push(t[p].spanish);
            }
            choice = choice.sort(randomize);
            choice = choice.sort(randomize);
            return choice;
        }
        else
        {
            var choice = [];
            choice.push(t[index].english);
            choice = choice.sort(randomize);
            choice = choice.sort(randomize);
            for(var j=1;j<5;j++)
            {
                var p = (j+index)%10;
                choice.push(t[p].english);
            }
            choice = choice.sort(randomize);
            choice = choice.sort(randomize);
            return choice;
        }
    }

    function randomize(a, b) {
        return Math.random() - 0.5;
    }


    function QuizDropDownController($location, $routeParams, QuizService, ExamService) {
        var vm = this;
        var category = $routeParams['category'];
        var order = $routeParams['ord'];
        var nowords = $routeParams['nows'];
        var language = $routeParams['lang'];
        var userId = $routeParams['userId'];
        var examId = $routeParams['examId'];

        vm.nowords = nowords;
        vm.nextSet = nextSet;
        vm.dropboxChoiceSelected = dropboxChoiceSelected;
        vm.timeFinish = timeFinish;
        vm.selectedAnswer = [];

        function timeFinish() {
            alert("time finish");
        }

        function dropboxChoiceSelected(n,index) {
            vm.selectedAnswer[index] = n;
        }

        function nextSet() {
            console.log(vm.selectedAnswer);
            for(i=0;i<vm.selectedAnswer.length;i++)
            {
                var dt = {};
                dt.uid = userId;
                dt.examid = examId;
                dt.question = vm.questions[i];
                dt.correct_ans = vm.answers[i];
                dt.user_ans = vm.selectedAnswer[i];
                console.log(dt);
                var promise = ExamService.insertData(dt);

                promise.success(function (data) {
                })
            }

            vm.questions.splice(0,vm.nowords);
            vm.choices.splice(0,vm.nowords);
            vm.selectedAnswer = [];
            vm.answers.splice(0,vm.nowords);
            if(vm.questions.length==0)
            {
                $location.url("/user/" + userId + "/exam/" + examId + "/score");
            }
        }

        function init() {
            var promise = QuizService.findAllData(category);

            promise.success(function (data) {
                vm.data = data;
                if(order=="random")
                {
                    vm.data = vm.data.sort(randomize);
                }
                if(language=="English")
                {
                    var temp = vm.data;
                    //var newJson = [];
                    vm.questions = []
                    vm.answers = [];
                    vm.choices = [];
                    for(var i=0;i<temp.length;i++)
                    {
                        vm.questions.push(temp[i].english);
                        vm.answers.push(temp[i].spanish);
                        vm.choices.push(findChoices(temp,i,language));
                        /*var obj = new Object();
                        obj.question = temp[i].english;
                        obj.answer = temp[i].spanish;
                        obj.choices = findChoices(temp,i,language);
                        var jsonString= JSON.stringify(obj);
                        newJson.push(jsonString);*/
                    }
                    //vm.data = newJson;
                }
                else
                {
                    var temp = vm.data;
                    //var newJson = [];
                    vm.questions = []
                    vm.answers = [];
                    vm.choices = [];
                    for(var i=0;i<temp.length;i++)
                    {
                        vm.questions.push(temp[i].spanish);
                        vm.answers.push(temp[i].english);
                        vm.choices.push(findChoices(temp,i,language));
                        /*var obj = new Object();
                        obj.question = temp[i].spanish;
                        obj.answer = temp[i].english;
                        obj.choices = findChoices(temp,i,language);
                        var jsonString= JSON.stringify(obj);
                        newJson.push(jsonString);*/
                    }
                    //vm.data = newJson;
                }
            })
        }
        init();


    }

    function InsertDataController($routeParams, QuizService, $location) {
        var vm = this;
        var category = $routeParams['category'];
        vm.insert = insert;
        vm.quiz = quiz;

        function insert(data) {
            console.log(data);
            var promise = QuizService.insertData(category,data);

            promise.success(function (dataId) {
                $location.url("/" + category + "/insert");
            })
        }

        function quiz() {
            $location.url("/" + category);
        }
    }
}) ();
