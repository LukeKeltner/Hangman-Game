function write(id, content)
{
	document.getElementById(id).innerHTML=content;
}


var words = ['hello', 'apple', 'mouse', 'coffee', 'lantern', 'mug', 'sausage', '98638643862345879'];

var wordToGuess = Math.floor(Math.random() * words.length);

write('test', words[wordToGuess]);

var letters = words[wordToGuess].split("");
  
document.getElementById("split").innerHTML = letters;

var empty = [];

for (var i=0; i<letters.length; i++)
{
	empty.push('____');
}


empty = empty.join('	');

document.getElementById("empty").innerHTML = empty;
times = 0;

document.onkeyup = function(event)
{
	for (var i=0; i<letters.length; i++)	
 	{
		document.getElementById("pressed").innerHTML = event.key
		document.getElementById("checking").innerHTML = letters[i]

		if (event.key == letters[i])
		{
			//document.getElementById("empty").innerHTML = 'You pressed the right letter!';
			document.getElementById("empty").innerHTML = 'empty is '+empty;
			times = times + 1;
		}

		else
		{
			document.getElementById("empty").innerHTML = 'noooooooo!'
		}
	}

	write('times', times);
}