//script.js
//reverse a word
//Write a function that will reverse a string as output (any string), using recursion e.g. Hello -> olleH

let input = document.getElementById('input');
let button = document.getElementById('button');
let anvil = document.getElementsByTagName('h2')[0];

let reverse = (word) => input === `` ? `` : reverse(word.substr(1)) + word.charAt(0);     
button.addEventListener(`click`, () => anvil.innerHTML = `The word '${input.value}' reversed is '${reverse(input.value)}'`)

