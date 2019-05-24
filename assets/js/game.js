    
    
// Define array of Words
const words = ["mercedes", "audi", "tesla", "hyundai", "ford", "toyota", "volvo", "ferrari", "porsche", "lamborghini"];

// define variables
let userPick = [];
let randomWord;
let guesses = [];
let rightGuess;
let wrongGuess;
// let activeWord = randomWord;
let $activeWord = document.getElementById("#activeWord");
let $attempts = document.getElementById("attempts");
let $guesses = document.getElementById("guesses");
let $wins = document.getElementById("wins");
let $losses = document.getElementById("losses");
let $messageBox = document.getElementById("messageBox");
let $marquee = document.getElementById("marquee");
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var isLetter = function(c) {
    return c.length === 1 && (c.toLowerCase() != c.toUpperCase()); 
}

var updateText = function () {
    showPick();
    updateMarquee();
}

function displayWord() {
    $("#activeWord").textContent = randomWord;
}

function showPick() {
    $guesses.textContent = userPick;
}

function updateMarquee() {
    $("#marquee").textContent = activeWord;
}


// $(document).ready(function(){

 
    // when a key is pressed, verify that the key is a letter, change it to upper case, and assign it to userPick

    document.onkeyup = function(event) {
        let userPick = event.key.toUpperCase();
        if (isLetter(userPick)) {
            $messageBox.textContent = userPick;
            $guesses.append(userPick + " ");
            console.log(userPick);
        } else {
            $messageBox.textContent = "Pick a letter!";
        }
    }

    // Append to letters guessed if key press is not a match

    // when a screen keyboard key is clicked, verify that the key is a letter, change it to upper case, and assign it to userPick

    $(".keyboard").on("click", function() {
        userPick = ($(this).text()).toUpperCase();
        if (isLetter(userPick)) {
            $messageBox.textContent = userPick;
            $guesses.append(userPick + " ");
            console.log(userPick);
        } else {
            $messageBox.textContent = "Pick a letter!";
        }
      });


    // Split array elements into letters
    for (let i = 0; i < words.length; i++) {
        randomWord = words[Math.floor(Math.random()*words.length)].toUpperCase();
        letters = randomWord.split("");
        answer = randomWord.split("");
    }


    // Hide display of Words
    // check to see if userPick has already been selected or if it's a match
    
    for (var n = 0; n < answer.length; n++){
        // debugger;
        if (userPick === answer[n]) {     
            $marquee.textContent = userPick; 
            console.log("yes");    
            // activeWord = document.getElementById("activeWord");
            // capture = document.createTextNode(answer[n]);
            // activeWord.appendChild(capture);
        } 
        else {
            letters[n] = "_ ";
            activeWord = document.getElementById("activeWord");
            spacer = document.createTextNode(letters[n]);
            activeWord.appendChild(spacer);
        }
    }


    // Alternative method???

    // for (var i = 0; i < randomWord.length; i++) {
    //     if (userPick === randomWord.charAt(i)) {
    //         $('#container').find(":nth-child(" + (i + 1) + ")");
    //         matchFound = true;
    //         console.log(userPick);
    //     }
    // }

    console.log(randomWord);
    console.log(letters);
    console.log(answer);




    // check key press against Word letters

    // Display letter element if key press is a match

    // Alert win or loss

    // Start over with new Word



// });