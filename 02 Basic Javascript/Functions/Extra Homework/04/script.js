// Extra Homework/04/script.js

// ------------ Task 04 ------------ <br/>
// In this challenge, a farmer is asking you to tell him how many legs can be counted among all
// his animals. The farmer breeds three species:<br/>
// chickens = 2 legs<br/>
// cows = 4 legs<br/>
// pigs = 4 legs<br/>
// Example: howManyLegs(5, 2, 8)<br/>
// output: 50<br/>

let animalInput1 = parseInt(prompt(`a farmer is asking you to tell him how many legs can
 be counted among all his animals.  
 First on the list are chickens, please enter how many chickens does he have?`));

let animalInput2 = parseInt(prompt(`Now tell him to count the cows`));
let animalInput3 = parseInt(prompt(`Now let's count the pigs`));

const cowLegs = 4;
const pigLegs = 4;
const chickenLegs = 2;
 

function countAnimalLegs(chickens, cows, pigs) {
    if (
        isNaN(chickens)  ||
        isNaN(cows)      ||
        isNaN(pigs)      ||
        chickens < 0     ||
        cows < 0         ||
        pigs < 0
    ){console.log("Please enter valid number of animals");}
    
    else{
        console.log(`There are total of ${chickens * chickenLegs + cows * cowLegs + pigs * pigLegs} animal legs on the farm.`);
    }
}

countAnimalLegs(animalInput1, animalInput2, animalInput3);