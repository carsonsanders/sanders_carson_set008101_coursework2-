/* exported myFunction */
function encrypt() {
    
    //Gets message into array of characters
    var form = document.getElementById("form1");
    var message = form.elements["message"].value.toLowerCase();
    var characters = message.split("");
    
    // Shift for ceaser cipher
    var shiftAmount = 3 //form.elements["shift"].value;
    
	//alphabet for shifting
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
    
	//This loop takes each character in our array and shifts it to its new encrypted letter
    var i;
    for (i = 0; i<characters.length;i++) {
		if (characters[i] == " ") continue;
        var position = alphabet.indexOf(characters[i]);
        characters[i] = alphabet[position + shiftAmount];
    }
    
    var encryptMessage = characters.join("");
    
	//alert(shiftAmount);
    //alert(encryptMessage);
	document.getElementById("output").innerHTML = "Encrypted Message: " + encryptMessage;
}

/* exported myFunction */
function decrypt() {
	//Gets message into array of characters
    var form2 = document.getElementById("form2");
    var message2 = form2.elements["message2"].value.toLowerCase();
    var characters2 = message2.split("");
    
    // Shift for ceaser cipher
    var shiftAmount2 = 3 //form.elements["shift"].value;
    
	//alphabet for shifting
    var alphabet2 = ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a" ];
    
	//This loop takes each character in our array and shifts it to its new encrypted letter
    var i;
    for (i = 0; i<characters2.length;i++) {
		if (characters2[i] == " ") continue;
        var position = alphabet2.indexOf(characters2[i]);
        characters2[i] = alphabet2[position + shiftAmount2];
    }
    
    var encryptMessage2 = characters2.join("");
    
	//alert(shiftAmount);
    //alert(encryptMessage);
	document.getElementById("output2").innerHTML = "Decrypted Message: " + encryptMessage2;
}

var output;
/* exported myFunction */
function morse() {
	//Gets input into array of characters
	var form = document.getElementById("form1");
    var message = form.elements["message"].value.toLowerCase();
    var characters = message.split("");
	
	var myMap = new Map();
	
	//Key for Morse code translations
	myMap.set("a" , "*-  ");
	myMap.set("b" , "-***  ");
	myMap.set("c" , "-*-*  ");
	myMap.set("d" , "-**  ");
	myMap.set("e" , "*  ");
	myMap.set("f" , "**-*  ");
	myMap.set("g" , "--*  ");
	myMap.set("h" , "****  ");
	myMap.set("i" , "**  ");
	myMap.set("j" , "*---  ");
	myMap.set("k" , "-*-  ");
	myMap.set("l" , "*-**  ");
	myMap.set("m" , "--  ");
	myMap.set("n" , "-*  ");
	myMap.set("o" , "---  ");
	myMap.set("p" , "*--*  ");
	myMap.set("q" , "--*-  ");
	myMap.set("r" , "*-*  ");
	myMap.set("s" , "***  ");
	myMap.set("t" , "-  ");
	myMap.set("u" , "**-  ");
	myMap.set("v" , "***-  ");
	myMap.set("w" , "*--  ");
	myMap.set("x" , "-**-  ");
	myMap.set("y" , "-*--  ");
	myMap.set("z" , "--**  ");
	
	//This loop converts our array of input characters into morse code
	var i;
    for (i = 0; i<characters.length;i++) {
		if (characters[i] == " ") continue;
        
        characters[i] = myMap.get(characters[i]);
    }
	
	// The array of morse code is joined into a single string
	var output = characters.join("");
	
	//The string is outputed to the HTML document
	document.getElementById("output").innerHTML = output;
}


////////////////////////////////////////////Morse Code/////////////////////////////////////////////
//iter tracker for playing sounds
var iter
// morsecode message needed it between multiple functions, made it global
var morseCode

function playSound(){
	//sets iterator and gets input message
	iter = 0;
	morseCode = document.getElementById("output").innerHTML.split("");

	//starts player
	player();
}

/*exported myFunction*/
function player(){
	
	//Plays sound of current character in array, then recursivley calls itself after a small delay.
	if (morseCode[iter] == "*") starPlay();
	if (morseCode[iter] == "-") dashPlay();
	iter++
	if (iter >= morseCode.length) return;
	setTimeout(player, 200);

}

//Function to play '-' morse code
function dashPlay(){
	var dash = new Audio('dash.wav');
	dash.play();
}

//Function to play '*' morse code
function starPlay(){
	var star = new Audio('star.wav');
	star.play();
}

var morseOut = " ";

function dashWrite(){
	dashPlay();
	morseOut += "-";
	//updateMorse();
}

function starWrite(){
	starPlay();
	morseOut += "*";
	//updateMorse();
}

function space(){
	morseOut += " ";
	updateMorse();
}

function updateMorse(){
	
	var myMap = new Map();
	
	myMap.set("*-", "a");
	myMap.set("-***", "b");
	myMap.set("-*-*", "c");
	myMap.set("-**", "d");
	myMap.set("*", "e");
	myMap.set("**-*", "f");
	myMap.set("--*", "g");
	myMap.set("****", "h");
	myMap.set("**", "i");
	myMap.set("*---", "j");
	myMap.set("-*-", "k");
	myMap.set("*-**", "l");
	myMap.set("--", "m");
	myMap.set("-*", "n");
	myMap.set("---", "o");
	myMap.set("*--*", "p");
	myMap.set("--*-", "q");
	myMap.set("*-*", "r");
	myMap.set("***", "s");
	myMap.set("-", "t");
	myMap.set("**-", "u");
	myMap.set("***-", "v");
	myMap.set("*--", "w");
	myMap.set("-**-", "x");
	myMap.set("-*--", "y");
	myMap.set("--**", "z");
	
	document.getElementById("morseOut").innerHTML = morseOut;
	var code = morseOut.split(" ");
	var textOut = "";
	for (i = 1; i<=code.length;i++) {
		if (myMap.get(code[i]) == null) continue;
		textOut += " " + myMap.get(code[i]);	
	}
	document.getElementById("textOut").innerHTML = textOut;

}