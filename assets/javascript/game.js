/* ------------------------------------------------------------------------------------------------
 * Variables
 * ------------------------------------------------------------------------------------------------ */

//Word List
var word = [
	'Alondite',
	'Amatsu',
	'Amiti',
	'Armads',
	'Audhulma',
	'Aureola',
	'Ballista',
	'Basilikos',
	'Berserk',
	'Bolting',
	'Caladbolg',
	'Creiddylad',
	'Cymbeline',
	'Devil Axe',
	'Divine',
	'Dragon Axe',
	'Dragon Spear',
	'Dragonstone',
	'Durandal',
	'Elfire',
	'Emblem Blade',
	'Ettard',
	'Excalibur',
	'Falchion',
	'Fiendcleaver',
	'Fimbulvetr',
	'Flametongue', 
	'Florete',
	'Forblaze',
	'Gespenst',
	'Gurgurant',
	'Hammerne',
	'Heal',
	'Horseslayer',
	'Iron Sword',
	'Killer Bow',
	'Killing Edge',
	'Lughnasadh',
	'Mani Katti',
	'Mend',
	'Missiletainn',
	'Nidhogg',
	'Nosferatu',
	'Onager',
	'Poison Bow',
	'Ragnell',
	'Recover',
	'Regal Sword',
	'Reginleif',
	'Rex Hasta',
	'Rienfleche',
	'Rolf\'s Bow',
	'Shamshir',
	'Sieglinde',
	'Siegmund',
	'Silver Axe',
	'Sol Katti',
	'Spear',
	'Steel Sword',
	'Tarvos',
	'Thani',
	'Warp',
	'Wo Dao',
	'Wolf Beil',
	'Wolf Berg'
	];
var chosenWord = ""; //Variable to pick word using random number
var wordGuesses = []; //Array to display blank underscores and correct user inputs
var displayWordGuesses = ""; //Display contents of wordGuesses array nicely with spaces and without commas
var allowedLetters = /[a-z]/i; //Only pushes letters to guessedLetters array
var guessedLetters = []; //Array for user guessedLetters
var userGuess; //Most current user guess
var guessesLeft = 10; //Number of guesses left
var wins = 0; //Number of wins

/* ------------------------------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------------------------------ */

//Function to pick a word
function pickWord() {
	//Chose a word by picking a random number
	chosenWord = word[Math.floor(Math.random()*word.length)];

	//Create array for blank underscores based on chosen word
	for (var i = 0; i < chosenWord.length; i++) {
		if (chosenWord.charAt(i) == " ") {
			wordGuesses.push("\xa0\xa0");
		}
		else if (chosenWord.charAt(i) == "'") {
			wordGuesses.push("'");
		}
		else {
			wordGuesses.push("_");
		}
	}
}

//Display contents in wordGuesses array nicely with spaces and without commas
function createWordGuesses() {
	displayWordGuesses = "";
	for (var i = 0; i < wordGuesses.length; i++) {
		if (chosenWord.charAt(i) == " " || chosenWord.charAt(i) == "'") {
			displayWordGuesses = displayWordGuesses + wordGuesses[i];
		}
		else {
			displayWordGuesses = displayWordGuesses + " " + wordGuesses[i];
		}
	}
	document.getElementById('word-guesses').innerHTML = displayWordGuesses;
}

//Takes guessedLetters out of array and displays letters in all caps with spaces
function displayGuessedLetters() {
	var displayLetters = "";
	for (var i = 0; i < guessedLetters.length; i++) {
		displayLetters = displayLetters + " " + guessedLetters[i].toUpperCase();
	}
	return displayLetters;
}

//Show correct image and blank underscores for chosen word
function showImageAndWordGuesses() {
	document.getElementById('weapon').innerHTML = '<img class="weapon-img" src="assets/images/items/' + chosenWord.replace(/'| /g,'').toLowerCase() + '.png">';
	document.getElementById('word-guesses').innerHTML = displayWordGuesses;
	console.log(chosenWord + ": " + displayWordGuesses);
}

//Show array of guessed letters. If there are no guessed letters yet, display a single space.
function showGuessedLetters() {
	if (displayGuessedLetters() === "") {
		document.getElementById('display-guessed-letters').innerHTML = "\xa0";
	}
	else document.getElementById('display-guessed-letters').innerHTML = displayGuessedLetters();
}

//Reset win/lose animation of speech bubble
function resetAnimationMessage() {
	document.getElementById('message').className= "bubble";
}

//Function to begin game
function game() {
	pickWord();
	createWordGuesses();
	showImageAndWordGuesses();
}

//Restarts game by reseting variables and calls game()
function restartGame() {
	wordGuesses = [];
	displayWordGuesses = "";
	guessedLetters = [];
	guessesLeft = 10;
	document.getElementById('guesses').innerHTML = "Guesses: " + guessesLeft;
	showGuessedLetters();
	setTimeout(resetAnimationMessage, 3000);
	game();
}

//Items to run when game is won
function win() {
	wins++;
	document.getElementById('message').innerHTML = 'You solved it! The word was <span class="word-win">' + chosenWord + '</span>.';
	document.getElementById('lyn-img').src = 'assets/images/text/lyn-win.gif';
	document.getElementById('wins').innerHTML = 'Wins: ' + wins;
	document.getElementById('message').className= 'bubble animated pulse';
	restartGame();
}

//Items to run when game is lost
function lose() {
	document.getElementById('message').innerHTML = 'You lost! The word was <span class="word-lose">' + chosenWord + '</span>.';
	document.getElementById('lyn-img').src = 'assets/images/text/lyn-lose.gif';
	document.getElementById('message').className= 'bubble animated pulse';
	restartGame();
}

//What happens when user presses a letter key
function letterPress() {
	//Update variable with current guessed letter
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	//Only run the code if user presses a letter key
	if (userGuess.match(allowedLetters)) {

		//If current userGuess isn't found in the word, push to the guessedLetters array
		if (chosenWord.toLowerCase().indexOf(userGuess) == -1) {

			//If first guess, add to guessedLetters array and decrease number of guesses left. Also reset animation.
			if (guessedLetters.length === 0) {
				guessedLetters.push(userGuess);
				guessesLeft--;
			}

			//If not first guess, see if already in array. If not, add to array. Then decrease number of guesses left.
			else {
				if (guessedLetters.indexOf(userGuess) == -1) {
					guessedLetters.push(userGuess);
					guessesLeft--;
				}
			}

			//Update number of guesses left
			document.getElementById('guesses').innerHTML = "Guesses: " + guessesLeft;
		}

		//If current userGuess is found in the word, do the following
		else {
			for (var i = 0; i < chosenWord.length; i++) {

				//Check if the letter at 'i' is uppercase
				if (chosenWord.charAt(i) >= "A" && chosenWord.charAt(i) <= "Z") {

					//If lowercase userGuess matches lowercase letter at 'i,' push to wordGuesses array. Also reset animation.
					if (userGuess == chosenWord.charAt(i).toLowerCase()) {
						wordGuesses.splice(i,1,userGuess.toUpperCase());
						createWordGuesses();
						console.log(chosenWord + ": " + displayWordGuesses);
					}
				}

				// Else if letter at 'i' isn't capitalized, see if it matches the current userGuess
				// and add it to the wordGuesses array if it does
				else if (userGuess == chosenWord.charAt(i)) {
					wordGuesses.splice(i,1,userGuess);
					createWordGuesses();
					console.log(chosenWord + ": " + displayWordGuesses);
				}

				//Check to see if the entire word has been guessed yet
				if (wordGuesses.indexOf("_") == -1) {
					win();
				}
			}
		}
	}

	showGuessedLetters();

	//If there are no more guesses, end game
	if (guessesLeft === 0) {
		lose();
	}
}

//Run Javascript when page loads
window.onload = function() {
	/* ------------------------------------------------------------------------------------------------
	 * Start Game
	 *
	 * For easy guessing, the word and correct guesses are logged into the console
	 * ------------------------------------------------------------------------------------------------ */

	//Initialize game
	game();

	//When a key is pressed
	document.onkeypress = function(event) {
		letterPress();
	};

	document.getElementById('restart-game').onclick = restartGame();

};