// Define array of Words
const words = ["Acura", "AlfaRomeo", "AstonMartin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", 
                "Chevrolet", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Hyundai", 
                "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Maserati", 
                "Mazda", "McLaren", "Mercedes", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Renault", 
                "RollsRoyce", "Saab", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", ];

// define variables
var userPick;
var attempts = [];
var letters = [];
var guessesLeft = 20;
var randomWord; 
var lettersLeft; 


let $activeWord = document.getElementById("activeWord");
let $attempts = document.getElementById("attempts");
let $guesses = document.getElementById("guesses");
let $wins = document.getElementById("wins");
let $losses = document.getElementById("losses");
let $messageBox = document.getElementById("messageBox");
let $marquee = document.getElementById("marquee");
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
                "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// capture userPick from key press

document.onkeyup = function(event) {
    let userPick = event.key.toUpperCase();
    validation(userPick);
};

// capture userPick from on-screen keyboard

$(".keyboard").on("click", function () {
    let userPick = ($(this).text()).toUpperCase();
    $(this).addClass("button-clicked");
    validation(userPick);
});

// set the game
(function setGame() {
    randomWord = words[Math.floor(Math.random()*words.length)].toUpperCase();
    lettersLeft = randomWord.length;
})();

// hide word characters with underscores and display

for (let i = 0; i < randomWord.length; i++) {
    letters[i] = "_ ";
    $activeWord.textContent = letters.join("");
}

// validate user input

function validation (userPick) {
    if (userPick.length === 1 && (userPick.toLowerCase() != userPick.toUpperCase())) {    
        if (attempts.includes(userPick)) {
            $messageBox.textContent = "You already picked " + userPick + ", try again!";
        }
        else {
            attempts.push(userPick);
            console.log(attempts);
            $messageBox.textContent = "You chose " + userPick;
            $guesses.append(userPick + " ");
            guessesLeft--;
            runGame(userPick);
        }
    }            
    else {
        $messageBox.textContent = "Pick a letter!";
    }
};

// main game loop

function runGame (userPick) {
    console.log(userPick);
    if (guessesLeft < 1) {
        $messageBox.textContent = "You lose!";
        // break;
    } 
    else {
        for (let j = 0; j < randomWord.length; j++) {
            if (randomWord[j] === userPick) {
                letters[j] = userPick;
                $activeWord.textContent = letters.join("");
                lettersLeft--;
                if (lettersLeft === 0) {
                    $messageBox.textContent = "You Win!";
                    var restart = confirm("New Game");
                    if (restart == true) {
                        $("#guesses").empty();
                        $("#messageBox").empty();
                        $("#activeWord").empty();
                        userPick = "";
                        attempts = [];
                        guessesLeft = 20;
                        // setGame();
                        randomWord = words[Math.floor(Math.random()*words.length)].toUpperCase();
                        lettersLeft = randomWord.length;
                        for (let i = 0; i < randomWord.length; i++) {
                            letters[i] = "_ ";
                            $activeWord.textContent = letters.join("");
                            console.log(randomWord);
                        }
                    }
                    else {
                        alert("Thank you for playing");
                    }
                    // break;
                } 
            }
        }
    }
}

console.log(randomWord);
console.log(userPick);
console.log(lettersLeft);

