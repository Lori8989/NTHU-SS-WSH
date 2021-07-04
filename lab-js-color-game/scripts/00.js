window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easyMode = document.querySelector("#easy");
var hardMode = document.querySelector("#hard");
var nightmareMode = document.querySelector("#nightmare");
var curMode = 1;

function init() {
    initCards();
    reset();
}

function initCards() {
    //init is hard mode
    curMode = 1;
    easyMode.style['background-color'] = "white";
    hardMode.style['background-color'] = "cadetblue";
    nightmareMode.style['background-color'] = "white";
    numCards = 6;
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    gameOver = false;
    
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    if( curMode == 2 ){
        var t = 3;
        //showTime();
        var myVar = setInterval(function(){ myTimer() }, 1000);
        resetButton.disabled = "true";
        resetButton.style.visibility = "hidden";
    }

    function myTimer() {
        document.getElementById("timer").innerHTML = t;
        t--;
        if(t < 0){
            clearInterval(myVar);
            document.getElementById("message").innerText = "TIMEOUT!";
            document.getElementById("timer").innerText = "";
            document.body.style.backgroundColor = pickedColor;
            changeColors("#FFF");
            resetButton.disabled = "false";
            resetButton.style.visibility = "visible";
            resetDisplay.innerText = "Play again";
        }
    }

    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {
    reset();
})

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

easyMode.addEventListener("click", function(){
    curMode = 0;
    resetButton.style.visibility = "visible";
    resetButton.disabled = "false";
    numCards = 3;
    easyMode.style['background-color'] = "cadetblue";
    hardMode.style['background-color'] = "white";
    nightmareMode.style['background-color'] = "white";
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
})

hardMode.addEventListener("click", initCards() )

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

nightmareMode.addEventListener("click", function(){
    curMode = 2;
    var t = 3;
    //showTime();
    var myVar = setInterval(function(){ myTimer() }, 1000);
    resetButton.disabled = "true";
    resetButton.style.visibility = "hidden";

    numCards = 6;
    easyMode.style['background-color'] = "white";
    hardMode.style['background-color'] = "white";
    nightmareMode.style['background-color'] = "cadetblue";
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?"; 

    function myTimer() {
        document.getElementById("timer").innerHTML = t;
        t--;
        if(t < 0){
            clearInterval(myVar);
            document.getElementById("message").innerText = "TIMEOUT!";
            document.getElementById("timer").innerText = "";
            document.body.style.backgroundColor = pickedColor;
            changeColors("#FFF");
            resetButton.disabled = "false";
            resetButton.style.visibility = "visible";
            resetDisplay.innerText = "Play again";
        }
    }
    

    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
} )

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
