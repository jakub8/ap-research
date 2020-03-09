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
            if (timeRanOut) {
                if(numbers[btnIndex] == currentNumber) {//sets it green if it is the right number
                    if(misses == 0) {
                        streak++;
                    }
                    $(btn).css("background-color", "rgb(44, 211, 48)");
                    $(btn).css("color", "rgba(0, 0, 0, 1)");
                    update(btn, numbers[btnIndex].toString());
                    currentNumber++;
                    if (currentNumber == 17) {
                        //clearInterval(outputInterval);
                        win();
                    }
                } else if ($(btn).css("background-color") != "rgb(44, 211, 48)"){//sets it red if it is the wrong number, but only if it is not already green
                    misses++;
                    $(btn).css("background-color", "#ff0000");
                    setTimeout(function () {if ($(btn).css("background-color") != "rgb(44, 211, 48)") {$(btn).css("background-color", "#e5e5e5");}}, 500); 
                }
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
    $("#title").css("color", "#00ff00");
    $("body").css("background-color", "#50afaf");
    $("div").css("background-color", "#50afaf");
    update("#title", "YOU WIN!");
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



function setDimensions() {
    
    if(goVar) {
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
            
            var countUp = setInterval(function () {
                if(hasWon) {
                    clearInterval(countUp);
                } else {
                    counter += 10;
                    update("#output","Misses: " + misses.toString() + " Streak: " + streak.toString() + " Time: " + (counter/1000).toFixed(2).toString());
                    if (counter >= 120000) {
                        counter = 120000;
                        update("#output","Misses: " + misses.toString() + " Streak: " + streak.toString() + " Time: " + (counter/1000).toFixed(2).toString() + "+");
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




