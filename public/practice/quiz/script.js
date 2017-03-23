(function() {
    var questions = [{
        question: "What is 2*5?",
        choices: [2, 5, 10, 15, 20],
        correctAnswer: 2
    }, {
        question: "What is 3*6?",
        choices: [3, 6, 9, 12, 18],
        correctAnswer: 4
    }, {
        question: "What is 8*9?",
        choices: [72, 99, 108, 134, 156],
        correctAnswer: 0
    }, {
        question: "What is 1*7?",
        choices: [4, 5, 6, 7, 8],
        correctAnswer: 3
    }, {
        question: "What is 8*8?",
        choices: [20, 30, 40, 50, 64],
        correctAnswer: 4
    }];

    var questionNumber = 0;
    var selection = [];
    var scoreCount = 0;

    $(document).ready( function () {
        var quiz = $("#quiz");
        displayNextQues();
        $("#next").click(
            function () {
                choice();

                if(selection[questionNumber]==undefined)
                {
                    alert("Please select one option");
                }
                else
                {
                    if(selection[questionNumber]==questions[questionNumber].correctAnswer)
                    {
                        scoreCount++;
                        questionNumber++;
                        displayNextQues();
                    }
                    else
                    {
                        alert(" Wrong answer!!! Please select correct option");
                    }

                }
            }
        );


        function displayNextQues() {
            if(questionNumber==0)
            {
                $("#startAgain").hide();
                $("#prev").hide();
                $("#score").hide();
                makeQuestion();
            }
            else
            {
                var ques = $("#question");
                var option = $("#choices");
                option.find("li").remove();
                ques.find("p").remove();
                if(questionNumber!=questions.length)
                {
                    if(questionNumber!=questions.length-1)
                    {
                        $("#prev").show();
                    }
                    else
                    {
                        $("#prev").show();

                    }
                    makeQuestion();
                }
                else
                {
                    $("#message").text("Your score is " + scoreCount + "/" + questions.length);
                    $("#startAgain").show();
                    $("#prev").hide();
                    $("#score").hide();
                    $("#next").hide();
                }
            }
        }

        function makeQuestion() {
           var ques = $("#question");
           var option = $("#choices");

           var quesForm = '<p class="text-capitalize">'+questions[questionNumber].question+'</p>';
           ques.append(quesForm);

           var optionForm = "";
            for(i=0;i<questions[questionNumber].choices.length;i++)
            {
                optionForm += '<li><input type="radio" name="ch" value='+i+'/>'+questions[questionNumber].choices[i]+'</li>';
            }
            option.append(optionForm);

            quiz.append(ques);
            quiz.append(option);
        }
        });

    function choice() {

        selection[questionNumber]= $("li [name='ch']:checked").val();
        if(selection[questionNumber]!=undefined)
        {
            selection[questionNumber] = selection[questionNumber].split("/")[0];
        }
    }

}) ();
