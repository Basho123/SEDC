//Domasno 3/script.js

let typePrompt = prompt("Enter 'Dog' to check how many human years does a dog have for given dog years, or enter 'Human' to see how many dog years a human have for given years.")
let yearPrompt = parseInt(prompt("Enter the number of years to be converted"));


12
function dogYearCalculator(year, type) {
    switch (type) {
        default:
            console.log("Please input valid data");
            break;

        case 'dog':
        case 'Dog':
            console.log("The dog is " + year*7 + " years old");       
            break;      

        case 'human':
        case 'Human':
            console.log("The human is " + year/7 + " years old");
            break;          
    }
}

dogYearCalculator(yearPrompt,typePrompt);