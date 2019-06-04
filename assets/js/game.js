// Define array of Words
const words = ["Acura", "AlfaRomeo", "AstonMartin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", 
                "Chevrolet", "Chrysler", "Citroen", "Dodge", "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Hyundai", 
                "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "LandRover", "Lexus", "Maserati", 
                "Mazda", "McLaren", "Mercedes", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Renault", 
                "RollsRoyce", "Saab", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"];

const warriors = ["JordanBell","AndrewBogut","QuinnCook","DeMarcusCousins","StephenCurry","MarcusDerrickson",
                    "KevinDurant","JacobEvans","DraymondGreen","AndreIguodala","JonasJerebko","DamianJones",
                    "DamionLee","ShaunLivingston","KevonLooney","AlfonzoMcKinnie","KlayThompson"];

const capitals = ["Kabul","Algiers","BuenosAires","Vienna","Baku","Brussels","Brasilia","Ottawa","Beijing ",
                    "Bogota ","SanJose","Prague ","Cairo","Copenhagen","Paris","Berlin","Athens","Budapest",
                    "NewDelhi","Jakarta","Tehran","Dublin","Jerusalem ","Rome","Kingston","Tokyo","Nairobi",
                    "Beirut","Tripoli","MexicoCity ","Monaco","Amsterdam ","Oslo","PanamaCity ","Lima","Warsaw",
                    "Lisbon","Bucharest ","Moscow","Singapore ","Seoul","Madrid","Khartoum","Stockholm","Damascus",
                    "Taipei","Bangkok","Ankara","AbuDhabi ","WashingtonDC"]

const category = [
    [...words],
    [...warriors],
    [...capitals]
]
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
    randomArray = category[Math.floor(Math.random()*category.length)];
    randomWord = randomArray[Math.floor(Math.random()*randomArray.length)].toUpperCase();
    console.log(randomArray);
    console.log(randomWord);
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
    if (randomArray === category[0]) {
        $("#category").text("Famous Car Brands");
    }
    if (randomArray === category[1]) {
        $("#category").text("Golden State Warriors");
    }
    if (randomArray === category[2]){
        $("#category").text("World Capitals");
    }
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
            if (guessesLeft === 0) {
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

// old code with bug

// function runGame (userPick) {
//     console.log(userPick);
//     if (guessesLeft === 0) {
//         $messageBox.textContent = "You lose!";
//         losses++;
//         $losses.textContent = losses;
//         setTimeout(() => {
//             var restart = confirm("New Game?");
//             if (restart == true) {
//                 setGame();
//             }
//             else {
//                 alert("Thank you for playing");
//             }
//         }, 1000);
//     } 
//     else {
//         for (let j = 0; j < randomWord.length; j++) {
//             if (randomWord[j] === userPick) {
//                 letters[j] = userPick;
//                 $activeWord.textContent = letters.join("");
//                 lettersLeft--;
//                 if (lettersLeft === 0) {
//                     $messageBox.textContent = "You Win!";
//                     wins++;
//                     $wins.textContent = wins;
//                     setTimeout(() => {
//                         var restart = confirm("Start New Game?");
//                         if (restart == true) {
//                             setGame();
//                         }
//                         else {
//                             alert("Thank you for playing");
//                         }   
//                     }, 1000);
//                 } 
//             }
//         }
//     }
// }

console.log(randomWord);
console.log(userPick);
console.log(lettersLeft);

