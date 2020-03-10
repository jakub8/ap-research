/*eslint-env jquery*/
/*eslint-env browser*/

var numbers = [];
var buttons = ["#b1", "#b2", "#b3", "#b4",
              "#b5", "#b6", "#b7", "#b8",
              "#b9", "#b10", "#b11", "#b12",
              "#b13", "#b14", "#b15","#b16"];
var hasWon = false;
var timeRanOut = false;
var currentNumber = 1;
var misses = 0;
var streak = 0;
var counter = 0;
var goVar = false;
var tempStreak = 0;
var theme = 0;
var uniqueId = Math.floor(Math.random() * 100000) + 1;

$(document).ready(function () {
    
    

    generateNumbers();
   
    goVar = true;
    setDimensions();
    goVar = false;
    setDimensions();

    
    
    //this makes the output flash between two colors
//    var toggle = true;
//    var outputInterval = setInterval(function () {
//        if(toggle && timeRanOut) {
//            $("#output").css("color", "#ff0000");
//        } else {
//            $("#output").css("color", "#b61ee1");
//        }
//        toggle = !toggle;
//    }, 100);
    
    
    
    
    
    
//------------RESIZE--------------RESIZE-------------------RESIZE--------------RESIZE-------------------RESIZE----------------RESIZE-----------RESIZE
    $(window).resize(function () {
        // This will execute whenever the window is resized
        $(window).height(); // New height
        $(window).width(); // New width
//        $("#directions").css("margin-left", $("button").width());
//        $("#output").css("margin-left", $("button").width());
//        $("p").css("margin-left", $("button").width() * 0.1);
//        $("body").css("margin-top", $("button").width() * 0.1);
        setDimensions();
        
//        if(hasWon) {
//            $("#output").css("font-size", (10 * 0.5).toString() + "vw");
//        } else {
//            $("#output").css("font-size", (10 * 0.25).toString() + "vw");
//        }
//        $("button").css("font-size", ($("button").width() * 0.25));
    });
    
//------------click-----------click----------------click---------------------click----------------click--------------click-------------click----------
    $("button").click(function () {
        var btn = "#" + $(this).attr('id'); //this holds the id of the button with the # in front
        if (btn == "#okay") {
            $("button").css("background-color", "#e5e5e5");
            $("button").css("border-color", "slategray");
            goVar = true;
            go();
        } else {
            var btnIndex = buttons.findIndex(function (element) {return element.valueOf() == btn.valueOf();}); //this is the index of the button in the array
            if(numbers[btnIndex] == 1 && hasWon) {
                restart();
            }
            if (timeRanOut) {
                if((btn.valueOf() == 1) && hasWon) {
                    restart();
                }
                if(numbers[btnIndex] == currentNumber) {//sets it green if it is the right number
                    $(btn).css("background-color", "rgb(44, 211, 48)");
                    $(btn).css("color", "rgba(0, 0, 0, 1)");
                    update(btn, numbers[btnIndex].toString());
                    currentNumber++;
                
                    tempStreak++;
                    if(tempStreak > streak) {
                        streak = tempStreak;
                    }
                    if (currentNumber == 17) {
                        //clearInterval(outputInterval);
                        win();
                        js_send();
                    }
                } else if ($(btn).css("background-color") != "rgb(44, 211, 48)"){//sets it red if it is the wrong number, but only if it is not already green
                    misses++;
                    tempStreak = 0;
                    $(btn).css("background-color", "#ff0000");
                    setTimeout(function () {if ($(btn).css("background-color") != "rgb(44, 211, 48)") {$(btn).css("background-color", "#e5e5e5");}}, 500);
                }
            }
        }
    });

});





////START
    //update this with your js_form selector
//    var form_id_js = "javascript_form";
//
    var data_js = {
        "access_token": "smrgnaduefx1zajj52faztdf" // sent after you sign up
    };
//
//    function js_onSuccess() {
//        // remove this to avoid redirect
//        window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
//    }
//
//    function js_onError(error) {
//        // remove this to avoid redirect
//        window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
//    }
//
//    var sendButton = document.getElementById("js_send");

    function js_send() {
//        sendButton.value='Sending…';
//        sendButton.disabled=true;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
//                js_onSuccess();
            } else
            if(request.readyState == 4) {
//                js_onError(request.response);
            }
        };

//        var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
//        var message = document.querySelector("#" + form_id_js + " [name='text']").value;
        var subject = "Research Data #" + uniqueId;
        var message = "Theme: " + theme.toString() + " | Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " + (counter/1000).toFixed(2).toString();
        data_js['subject'] = subject;
        data_js['text'] = message;
        var params = toParams(data_js);

        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send(params);

        return false;
    }

    //sendButton.onclick = js_send;

    function toParams(data_js) {
        var form_data = [];
        for ( var key in data_js ) {
            form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
        }

        return form_data.join("&");
    }

//    var js_form = document.getElementById(form_id_js);
//    js_form.addEventListener("submit", function (e) {
//        e.preventDefault();
//    });
    
    /////END









//makes different stuff happens when you win the game
function win() {
    //$("button").css("font-size", ($("button").width() * 0.25));
    //$("#b8").append("<button id=\"restart\">Restart</button>");
    //$("#r3").css("margin-right", "50vw");
    //$("#d3").css("margin-right", "50vw");
//    $("#r3").append("<button id=\"restart\">Restart</button>");
    
    for (var i = 1; i < 17; i++) {
        var button = buttons[numbers.findIndex(function (num) {return num == i;})];
        $(button).css("color", "rgba(0, 0, 0, 1)");
        update(button, i.toString());
    }
    
    hasWon = true;
    $("#title").css("color", "#00ff00");
    $("#title").css("background-color", "#50afaf");
    $("#directions").css("background-color", "#50afaf");
    $("body").css("background-color", "#50afaf");
    $("div").css("background-color", "#50afaf");
    update("#title", "YOU WIN! Press the 1 button to restart");
}

//allows to change the test of something via its id
function update(name, str) {
    $(name).text(str);
}

//makes 16 unique random numbers numbered 1-16 and puts them in the array
function generateNumbers() {
    //$("body").css("background-color", "red");
    $("button").css("background-color", "#e5e5e5");
    $("button").css("color", "rgba(0,0,0,0)");
    
    numbers.push(Math.floor(Math.random() * 16 + 1));
    
    for (var i = 0; i < 15; i++) {
        var flag = true;
        while (flag) {
            var num = Math.floor(Math.random() * 16 + 1);
            if(!(numbers.includes(num))) {
                flag = false;
                numbers.push(num);
            }
        }
    }
}



function setDimensions() {
    
    if(goVar) {
        $("#title").css("background-color", "beige");
        $("#directions").css("background-color", "beige");
        $("body").css("background-color", "beige");
        $("p").css("width", "50%");
        $("body").css("margin-top", $("button").width() * 0.1);
        $("#output").css("margin-left", $("button").width() * 0.5);
        $("#output").css("font-size", (10 * 0.3).toString() + "vw");
        $("#output").css("color", "blue");
        $("#directions").css("margin-left", "20vw");
        $("#directions").css("margin-right", "20vw");
        $("#directions").css("margin-top", "2vh");
        $("#directions").css("margin-bottom", "2vh");
        $("#directions").css("font-size", (10 * 0.2).toString() + "vw");
        $("#directions").css("color", "#c048d9");
        $("#title").css("color", "#f2004c");
        $("#title").css("margin-top", "0vh");
        $("#title").css("margin-bottom", "0vh");
        $("#dir6a").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir6b").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir7a").css("font-size", (10 * 0.15).toString() + "vw");
        $("button").css("width", "10vw");
        $("button").css("height", "10vw");
        $("button").css("font-size", ($("button").width() * 0.25));
    } else {
        $("p").css("width", "0%");
        $("body").css("margin-top", $("button").width() * 0.1);
        $("#output").css("margin-left", $("button").width() * 0.5);
        $("#output").css("font-size", (10 * 0.3).toString() + "vw");
        $("#output").css("color", "rgba(0,0,0,0)");
        $("#directions").css("margin-left", "20vw");
        $("#directions").css("margin-right", "20vw");
        $("#directions").css("margin-top", "2vh");
        $("#directions").css("margin-bottom", "2vh");
        $("#directions").css("font-size", (10 * 0.2).toString() + "vw");
        $("#directions").css("color", "#c048d9");
        $("#dir6a").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir6b").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir7a").css("font-size", (10 * 0.15).toString() + "vw");
        $("button").css("font-size", ($("button").width() * 0.25));
        $("button").css("color", "rgba(0, 0, 0, 0)");
        $("button").css("width", "0vw");
        $("button").css("height", "0vw");
        $("button").css("background-color", "rgba(0, 0, 0, 0)");
        $("button").css("border-color", "rgba(0, 0, 0, 0)");
        $("#okay").css("color", "black");
        $("#okay").css("width", "8vw");
        $("#okay").css("height", "4vw");
        $("#okay").css("background-color", "skyblue");
        $("#okay").css("border-color", "aliceblue");
        $("#title").css("color", "#f2004c");
        $("#title").css("margin-top", "0vh");
        $("#title").css("margin-bottom", "0vh");
    }
}


function go() {
    
    $("#okay").remove();
    $("#dir1").remove();
    $("#dir2").remove();
    $("#dir3").remove();
    $("#dir4").remove();
    $("#dir5").remove();
    $("#dir6").remove();
    $("#dir6a").remove();
    $("#dir6b").remove();
    $("#dir7").remove();
    $("#dir7a").remove();
    $("#dir8").remove();
    $("br").remove();
    
    $("#directions").css("margin-bottom", "5vh");
    
    update("#title", "Memorize!");
    
    setDimensions();
    
    //this makes the output flash between two colors
//    var toggle = true;
//    var flashing = setInterval(function () {
//        if(toggle) {
//            $("body").css("background-color", "#000000");
//        } else {
//            $("body").css("background-color", "#ffffff");
//        }
//        toggle = !toggle;
//    }, 100);
    
    //this is the timer that counts down until the numbers dissappear and you can play
    var time = 0;
    var timeInterval = setInterval(function () {
        
        update("#output", (10 - (time / 1000)).toFixed(2).toString());
        time += 10;

        if (time >= 10000) {
            timeRanOut = true;
            $("#output").css("font-size", (10 * 0.25).toString() + "vw");
            
            //$("button").css("font-size", ($("button").width() * 0.15));

            $("button").css("color", "rgba(0, 0, 0, 0)");
            $("button").text("E");
            update("#title", "Click the squares in numerical order!");
            clearInterval(timeInterval);
//            clearInterval(flashing);
            
            var countUp = setInterval(function () {
                if(hasWon) {
                    update("#output","Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " + (counter/1000).toFixed(2).toString());
                    clearInterval(countUp);
                } else {
                    counter += 10;
                    update("#output","Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " + (counter/1000).toFixed(2).toString());
                    if (counter >= 600000) {
                        counter = 600000;
                        update("#output","Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " + (counter/1000).toFixed(2).toString() + "+");
                        clearInterval(countUp);
                    }
                }
            }, 10);
        }
    }, 10);


    //this makes the numbers appear in the buttons one after the other in numberical order
    var index = 0;
    var interval = setInterval(function () {
        index++;
        var button = buttons[numbers.findIndex(function (num) {return num == index;})];
        $(button).css("color", "rgba(0, 0, 0, 1)");
        update(button, index.toString());

        if (index == 16) {
            clearInterval(interval);
        }
    }, 200);
}



function restart() {
    timeRanOut = false;
    currentNumber = 1;
    misses = 0;
    tempStreak = 0;
    streak = 0;
    counter = 0;
    hasWon = false;
    var emptyList = [];
    numbers = emptyList;
    generateNumbers();
    go();
    
}
    
//    $("#restart").css("width", "10vw");
//    $("#restart").css("height", "7vw");
//    $("#restart").css("font-size", ($("button").width() * 0.25));
//    $("#restart").css("background-color", "pink");
//    $("#restart").css("border-color", "aliceblue");
//    $("#restart").css("color", "black");
    
    
    
//    $("#directions").append("<br><br><span id=\"dir1\">1. A 4x4 grid will appear on the left of the screen</span>");
//    $("#directions").append("<br><span id=\"dir2\">2. Numbers 1-16 will be randomly placed in the grid</span>");
//    $("#directions").append("<br><span id=\"dir3\">3. A timer will count down from 10 seconds</span>");
//    $("#directions").append("<br><span id=\"dir4\"> 4. During that time, memorize the order of the numbers</span>");
//    $("#directions").append("<br><span id=\"dir5\">5. When the timer reaches 0, the numbers will dissapear</span>");
//    $("#directions").append("<br><span id=\"dir6\">6. Click the squares in the order of the previous numbers</span>");
//    $("#directions").append("<br><span id=\"dir6a\">&emsp;&emsp; -correctly clicked squares will turn green and the number will reveal</span>");
//    $("#directions").append("<br><span id=\"dir6b\">&emsp;&emsp; -incorrectly clicked squares will turn red briefly</span>");
//    $("#directions").append("<br><span id=\"dir7\">7. Reveal all squares as quick and error-free as possible</span>");
//    $("#directions").append("<br><span id=\"dir7a\">&emsp;&emsp; -errors and a timer will be shown throughout</span>");
//    $("#directions").append("<br><span id=\"dir8\">8. Click the \"Okay\" button to start the timer and the game</span>");
//    $("#directions").append("<br><br><button id=\"okay\">Okay</button>");



/*
function setNumbers() {
    num1 = Math.floor(Math.random() * 13 + 1);
    num2 = Math.floor(Math.random() * 13 + 1);
    answer = num1 * num2;
    
    $("#num1").text(num1);
    $("#num2").text(num2);
}


function checkAnswer() {
    guess = parseInt($("#guess").val());

    if (guess == answer) {
        progress++;
        if (progress > 4) {
            $("#prompt").text("YOU ARE A MATHEMATICAL MASTER!");
        } else {
            response = "CORRECT!";
            setNumbers();  
        }
    } else {
        if (progress <= 4) {
            response = "WRONG!";
            setNumbers();  
            progress--;
        }
    }

    $("#response").text(response);
}
*/




