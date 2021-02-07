//script.js
//morse Code

let normalTextInput = document.getElementById('normalText');
let morseCodeInput = document.getElementById('morseCode');

let button = document.getElementById('button');
let divToChange = document.getElementById('toChange');

let capitalLetters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`, ` `, `.`, `,`, `?`, `!`]
let smallLetters = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`, ` `, `.`, `,`, `?`, `!`]

let morseCode = [`.-`, `-...`, `-.-.`, `-..`, `.`, `..-.`, `--.`, `....`, `..`, `.---`, `-.-`, `.-..`, `--`, `-.`, `---`, `.--.`, `--.-`, `.-.`, `...`, `-`, `..-`, `...-`, `.--`, `-..-`, `-.--`, `--..`, `.----`, `..---`, `...--`, `....-`, `.....`, `-....`, `--...`, `---..`, `----.`, `-----`, ` `, `·−·−·−`, `--..--`, `..--..`, `-.-.--`];

let wordsAnvil = [];
let morseAnvil = [];

button.addEventListener('click', function () {
    //LETTERS TO MORSE
    divToChange.innerHTML = ``
    if (normalTextInput.value.length > 0 && morseCodeInput.value.length === 0) {
        for (let i = 0; i < normalTextInput.value.length; i++) {
            for (let g = 0; g < morseCode.length; g++) {
                if (normalTextInput.value[i] == capitalLetters[g] || normalTextInput.value[i] == smallLetters[g]) {
                    morseAnvil += morseCode[g] + ` `;
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
            for (let g = 0; g < capitalLetters.length; g++) {
                if (morseAnvil[i] == morseCode[g]) {
                    wordsAnvil += capitalLetters[g];
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
