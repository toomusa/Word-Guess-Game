// Define array of Words
const words = ["Acura", "AlfaRomeo", "AstonMartin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", 
                "Chevrolet", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Hyundai", 
                "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "LandRover", "Lexus", "Maserati", 
                "Mazda", "McLaren", "Mercedes", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Renault", 
                "RollsRoyce", "Saab", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", ];

// define variables
var userPick;
var attempts = [];
var letters = [];
var guessesLeft = 20;
var randomWord; 
var lettersLeft; 
var wins = 0;
var losses = 0;

let $activeWord = document.getElementById("activeWord");
let $wins = document.getElementById("wins");
let $losses = document.getElementById("losses");
let $guessesLeft = document.getElementById("guessesLeft");
let $guesses = document.getElementById("guesses");
let $messageBox = document.getElementById("messageBox");

let $marquee = document.getElementById("marquee");
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
                "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


// set the game start conditions

function setGame() {
    randomWord = words[Math.floor(Math.random()*words.length)].toUpperCase();
    lettersLeft = randomWord.length;
    userPick = "";
    attempts = [];
    letters = [];
    guessesLeft = 20;
    $guessesLeft.textContent = guessesLeft;
    $("#guesses").text("Guesses: ");
    $("#messageBox").empty();
    $("#activeWord").empty();
    $(".keyboard").removeClass("button-clicked");
    for (let i = 0; i < randomWord.length; i++) {
        letters[i] = "_ ";
        $activeWord.textContent = letters.join("");
        console.log(randomWord);
    }
};

setGame();

// capture userPick from key press

document.onkeyup = function(event) {
    console.log(event.key)
    $(`#${event.key}`).addClass("button-clicked");
    let userPick = event.key.toUpperCase();
    $(this).addClass("button-clicked");
    validation(userPick);
};

// capture userPick from on-screen keyboard

$(".keyboard").on("click", function () {
    let userPick = ($(this).text()).toUpperCase();
    $(this).addClass("button-clicked");
    validation(userPick);
});

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
            $guessesLeft.textContent = guessesLeft;
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
        losses++;
        $losses.textContent = losses;
        setTimeout(() => {
            var restart = confirm("New Game?");
            if (restart == true) {
                setGame();
            }
            else {
                alert("Thank you for playing");
            }
        }, 1000);
    } 
    else {
        for (let j = 0; j < randomWord.length; j++) {
            if (randomWord[j] === userPick) {
                letters[j] = userPick;
                $activeWord.textContent = letters.join("");
                lettersLeft--;
                if (lettersLeft === 0) {
                    $messageBox.textContent = "You Win!";
                    wins++;
                    $wins.textContent = wins;
                    setTimeout(() => {
                        var restart = confirm("Start New Game?");
                        if (restart == true) {
                            setGame();
                        }
                        else {
                            alert("Thank you for playing");
                        }   
                    }, 1000);
                } 
            }
        }
    }
}

console.log(randomWord);
console.log(userPick);
console.log(lettersLeft);

