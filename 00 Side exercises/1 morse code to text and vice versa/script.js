//script.js
//morse Code

let normalTextInput = document.getElementById('normalText');
let morseCodeInput = document.getElementById('morseCode');

let button = document.getElementById('button');
let divToChange = document.getElementById('toChange');

const morseCode = [`.-`, `-...`, `-.-.`, `-..`, `.`, `..-.`, `--.`, `....`, `..`, `.---`, `-.-`, `.-..`, `--`, `-.`, `---`, `.--.`, `--.-`, `.-.`, `...`, `-`, `..-`, `...-`, `.--`, `-..-`, `-.--`, `--..`, ` `, `-.-.--`, `.-..-.`,`.... .- ... .... - .- --.`,`...-..-`,`.--. . .-. -.-. . -. -`,`.-...`,``,'-.--.','-.--.-','... - .- .-.','.-.-.','--..--','-....-',`.-.-.-`,'-..-.',`-----`,`.----`, `..---`, `...--`, `....-`, `.....`, `-....`, `--...`, `---..`, `----.`,`---...`,`-.-.-.`,`.-.. . .-. ..-. - .- .-. .-. --- .--`,`-...-`,`.-. .. --. .... - .- .-. .-. --- .--`,`..--..`,`.--.-.`];

//CHARACTERS ARE GENERATED HERE
let characterArray = [];
//THIS IS THE CHARACTER CLASS
class Character {
    constructor(capitalLetter, lowercaseLetter, morse) {
        this.capitalLetter = capitalLetter;
        this.lowercaseLetter = lowercaseLetter;
        this.morse = morse;
    }    
}
//THIS GENERATES THE CHARACTERS
for (let i = 0; i < 26; i++) {
    characterArray.push(new Character(String.fromCharCode(65 + i), String.fromCharCode(97 + i), morseCode[i]))
}
for (let i = 0; i < 33; i++) {
    characterArray.push(new Character(String.fromCharCode(32 + i), String.fromCharCode(32 + i), morseCode[26+i]))
}
//THESE ARE IMBUED WITH WORDS OR SIGNS
let wordsAnvil = [];
let morseAnvil = [];

button.addEventListener('click', function () {
    //LETTERS TO MORSE
    divToChange.innerHTML = ``
    if (normalTextInput.value.length > 0 && morseCodeInput.value.length === 0) {
        for (let i = 0; i < normalTextInput.value.length; i++) {
            for (let g = 0; g < morseCode.length; g++) {
                if (normalTextInput.value[i] == characterArray[g].capitalLetter || normalTextInput.value[i] == characterArray[g].lowercaseLetter) {
                    morseAnvil += characterArray[g].morse + ` `;
                    if (normalTextInput.value[i] == ` `) {
                        morseAnvil += `&nbsp;&nbsp;&nbsp`;
                    }
                    break;
                }
            }
        }
        divToChange.innerHTML = `
        <h3>The text to be converted:</h3>
         <p> ${normalTextInput.value} </p>
        <h3>The text converted in morse code:</h3>
         <p> ${morseAnvil} </p>
        `
    }
    //MORSE TO LETTERS
    if (normalTextInput.value.length === 0 && morseCodeInput.value.length > 0) {
        morseCodeInput.value += ` `;

        //WE WELD TOGETHER ALL THE CHARACTERS WITH THIS STATEMENT AFTER EACH SPACE
        morseAnvil = morseCodeInput.value.split(" ");

        //THIS CHANGES THE GIVEN SIGNAL TO ITS CORELATING LETTER
        for (let i = 0; i < morseAnvil.length; i++) {
            for (let g = 0; g < characterArray.length; g++) {
                if (morseAnvil[i] == morseCode[g]) {
                    wordsAnvil += characterArray[g].capitalLetter;
                    break;
                }
                //IF EMPTY SPACE IS FOUND, INSERT A SPACE
                if (morseAnvil[i] == ``) {
                    wordsAnvil += ` `;
                    break;
                }
            }
        }
        divToChange.innerHTML = `
        <h3>The morse code to be converted:</h3>
         <p> ${morseCodeInput.value} </p>
        <h3>The morse code converted in text:</h3>
         <p> ${wordsAnvil} </p>
        `
    }

    if (normalTextInput.value.length > 0 && morseCodeInput.value.length > 0) {
        alert(`Please enter either text or morse code, not both.`);
    }
    if (normalTextInput.value.length === 0 && morseCodeInput.value.length === 0) {
        alert(`Input fields are empty.`);
    }

    normalTextInput.value = ``;
    morseCodeInput.value = ``;
    wordsAnvil = [];
    morseAnvil = [];

    console.log(`dots after`, morseCodeInput.value.length);
    console.log(`letters after`, normalTextInput.value.length);
})