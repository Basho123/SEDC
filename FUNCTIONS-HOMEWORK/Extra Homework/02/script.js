// Extra Homework/02/script.js

// ------------ Task 02 --------------
// Write a function that takes an integer minutes and converts it to seconds.
// Example: convert(5)
// output 300

let userInput = parseInt(prompt("Enter desired minutes to be converted to seconds"));

function minutesToSeconds(minutes){
    
    if(isNaN(minutes) || minutes < 0){
        console.log("Please enter a valid number");            
    }
    else{
        console.log(`There are ${minutes * 60} seconds in ${userInput} minutes.
    
also there are ${minutes / 60} hours, ${minutes / 60 / 24} days, 
${minutes / 60 / 24 / 7} weeks, and even ${minutes / 60 / 24 / 30} months.
        
A beam of light will travel ${minutes * 60*299792} Kilometers, or 
${(minutes * 60 * 299792) / (299792 * 3600 * 24 * 365)} light years.`);
    }
}

minutesToSeconds(userInput);

