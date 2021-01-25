// Extra Homework/9999/script.js
// EXTRA TASK
// Funckija so dva vlezni parametri, prviot parametar e intArray[], vtoriot e samo int(nekoj broj),
// da se vrati brojot od nizata sto ima najgolem ostatok pri delenje so brojot od vtoriot parametar. Dokolku vo slucaj da ima dva broja so ist ostatok, da se vrati pogolemiot od niv.

let array = [355, 3455, 25665, 31313];
let number = 24;

let remainder = [];
let result = [];

function nekojaFunkcija(intArray, nekojBroj) {
    for (i = 0; i < intArray.length; i++) {
        for (j = 0; j < 1; j++) {
            remainder[j] = intArray[i] % nekojBroj;
            result.push(remainder[j]);    
            
        }
    }

    for (i = 0; i < result.length; i++) {
        for (j = 0; j < result.length; j++) {
            if (result[i] < result[j]) {      
                [result[i], result[j]] = [result[j], result[i]]
              }            
        }
    }
}

nekojaFunkcija(array, number);

console.log(result);

console.log(
    `racno vneseni ${array[0] % number} ${array[1] % number} ${array[2] % number} ${array[3] % number}`)

