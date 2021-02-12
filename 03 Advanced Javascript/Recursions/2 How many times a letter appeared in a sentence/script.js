//script.js letter counter

let input = document.getElementById('input');
let input2 = document.getElementById('input2');
let button = document.getElementById('button');
let anvil = document.getElementsByTagName('h2')[0];


let globalCounter = 0;

let findLetter = (word, letter) => {
    if (word === "") {
        return "";
    }
    else if (word[0] === letter) {
        globalCounter++;
        findLetter(word.substr(1), letter);
    }
    else {       
        findLetter(word.substr(1), letter);      
    }
    return globalCounter;
}

button.addEventListener(`click`, () => {
    
    anvil.innerHTML = `The letter '${input2.value}' in the word '${input.value}' is consisted '${findLetter(input.value, input2.value)}' times`
    
    globalCounter = 0;
})
