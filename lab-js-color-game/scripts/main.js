window.onload = function() {
    init();
};

var numCards = 6;
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
    easyMode.style['background-color'] = "white";
    hardMode.style['background-color'] = "cadetblue";
    nightmareMode.style['background-color'] = "white";
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
    document.getElementById("timer").innerText = "";
    if( curMode === 0 ){
        easy();
    }
    else if( curMode === 1){
        hard();
    }
    else{
        nightmare(5);
    }
}


resetButton.addEventListener("click", function() {
    reset();
})

easyMode.addEventListener("click", easy )
hardMode.addEventListener("click", hard )
nightmareMode.addEventListener("click", nightmare(5) )

function hard(){
    easyMode.style['background-color'] = "white";
    hardMode.style['background-color'] = "cadetblue";
    nightmareMode.style['background-color'] = "white";
    curMode = 1;
    numCards = 6;
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
}

function easy(){
    easyMode.style['background-color'] = "cadetblue";
    hardMode.style['background-color'] = "white";
    nightmareMode.style['background-color'] = "white";
    curMode = 0;
    numCards = 3;
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
}

function nightmare(t) {
    curMode = 2;
    //showTime();
    var myVar = setInterval(function(){ myTimer() }, 1000);
    var blink = setInterval(function(){ blinking() }, 200); 
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
    var state = 0;
    function blinking() {
        state = state + 2;
        var color;
        if( state % 10 === 0 )
            color = "gray";
        else
            color = "#232323";
        document.body.style.backgroundColor = color;
        if(gameOver === true){
            clearInterval(blink);
            document.body.style.backgroundColor = pickedColor;
        }
        if(t < 0 && curMode === 2){
            clearInterval(blink);
            document.body.style.backgroundColor = pickedColor;
        }
        if( curMode !== 2 ){
            clearInterval(blink);
            document.body.style.backgroundColor = "#232323";
        }
    }
    
    function myTimer() {
        document.getElementById("timer").innerHTML = t;
        t--;
        if(gameOver === true){
            //answer correct
            clearInterval(myVar);
            resetButton.disabled = false;
            resetButton.style.visibility = "visible";
            resetDisplay.innerText = "Play again";
            document.getElementById("timer").innerText = "";
        }
        if(t < 0 && curMode === 2){
            //time out
            clearInterval(myVar);
            document.getElementById("message").innerText = "TIMEOUT!";
            document.getElementById("timer").innerText = "";
            document.body.style.backgroundColor = pickedColor;
            changeColors("#FFF");
            resetButton.removeAttribute("disabled");
            resetButton.style.visibility = "visible";
            resetDisplay.innerText = "Play again";
        }
        if( curMode !== 2 ){
            //switch mode
            clearInterval(myVar);
            document.getElementById("timer").innerText = "";
            resetButton.removeAttribute("disabled");
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


function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

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
