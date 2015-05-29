/*
*	Haptic Library from The Lab - Powered by O2
*	MIT License.
*
*	This library provides a set of vibration patterns suitable for various events.
*	The HTML Vibrate API only works on devices with a built in vibrator (usually phones and tablets).
*	navigator.vibrate() currently has limited support.
*/

/*
*	navigator.vibrate() takes an array of positive integers.
*	Each integer represents time in milliseconds.
*	Even elements in the array represent time when vibration occurs.
*	Odd elements in the array represent time when the vibration is paused.
*	navigator.vibrate([200, 100, 500]); means vibrate for 200ms, pause for 100ms, vibrate for 500ms.
*	There is no way to control the intensity of the vibration.
*/

//	Set up the HTML5 Vibrate API using vendor prefixes

var vibrator = 	navigator.vibrate.bind(navigator) ||
				navigator.webkitVibrate.bind(navigator) ||
				navigator.mozVibrate.bind(navigator) ||
				navigator.msVibrate.bind(navigator);

//	A variety of vibration patterns

function sms() 	//	Vibrate with the old style Nokia pattern; ...--... (Morse code for SMS!)
{
	pause = 100;
	dot   = pause*2;
	dash  = dot*3;
	vibrator([dot, pause, dot, pause, dot,
		               pause*2, dash, pause, dash,
		               pause*2, dot, pause, dot, pause, dot]);
}

function heartBeat(repeat, speed)	//	Simulate a beating heart
{
	//	Set a default value
	repeat = repeat || 10;
	speed  = speed  || 400;

	//	Create the array of vibration patterns
	var pattern = [];

	//	Fill the array the specified number of times
	for (var i = 0; i < repeat ; i++)
	{
		pattern.push(10);
		pattern.push(20);
		pattern.push(240);
		pattern.push(40);
		pattern.push(240);
		pattern.push(40);
		pattern.push(10);
		pattern.push(speed);
	}

	//	Start vibrating
	vibrator(pattern);
}

function clunkClick()	//	Suitable for an "error" vibration.
{
	vibrator([40,80, 100]);
}

function lite(repeat)	//	A gentle vibration. We cannot set the intensity, this is a good compromise.
{
	//	Set a default value
	repeat = repeat || 10;

	//	Create the array of vibration patterns
	var pattern = [];

	//	Fill the array the specified number of times
	for (var i = 0; i < repeat; i++)
	{
		pattern.push(5);
		pattern.push(10);
	}

	//	Start vibrating
	vibrator(pattern);
}

function medium(repeat)	//	A medium vibration. We cannot set the intensity, this is a good compromise.
{
	//	Set a default value
	repeat = repeat || 10;

	//	Create the array of vibration patterns
	var pattern = [];

	//	Fill the array the specified number of times
	for (var i = 0; i < repeat; i++)
	{
		pattern.push(50);
		pattern.push(10);
	}

	//	Start vibrating
	vibrator(pattern);
}

function shaveAndAHairCut()	//	The popular tapping rhythm
{
	//                 Shave   &       a       hair    cut     two     bits!
	vibrator([100,200,100,100,100,100,200,200,100,600,200,225,200]);
}

function starWars()	//	Imperial March (Darth Vader's Theme) by John Williams
{
	vibrator([500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]);
}

function waiting(repeat)	//	Suitable for indicating that the device is waiting.
{
	//	Set a default value
	repeat = repeat || 10;

	//	Create the array of vibration patterns
	var pattern = [];

	//	Fill the array the specified number of times
	for (var i = 0; i < repeat; i++)
	{
		pattern.push(50); pattern.push(100);
		pattern.push(50); pattern.push(100);
		pattern.push(50); pattern.push(1000);
	}

	//	Start vibrating
	vibrator(pattern);
}

function countdown()	//	A 3 second countdown timer, suitable for a racing game.
{
	//                 3       2       1       Go!
	vibrator([300,700,300,700,300,700,1000]);
}

function morse(text)	// Vibrate morse code based on the supplied text
{
	//	Dot, dash gap and space
	var dot = 80;
	var dash = 300;
	var gap = 100;
	var space = 300;

	//	The patters for each letter of the alphabet, numbers and some punctuation
	var morseLetters = {
		"A": [dot, dash],
		"B": [dash, dot, dot, dot],
		"C": [dash, dot, dash, dot],
		"D": [dash, dot, dot],
		"E": [dot],
		"F": [dot, dot, dash, dot],
		"G": [dash, dash, dot],
		"H": [dot, dot, dot, dot],
		"I": [dot, dot],
		"J": [dot, dash, dash, dash],
		"K": [dash, dot, dash],
		"L": [dot, dash, dot, dot],
		"M": [dash, dash],
		"N": [dash, dot],
		"O": [dash, dash, dash],
		"P": [dot, dash, dash, dot],
		"Q": [dash, dash, dot, dash],
		"R": [dot, dash, dot],
		"S": [dot, dot, dot],
		"T": [dash],
		"U": [dot, dot, dash],
		"V": [dot, dot, dot, dash],
		"W": [dot, dash, dash],
		"X": [dash, dot, dot, dash],
		"Y": [dash, dot, dash, dash],
		"Z": [dash, dash, dot, dot],
		"0": [dash, dash, dash, dash, dash],
		"1": [dot, dash, dash, dash, dash],
		"2": [dot, dot, dash, dash, dash],
		"3": [dot, dot, dot, dash, dash],
		"4": [dot, dot, dot, dot, dash],
		"5": [dot, dot, dot, dot, dot],
		"6": [dash, dot, dot, dot, dot],
		"7": [dash, dash, dot, dot, dot],
		"8": [dash, dash, dash, dot, dot],
		"9": [dash, dash, dash, dash, dot],
		".": [dot, dash, dot, dash, dot, dash],
		",": [dash, dash, dot, dot, dash, dash],
		":": [dash, dash, dash, dot, dot, dot],
		"?": [dot, dot, dash, dash, dot, dot],
		"'": [dot, dash, dash, dash, dash, dot],
		"-": [dash, dot, dot, dot, dot, dash],
		"/": [dash, dot, dot, dash, dot],
		"(": [dash, dot, dash, dash, dot, dash],
		")": [dash, dot, dash, dash, dot, dash],
		"\"": [dot, dash, dot, dot, dash, dot]
	};

	//Loop through each letter
	var pattern = [];
	for(var i=0; i< text.length; i++) {
		var letterVibe = morseLetters[text.charAt(i).toString().toUpperCase()];
		var letterPattern = [];
		if (text.charAt(i) === ' ') {
			letterPattern.push(0);
			letterPattern.push(space);
		} else if (letterVibe !== undefined) {
			letterVibe.forEach(function(vibe) {
				letterPattern.push(vibe);
				letterPattern.push(gap);
			});
		}

		//Make sure we don't go over the limit of 128 items in the pattern
		if ((letterPattern.length + pattern.length) > 128) {
			break;
		}

		//Add letter pattern to main pattern
		letterPattern.forEach(function(letterPatternItem){
			pattern.push(letterPatternItem);
		});
	}

	//Vibrate the pattern
	vibrator(pattern);

}

function smoothCriminal()
{
	vibrator([0,300,100,50,100,50,100,50,100,50,100,50,100,50,150,150,150,450,100,50,100,50,150,150,150,450,100,50,100,50,150,150,150,450,150,150]);
}

function telephone(repeat)
{
	repeat = repeat || 3 // ring 3 times by default
	
	var pattern = [];
	
	for (var i=0; i < repeat; i++) {
		
		pattern.push(550);
		pattern.push(100);
		pattern.push(550);
		pattern.push(1600);
		
	}
	
	vibrator(pattern);
}

function shortAndSharp(repeat)
{
	repeat = repeat || 1
	
	var pattern = [];
	
	for (var i=0; i < repeat; i++) {
		
		pattern.push(50);
		pattern.push(100);
		pattern.push(300);
		pattern.push(75);
		pattern.push(50);
		pattern.push(75);
		pattern.push(50);
		pattern.push(1000);
		
	}
	
	vibrator(pattern);
	
}
