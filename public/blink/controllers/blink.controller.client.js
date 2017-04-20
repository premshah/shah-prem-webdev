(function() {
    angular
        .module("BlinkApp")
        .controller("BlinkController", BlinkController)

    function BlinkController($interval, $scope) {
        var vm = this;
        vm.sentence = "";
        vm.row1 = ['A','B','C','D'];
        vm.row2 = ['E','F','G','H'];
        vm.row3 = ['I','J','K','L'];
        vm.row4 = ['M','N','O','P'];
        vm.row5 = ['Q','R','S','T'];
        vm.row6 = ['U', 'V','W','X','Y','Z'];
        vm.suggestion = ['s1', 's2', 's3', 's4', 's5', 's6'];
        vm.left = [23, 63, 24, 64, 25, 65, 26, 66];
        vm.right = [30, 68, 29, 67, 28, 70, 31, 69];
        vm.row = ['suggestion', 'row1', 'row2', 'row3', 'row4', 'row5', 'row6'];
        vm.bgcolor = "darkgrey";

        var row_bol = false;
        var row_index = -1;
        var col_index = 0;
        var blink = false;

        $interval(callAtInterval, 2000);

        var check = function(){
            if(condition){
                // run when condition is met
            }
            else {
                setTimeout(check, 1000); // check again in a second
            }
        }

        function callAtInterval() {
            if(!row_bol)
            {
                $("button").css('background-color',"darkgrey");
               row_index = (row_index + 1)%vm.row.length;
               if(row_index==0)
               {
                   $('#' + vm.suggestion[col_index]).css('background-color',"white");
                   console.log(vm.suggestion[col_index]);
                   if(blink)
                   {
                       row_bol = true;
                       blink = false;
                   }
               }
               else if(row_index==1)
               {
                   $('#' + vm.row1[col_index]).css('background-color',"white");
                   console.log(vm.row1[col_index]);
                   if(blink)
                   {
                       row_bol = true;
                       blink = false;
                   }
               }
               else if(row_index==2)
               {
                   $('#' + vm.row2[col_index]).css('background-color',"white");
                   console.log(vm.row2[col_index]);
                   if(blink)
                   {
                       row_bol = true;
                       blink = false;
                   }
               }
               else if(row_index==3)
               {
                   $('#' + vm.row3[col_index]).css('background-color',"white");
                   console.log(vm.row3[col_index]);
                   if(blink)
                   {
                       row_bol = true;
                       blink = false;
                   }
               }
               else if(row_index==4)
               {
                   $('#' + vm.row4[col_index]).css('background-color',"white");
                   console.log(vm.row4[col_index]);
                   if(blink)
                   {
                       row_bol = true;
                       blink = false;
                   }
               }
               else if(row_index==5)
               {
                   $('#' + vm.row5[col_index]).css('background-color',"white");
                   console.log(vm.row5[col_index]);
                   if(blink)
                   {
                       row_bol = true;
                       blink = false;
                   }
               }
               else
               {
                   $('#' + vm.row6[col_index]).css('background-color',"white");
                   console.log(vm.row6[col_index]);
                   if(blink)
                   {
                       row_bol = true;
                       blink = false;
                   }
               }
            }
            else
            {
                $("button").css('background-color',"darkgrey");
                if(row_index==0)
                {
                    col_index = (col_index + 1)%vm.suggestion.length;
                    $('#' + vm.suggestion[col_index]).css('background-color',"white");
                    console.log(vm.suggestion[col_index]);
                    if(blink)
                    {
                        vm.sentence = vm.suggestion[col_index];
                        row_bol = false;
                        row_index = -1;
                        col_index = 0;
                        blink = false;
                    }
                }
                else if(row_index==1)
                {
                    col_index = (col_index + 1)%vm.row1.length;
                    $('#' + vm.row1[col_index]).css('background-color',"white");
                    console.log(vm.row1[col_index]);
                    if(blink)
                    {
                        addChar(vm.row1[col_index]);
                        row_bol = false;
                        row_index = -1;
                        col_index = 0;
                        blink = false;
                    }
                }
                else if(row_index==2)
                {
                    col_index = (col_index + 1)%vm.row2.length;
                    $('#' + vm.row2[col_index]).css('background-color',"white");
                    console.log(vm.row2[col_index]);
                    if(blink)
                    {
                        addChar(vm.row2[col_index]);
                        row_bol = false;
                        row_index = -1;
                        col_index = 0;
                        blink = false;
                    }
                }
                else if(row_index==3)
                {
                    col_index = (col_index + 1)%vm.row3.length;
                    $('#' + vm.row3[col_index]).css('background-color',"white");
                    console.log(vm.row3[col_index]);
                    if(blink)
                    {
                        addChar(vm.row3[col_index]);
                        row_bol = false;
                        row_index = -1;
                        col_index = 0;
                        blink = false;
                    }
                }
                else if(row_index==4)
                {
                    col_index = (col_index + 1)%vm.row4.length;
                    $('#' + vm.row4[col_index]).css('background-color',"white");
                    console.log(vm.row4[col_index]);
                    if(blink)
                    {
                        addChar(vm.row4[col_index]);
                        row_bol = false;
                        row_index = -1;
                        col_index = 0;
                        blink = false;
                    }
                }
                else if(row_index==5)
                {
                    col_index = (col_index + 1)%vm.row5.length;
                    $('#' + vm.row5[col_index]).css('background-color',"white");
                    console.log(vm.row5[col_index]);
                    if(blink)
                    {
                        addChar(vm.row5[col_index]);
                        row_bol = false;
                        row_index = -1;
                        col_index = 0;
                        blink = false;
                    }
                }
                else
                {
                    col_index = (col_index + 1)%vm.row6.length;
                    $('#' + vm.row6[col_index]).css('background-color',"white");
                    console.log(vm.row6[col_index]);
                    if(blink)
                    {
                        addChar(vm.row6[col_index]);
                        row_bol = false;
                        row_index = -1;
                        col_index = 0;
                        blink = false;
                    }
                }
            }
        }

        vm.addChar = addChar;

        var videoInput = document.getElementById('inputVideo');

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }

        function handleVideo(stream) {
            videoInput.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            // do something
        }


        var ctracker = new clm.tracker();
        ctracker.init(pModel);
        ctracker.start(videoInput);

        var prev_left_area = 0;
        var prev_right_area = 0;

        function positionLoop() {
            requestAnimationFrame(positionLoop);
            var positions = ctracker.getCurrentPosition();
            //console.log(positions.length);
            if(positions.length!=undefined)
            {
                if(prev_left_area==0 && prev_right_area==0)
                {
                    prev_left_area = area(positions, vm.left);
                    prev_right_area = area(positions, vm.right);
                }
                else
                {
                    var new_left_area = area(positions, vm.left);
                    var new_right_area = area(positions, vm.right);

                    if((new_left_area - prev_left_area)>3 && (new_right_area - prev_right_area)>3)
                    {
                        blink = true;
                        console.log("blink");
                    }

                    prev_left_area = new_left_area;
                    prev_right_area = new_right_area;
                }
            }
            // positions = [[x_0, y_0], [x_1,y_1], ... ]
            // do something with the positions ...
        }

        positionLoop();

        function area(positions, eyec) {
            var tot_area = 0;
            for(var i=0;i<eyec.length;i++)
            {
                var i1 = i;
                var i2 = (i+1)%eyec.length;
                tot_area = tot_area + (positions[eyec[i1]][0] * positions[eyec[i2]][1]) - (positions[eyec[i1]][1] * positions[eyec[i2]][0]);
            }

            tot_area = tot_area/2;
            return tot_area;
        }

        var canvasInput = document.getElementById('drawCanvas');
        var cc = canvasInput.getContext('2d');

        function drawLoop() {
            requestAnimationFrame(drawLoop);
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            ctracker.draw(canvasInput);
        }

        drawLoop();

        function addChar(char) {
            vm.sentence = vm.sentence + char;
        }
    }
})();