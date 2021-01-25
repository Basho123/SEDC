// Extra Homework/06/script.js

// ------------- Task 06 -----------
// Create a function that takes two strings as arguments 
//and return either true or 
//false depending on whether the total number of 
//characters in the first string is equal to the total number
// of characters in the second string.
// Example: comp("ABC", "DE")
// output false       

let string1 = prompt("Measure word length in characters typed, type your first statement.");
let string2 = prompt("Measure word length in characters typed, type your second statement.");

function wordLengthChecker(word1, word2) {

   if (word1 === null || word2 === null || word1.length < 1 && word2.length < 1) {
      console.log("Please input some characters on the keypad");
   }   

   else if (word1.length > word2.length) {
      console.log(`The statement '${word1} 'is longer than '${word2}'`);
   }else if (word2.length > word1.length) {
      console.log(`The statement '${word1}' is shorter than '${word2}'`);
   }else { console.log(`The statement '${word1}' is equal of length with '${word2}'`) }
}


wordLengthChecker(string1, string2);
