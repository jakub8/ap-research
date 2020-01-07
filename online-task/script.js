/*eslint-env jquery*/
/*eslint-env browser*/

var numbers = [];
//var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
var buttons = ["#b1", "#b2", "#b3", "#b4",
              "#b5", "#b6", "#b7", "#b8",
              "#b9", "#b10", "#b11", "#b12",
              "#b13", "#b14", "#b15","#b16"];
var hasWon = false;
var ready = false;
var currentNumber = 1;
var misses = 0;
var streak = 0;

$(document).ready(function () {

    generateNumbers();
   
    //update("#output", "Click the squares in numerical order!");
    $("#output").css("margin-left", $("button").width());
    $("#output").css("font-size", (10 * 0.5).toString() + "vw");
    $("#directions").css("margin-left", $("button").width());
    $("#directions").css("font-size", (10 * 0.2).toString() + "vw");
    update("#directions", "Memorize the numbers before time runs out!")
    $("p").css("margin-left", $("button").width() * 0.1);
    $("body").css("margin-top", $("button").width() * 0.1);
    $("button").css("font-size", ($("button").width() * 0.25));
    $("button").css("color", "rgba(0, 0, 0, 0)");
    
    //this makes the output flash between two colors
    var toggle = true;
    var outputInterval = setInterval(function () {
        if(toggle && ready) {
            $("#output").css("color", "#ff0000");
        } else {
            $("#output").css("color", "#b61ee1");
        }
        toggle = !toggle;
    }, 100);
    
    //this is the timer that counts down until the numbers dissappear and you can play
    var time = 1;
    var timeInterval = setInterval(function () {
        update("#output", (10 - (time / 1000)).toFixed(2).toString());
        time += 10;
        
        if (time >= 10000) {
            ready = true;
            update("#directions", "Misses: " + misses.toString() + " Streak: " + streak.toString());
            $("#output").css("font-size", (10 * 0.25).toString() + "vw");
            //$("button").css("font-size", ($("button").width() * 0.15));
            $("button").css("color", "rgba(0, 0, 0, 0)");
            $("button").text("E");
            update("#output", "Click the squares in numerical order!");
            clearInterval(timeInterval);
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
    
//------------RESIZE--------------RESIZE-------------------RESIZE--------------RESIZE-------------------RESIZE----------------RESIZE-----------RESIZE
    $(window).resize(function () {
        // This will execute whenever the window is resized
        $(window).height(); // New height
        $(window).width(); // New width
        $("#directions").css("margin-left", $("button").width());
        $("#output").css("margin-left", $("button").width());
        $("p").css("margin-left", $("button").width() * 0.1);
        $("body").css("margin-top", $("button").width() * 0.1);
        
        if(hasWon) {
            $("#output").css("font-size", (10 * 0.5).toString() + "vw");
        } else {
            $("#output").css("font-size", (10 * 0.25).toString() + "vw");
        }
        $("button").css("font-size", ($("button").width() * 0.25));
    });
    
//------------click-----------click----------------click---------------------click----------------click--------------click-------------click----------
    $("button").click(function () {
        var btn = "#" + $(this).attr('id');
        var btnIndex = buttons.findIndex(function (element) {return element.valueOf() == btn.valueOf();});
        if (ready) {
            if(numbers[btnIndex] == currentNumber) {//sets it green if it is the right number
                if(misses == 0) {
                    streak++;
                }
                update("#directions", "Misses: " + misses.toString() + " Streak: " + streak.toString());
                $(btn).css("background-color", "rgb(44, 211, 48)");
                $(btn).css("color", "rgba(0, 0, 0, 1)");
                update(btn, numbers[btnIndex].toString());
                currentNumber++;
                if (currentNumber == 17) {
                    clearInterval(outputInterval);
                    win();
                }
            } else if ($(btn).css("background-color") != "rgb(44, 211, 48)"){//sets it red if it is the wrong number, but only if it is not already green
                misses++;
                update("#directions", "Misses: " + misses.toString() + " Streak: " + streak.toString());
                $(btn).css("background-color", "#ff0000");
                setTimeout(function () {if ($(btn).css("background-color") != "rgb(44, 211, 48)") {$(btn).css("background-color", "#e5e5e5");}}, 500); 
            }
        }
    });

});

//makes different stuff happens when you win the game
function win() {
    //$("button").css("font-size", ($("button").width() * 0.25));
    for (var i = 1; i < 17; i++) {
        var button = buttons[numbers.findIndex(function (num) {return num == i;})];
        $(button).css("color", "rgba(0, 0, 0, 1)");
        update(button, i.toString());
    }
    
    hasWon = true;
    $("#output").css("color", "#00ff00");
    $("#output").css("font-size", (10 * 0.5).toString() + "vw");
    $("body").css("background-color", "#50afaf");
    update("#output", "YOU WIN!");
}

//allows to change the test of something via its id
function update(name, str) {
    $(name).text(str);
}

//makes 16 unique random numbers numbered 1-16 and puts them in the array
function generateNumbers() {
    //$("body").css("background-color", "red");
    
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




