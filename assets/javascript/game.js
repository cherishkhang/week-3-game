//Run Javascript when page loads
window.onload = function() {

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
		]
	var randomNumber; //Variable for random number
	var chosenWord = ""; //Variable to pick word using random number
	var underscores = []; //Array to display blank underscores
	var displayUnderscores = ""; //Display contents of underscores array nicely with spaces and without commas
	var allowedLetters = /[A-Z]/i; //Only pushes letters to guessedLetters array
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
				underscores.push("\xa0\xa0");
			}
			else if (chosenWord.charAt(i) == "'") {
				underscores.push("'");
			}
			else {
				underscores.push("_");
			}
		}
	}

	//Create nice display for contents in underscores array
	function createDisplayUnderscores() {
		displayUnderscores = "";
		for (var i = 0; i < underscores.length; i++) {
			if (chosenWord.charAt(i) == " " || chosenWord.charAt(i) == "'") {
				displayUnderscores = displayUnderscores + underscores[i];
			}
			else {
				displayUnderscores = displayUnderscores + " " + underscores[i];
			}
		}
		document.getElementById('underscores').innerHTML = displayUnderscores;
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
	function showImageAndUnderscores() {
		document.getElementById('weapon').innerHTML = '<img src="assets/images/items/' + chosenWord.replace(/'| /g,'').toLowerCase() + '.png">';
		document.getElementById('underscores').innerHTML = displayUnderscores;
		console.log(chosenWord + ": " + displayUnderscores);
	}

	//Show array of guessed letters
	function showGuessedLetters() {
		document.getElementById('display-guessed-letters').innerHTML = displayGuessedLetters();
	}

	//Function to begin game
	function game() {
		pickWord();
		createDisplayUnderscores();
		showImageAndUnderscores();
	}

	//Restarts game by reseting variables and calls game()
	function restartGame() {
		underscores = [];
		displayUnderscores = "";
		guessedLetters = [];
		guessesLeft = 10;
		document.getElementById('guesses').innerHTML = "Guesses: " + guessesLeft;
		showGuessedLetters();
		game();
	}

	//What happens when user presses a letter key
	function letterPress() {
		//Update variable with current guessed letter
		userGuess = String.fromCharCode(event.keyCode).toLowerCase();

		//Only run the code if user presses a letter key
		if (userGuess.match(allowedLetters)) {

			//If current userGuess isn't found in the word, push to the guessedLetters array
			if (chosenWord.toLowerCase().indexOf(userGuess) == -1) {

				//If first guess, add to guessedLetters array and decrease number of guesses left
				if (guessedLetters.length == 0) {
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

						//If lowercase userGuess matches lowercase letter at 'i,' push to underscores array
						if (userGuess == chosenWord.charAt(i).toLowerCase()) {
							underscores.splice(i,1,userGuess.toUpperCase());
							createDisplayUnderscores();
							console.log(chosenWord + ": " + displayUnderscores);
						}
					}

					//Else if letter at 'i' isn't capitalized, see if it matches the current userGuess
					else if (userGuess == chosenWord.charAt(i)) {
						underscores.splice(i,1,userGuess);
						createDisplayUnderscores();
						console.log(chosenWord + ": " + displayUnderscores);
					}

					//Check to see if the entire word has been guessed yet
					if (underscores.indexOf("_") == -1) {
						wins++;
						document.getElementById('message').innerHTML = "You solved it! The word was " + chosenWord + ".";
						document.getElementById('wins').innerHTML = "Wins: " + wins;
						restartGame();
					}
				}
			}
		}

		showGuessedLetters();

		//If there are no more guesses, end game
		if (guessesLeft == 0) {
			document.getElementById('message').innerHTML = "You lost! The word was " + chosenWord + ".";
			restartGame();
		}
	}

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
	}

	document.getElementById('restart-game').onclick = function() {
		restartGame();
	};

}