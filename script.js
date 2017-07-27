var words = ['hello', 'apple', 'mouse', 'coffee', 'lantern', 'mug', 'sausage'];
var correctLettersGuessed = 0;
var currentWord = [];
var guesses = 12;
var wins = 0;
var guessedLetters = []
var letters;

function write(id, content, join)
{
	if (join)
	{
		content = content.join(" ");
	}

	document.getElementById(id).innerHTML=content;
}

function colorOfAlreadyGuessed(color)
{
	var getText = document.getElementById("alreadyGuessed").innerHTML;
	var changeColor = getText.fontcolor(color);
	write('alreadyGuessed', changeColor, false)
}

function clearEverything()
{
	correctLettersGuessed = 0;
	currentWord = [];
	guesses = 12;
	guessedLetters = []
	letters;
	write('userGuesses', "", false);
}

function resetGame(numberOfWins)
{
	//Setting up word bank and picking one at random.
	var index = Math.floor(Math.random() * words.length);
	var wordToGuess = words[index];
	write('test', wordToGuess, false); //Showing the word the computer picked for debugging purposes.

	//Splitting up the word into its individual letters - letters is an array of letters.
	//We're also setting up a boolean correctLettersGuessed to keep track of when/if the users wins.
	//The user wins when correctLettersGuessed = letter.length.
	letters = wordToGuess.split("");

	//Defining the Current Word array, intially set to all blank letters. This is the array that will change as the user makes guesses.
	for (var i=0; i<letters.length; i++)
	{
		currentWord.push('____');
	}
	write('currentWord', currentWord, true)

	//Declaring variables and setting their intial values.
	write('guesses', guesses, false);
	write('wins', numberOfWins, false);
}

if (wins==0)
{
	resetGame(0);
}

//The events that occur when the User presses a key.
document.onkeyup = function(event)
{
	//Setting the pressed key to lowercase just for consistency.
	var guessedLetter = event.key.toLowerCase();

	//We assume that the users guessed letter has not already been guessed
	alreadyGuessed = false;

	//This loop goes through all letters that have been already guessed.
	for (var i=0; i<guessedLetters.length; i++)
	{
		//If the user's letter has already been guessed, we set the alreadyGuessed Boolean to true.
		if (guessedLetter === guessedLetters[i])
		{
			alreadyGuessed = true;
			break;
		}
	}


	//If the previous loop did not set alreadyGuessed to true, that means the user has yet to guess it 
	//so we now put it in the guessedLetters array and also print it to the document as a guessed letter
	if(alreadyGuessed == false)
	{
		guessedLetters.push(guessedLetter);
		var userGuesses = document.getElementById("userGuesses").innerHTML;
		var updatedUserGuesses = userGuesses.concat(' '+guessedLetter);
		write('userGuesses', updatedUserGuesses, false);
	}

	//We now assume that the letter the user guessed is an incorrect letter
	var correctGuess = false;

	//This loop looks through all letters of the word that is to be guessed.
	for (var i=0; i<letters.length; i++)	
 	{

 		//If the user guessed a letter correctly, we set the boolean correctGuess to true and replace the blank space in currentWord
 		//with the letter that was guessed.  This loop will go through all letters in the word so it will print duplicates if
 		//there are any.  
		if (guessedLetter == letters[i])
		{
			correctGuess = true;
			currentWord.splice(i, 1, guessedLetter);
			write('currentWord', currentWord, true);
			correctLettersGuessed = correctLettersGuessed + 1
		}
	}

	//If the user guessed incorrectly...
	if (correctGuess==false)
	{
		//...and also has not guessed this letter before, we subtract one from the guess total and write to the document.
		if (alreadyGuessed==false)
		{
			guesses = guesses - 1;
			write('guesses', guesses, false);
		}
	}

	if (correctLettersGuessed == letters.length)
	{
		wins = wins + 1;
		write('wins', wins, false);
		clearEverything();
		resetGame(wins);
	}
}