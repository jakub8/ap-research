/*eslint-env jquery*/
/*eslint-env browser*/

var numbers = []; //holds the number sequence
var buttons = [ //button ids
    "#b1", "#b2", "#b3", "#b4",
    "#b5", "#b6", "#b7", "#b8",
    "#b9", "#b10", "#b11", "#b12",
    "#b13", "#b14", "#b15","#b16"
];
var hasWon = false; //tells if user won
var timeRanOut = false; //tells if game has started
var currentNumber = 1; //correct number to click next
var misses = 0; //incorrect clicks
var streak = 0; //max total right in row
var counter = 0; //time spent doing game
var goVar = false; //if the user clicked start
var tempStreak = 0; //current streak
var theme = Math.floor(Math.random() * 7); //theme implemented 0-control 1-red 2-blue 3-happy 4-angry 5-big 6-small
var uniqueId = ""; //id of the game
var aliases = [
    "mc6x7iouwum2u27uwr7fnkzv", //b1
    "nefkk0ak06gnci0lf75gqcni", //b2
    "y1fnkngfu6pjot0zugwb65rb", //b3
    "qe0pfocllq49esmb7dttf0wz", //b4
    "7w8rf0hepbuf4z9u1hbg35hu", //b5
    "ytj8cdzv852u4mviaid9z36b", //b6
    "zoq0yhmdg0jd15nkgyfd58w0", //b7
    "2rvb3sblu1hautg8d41xhfeq", //b8
    "v4mae5k0gxpag51b36mwlrc6", //b9
    "o787870k7g5zk1o6h2n826rb", //b10
    "6pzwezwshidb2u7n6o6ehpax", //b11
    "ktk7doxeufpptcmphdkxv0dq", //b12
    "sxel2g0qrh5qd6krk8k6aytb", //b13
    "ccxafctjy7kfryypy32caw7f", //b14
    "j4wuka2r9ij062k0by6o1km5", //b15
    "60jworiy3no25z08xlv9ku1p", //b16
    "wum5mtmraiobj2xwy9hjoy7s", //b17
    "fglg9hw0pu1kgmyeb6cmj6po", //b18
    "55zahxfkka9p1vxitszn9qo8", //b19
    "9gwikal2v9ymcjhgnpn4cfci", //b20
    "4n25jhnhsbrizbn0jkt8gm0i", //b21
    "xpzyfmmjyumrheqekaiytls8", //b22
    "w63am7sgtrxc1m86r1dtfzo2", //b23
    "t0tikvqvifz0x8lu4d1cacyt", //b24
    "ode2svteabofw68kmjv0a40r", //b25
    "17oe3ld50lqu22650gqoequ8", //b26
    "cych58wf093rq47ykzddoxu1", //b27
    "u38ls1dzjcmz7idoiq5dodn4", //b28
    "n6rve7xfx0uqs63cwg82aaf0", //b29
    "rc0um5amqafs318awro7ge60", //b30
    "i8ovnyfou5156nel0yi95eq3", //b31
    "4ktdari6lmg031878isqmo9s", //b32
    "qnc0fe3qpv7ywtds30hno82m", //b33
    "ks5twvecfqt3tefuijk4s698", //b34
    "xsmzrla9z5wm6pmh4hhpvhfk", //b35
    "valykt5u5358xwbz4ugurd8q", //b36
    "xtfexsysxypwavevr94e8vl1", //b37
    "onaraj881qkfjm41gtuismuf", //b38
    "3uoma1ozanijh8arhw4213q0", //b39
    "7tmd8qrqjm5mtzlgfgb9bv3e", //b40
];
var alias = aliases[Math.floor(Math.random() * 40)];
var neutralColors = [
    "rgb(245, 245, 245)", "rgb(219, 112, 147)", "rgb(126, 200, 224)", "rgb(245, 245, 245)", 
    "rgb(245, 245, 245)", "rgb(245, 245, 245)", "rgb(245, 245, 245)"
];
var correctColors = [
    "rgb(238, 232, 170)", "rgb(255, 0, 0)", "rgb(0, 0, 205)", "rgb(238, 232, 170)", 
    "rgb(238, 232, 170)", "rgb(238, 232, 170)", "rgb(238, 232, 170)"
];
var wrongImages = [
    "url(GrayX.png)", "url(RedX.png)", "url(BlueX.png)", "url(GrayX.png)", 
    "url(GrayX.png)", "url(GrayX.png)", "url(GrayX.png)"
]
var backgroundImages = [
    "", "url(red.png)", "url(blue.png)", "url(happy.png)", 
    "url(angry.png)", "url(big.png)", "url(small.png)"
]
var neutralColor = neutralColors[theme];
var correctColor = correctColors[theme];
var wrongImage = wrongImages[theme];
var backgroundImage = backgroundImages[theme];
var record = "";
var errorStreak = 0;

$(document).ready(function () {

    //////////////////////////////////////////////////////////////////////////////AT_START
    //this makes the uniqueid
    for(var i = 0; i < 8; i++) {
        var num = Math.floor(Math.random() * 10);
        uniqueId = uniqueId + num;
    }
    //generates the starting numbers
    generateNumbers();
    //makes the dimensions good
    goVar = true;
    setDimensions();
    goVar = false;
    setDimensions();
    //////////////////////////////////////////////////////////////////////////////

    // This will execute whenever the window is resized----------------------------------------------------------------------------
    $(window).resize(function () {
        $(window).height(); // New height
        $(window).width(); // New width
        setDimensions(); //resizes the dimensions
    });
    
    //this will execute whenever a button is clicked--------------------------------------------------------------------------------
    $("button").click(function () {
        var btn = "#" + $(this).attr('id'); //this holds the id of the button with the # in front
        //if start is clicked
        if (btn == "#start") {
            $("button").css("background-color", neutralColor);
            $("button").css("border-color", "slategray");
            goVar = true;
            go();
        } else {
            var btnIndex = buttons.findIndex(function (element) {return element.valueOf() == btn.valueOf();}); //this is the index of the button
            //runs if the game has started
            if (timeRanOut) {
                //if a correct button is clicked
                if(numbers[btnIndex] == currentNumber && !hasWon) {//sets it green if it is the right number
                    $(btn).css("color", "rgba(0, 0, 0, 1)");
                    $(btn).css("background-color", correctColor);
                    update(btn, numbers[btnIndex].toString());
                    currentNumber++;
                    tempStreak++;
                    //sets the new streak if needed
                    if(tempStreak > streak) {
                        streak = tempStreak;
                    }
                    if(errorStreak != 0){
                        if(currentNumber == 17){
                            record = record + errorStreak + "E,1C"
                        } else {
                            record = record + errorStreak + "E,"
                        }
                    } else if (currentNumber == 17){
                        record = record + tempStreak + "C"
                    }
                    //checks if last number is clicked
                    if (currentNumber == 17) {
                        win();//runs win sequence
                        js_send();//sends data
                    }
                    errorStreak = 0;
                } else if ($(btn).css("background-color") != correctColor && !hasWon){//sets it red if it is the wrong number, but only if it is not already green
                    if(tempStreak != 0){
                        record = record + tempStreak + "C,"
                    }
                    misses++;
                    errorStreak++;
                    tempStreak = 0;
                    $(btn).css("background-image", wrongImage);
                    
                    setTimeout(function () {
                        if ($(btn).css("background-color") != correctColor) {
                            $(btn).css("background-image", "");
                            $(btn).css("background-color", neutralColor);
                        }
                    }, 500);
                }
                //if restart button is clicked
                if(($(btn).text() == "Restart") && hasWon) {
                    restart();
                }
            }
        }
    });
});

//sends the email-------------------------------------------------------------------------------------------------------------
function js_send() {
    var request = new XMLHttpRequest();
    var subject = "Research Data #" + uniqueId;
    var message = "Theme: " + theme.toString() + " | Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " +(counter/1000).toFixed(2).toString() + " | Record: " + record;
    var data_js = {
        "subject": subject,
        "text": message,
        "access_token": alias // sent after you sign up
    };
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(params);
}

//parses the data so it can be read into email--------------------------------------------------------------------------------------------
function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

//formats elements differently if user has won--------------------------------------------------------------------------------------------
function win() {
    //finds the 1 button and turns it into the restart button
    var button = buttons[numbers.findIndex(function (num) {return num == 1;})];
    update(button, "Restart");
    $(button).css("background-color", "#fcd303");
    //formats stuff
    hasWon = true;
    update("#title", "YOU WIN! Press the \"Restart\" button to try again");
}

//allows to change the text of something via its id--------------------------------------------------------------------------------------------
function update(name, str) {
    $(name).text(str);
}

//makes 16 unique random numbers numbered 1-16 and puts them in the array---------------------------------------------------------------------
function generateNumbers() {
    //sets the text to invisible and color to grey
    $("button").css("color", "rgba(0,0,0,0)");
    $("button").css("background-color", neutralColor);
    
    numbers.push(Math.floor(Math.random() * 16 + 1));
    //checks to see if the number is already in the array, if not, add it
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

//this formats everything good, no hard coded values--------------------------------------------------------------------------------------------
function setDimensions() {
    if(goVar) {//if start is pressed
        $("#directions").css("background-color", "rgba(211, 211, 211, 0.75)");
        if(goVar) {
           $("#output").css("background-color", "rgba(211, 211, 211, 0.75)");
        }
        $("body").css("background-image", backgroundImage);
        $("p").css("width", "50%");
        $("body").css("margin-top", $("button").width() * 0.1);
        $("#output").css("margin-left", 0);
        $("#output").css("font-size", (10 * 0.25).toString() + "vw");
        $("#output").css("color", "black");
        $("#directions").css("margin-left", "15vw");
        $("#directions").css("margin-right", "15vw");
        $("#directions").css("margin-top", "2vh");
        $("#directions").css("margin-bottom", "2vh");
        $("#directions").css("font-size", (10 * 0.2).toString() + "vw");
        $("#directions").css("color", "black");
        $("#title").css("color", "black");
        $("#title").css("margin-top", "0vh");
        $("#title").css("margin-bottom", "0vh");
        $("#dir9").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir10").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir11").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir12").css("font-size", (10 * 0.1).toString() + "vw");
        $("button").css("width", "10vw");
        $("button").css("height", "10vw");
        $("button").css("font-size", ($("button").width() * 0.25));
        $("button").css("border-color", "black");
        //$("#output").css("margin-right", $("button").width() * 2);
    } else {//if start is not pressed
        $("#directions").css("background-color", "rgba(211, 211, 211, 0.75)");
        $("#output").css("background-color", "");
        $("p").css("width", "0%");
        $("body").css("margin-top", $("button").width() * 0.1);
        $("#output").css("margin-left", 0);
        $("#output").css("font-size", (10 * 0.25).toString() + "vw");
        $("#output").css("color", "rgba(0,0,0,0)");
        $("#directions").css("margin-left", "15vw");
        $("#directions").css("margin-right", "15vw");
        $("#directions").css("margin-top", "2vh");
        $("#directions").css("margin-bottom", "2vh");
        $("#directions").css("font-size", (10 * 0.2).toString() + "vw");
        $("#directions").css("color", "black");
        $("#dir9").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir10").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir11").css("font-size", (10 * 0.15).toString() + "vw");
        $("#dir12").css("font-size", (10 * 0.1).toString() + "vw");
        $("#dir1").css("margin-left", "8vw");
        $("#dir2").css("margin-left", "8vw");
        $("#dir3").css("margin-left", "8vw");
        $("#dir4").css("margin-left", "8vw");
        $("#dir5").css("margin-left", "8vw");
        $("#dir6").css("margin-left", "8vw");
        $("#dir7").css("margin-left", "8vw");
        $("#dir8").css("margin-left", "8vw");
        $("button").css("font-size", 0);
        $("button").css("color", "rgba(0, 0, 0, 0)");
        $("#start").css("font-size", ($("button").width() * 0.25));
        //$("#output").css("margin-right", $("button").width() * 2);
        $("button").css("width", "0vw");
        $("button").css("height", "0vw");
        $("button").css("background-color", "rgba(0, 0, 0, 0)");
        $("button").css("border-color", "rgba(0, 0, 0, 0)");
        $("#start").css("color", "black");
        $("#start").css("width", "8vw");
        $("#start").css("height", "4vw");
        $("#start").css("border-color", "black");
        $("#title").css("color", "black");
        $("#title").css("margin-top", "0vh");
        $("#title").css("margin-bottom", "0vh");
    }
}

//this is called when user hits start button, formats stuff-------------------------------------------------------------------------------
function go() {
    //removes directions
    $("#start").remove();
    $("#dir1").remove();
    $("#dir2").remove();
    $("#dir3").remove();
    $("#dir4").remove();
    $("#dir5").remove();
    $("#dir6").remove();
    $("#dir7").remove();
    $("#dir8").remove();
    $("#dir9").remove();
    $("#dir10").remove();
    $("#dir11").remove();
    $("#dir12").remove();
    $("br").remove();
    
    $("#directions").css("margin-bottom", "5vh");
    
    update("#title", "Memorize!");
    
    setDimensions();
    //starts the countdown timer
    var time = 0;
    var timeInterval = setInterval(function () {
        update("#output", (10 - (time / 1000)).toFixed(2).toString());
        time += 10;
        if (time >= 10000) {
            timeRanOut = true;
            $("#output").css("font-size", (10 * 0.25).toString() + "vw");
            $("button").css("color", "rgba(0, 0, 0, 0)");
            $("button").text("E");
            update("#title", "Click the squares in numerical order!");
            clearInterval(timeInterval);
            //starts the timer to record how long it takes to win
            var countUp = setInterval(function () {
                $("#output").css("font-size", (10 * 0.25).toString() + "vw");
                if(hasWon) {
                    update("#output","Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " + (counter/1000).toFixed(2).toString());
                    clearInterval(countUp);
                } else {
                    counter += 10;
                    update("#output","Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " + (counter/1000).toFixed(2).toString());
                    //stop counting at 5 minutes
                    if (counter >= 300000) {
                        counter = 300000;
                        update("#output","Misses: " + misses.toString() + " | Top Streak: " + streak.toString() + " | Time: " + (counter/1000).toFixed(2).toString() + "+");
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

//if restart button is clicked, go back to right after user clicked start, also reset score-------------------------------------------------------
function restart() {
    alias = aliases[Math.floor(Math.random() * 40)];
    theme = Math.floor(Math.random() * 7);
    neutralColor = neutralColors[theme];
    correctColor = correctColors[theme];
    wrongImage = wrongImages[theme];
    backgroundImage = backgroundImages[theme];
    record = "";
    timeRanOut = false;
    currentNumber = 1;
    misses = 0;
    tempStreak = 0;
    errorStreak = 0;
    streak = 0;
    counter = 0;
    hasWon = false;
    var emptyList = [];
    numbers = emptyList;
    generateNumbers();
    go();
}





