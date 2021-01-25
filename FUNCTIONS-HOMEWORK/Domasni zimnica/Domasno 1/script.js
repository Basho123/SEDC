// domasno 1/script.js

let userInput = parseInt(prompt("Enter your birth year to see which is in Chinese Zodiac"));

let zodiac = (userInput - 4) % 12;

console.log(zodiac);

switch (zodiac) {
    case 0:
        console.log("You are born in the year of the Rat");        
    break;
    case 1:
        console.log("You are born in the year of the Ox");        
    break;
    case 2:
        console.log("You are born in the year of the Tiger");        
        break;    
    case 3:
        console.log("You are born in the year of the Rabbit");        
        break;
    case 4:
        console.log("You are born in the year of the Dragon");        
        break;
    case 5:
        console.log("You are born in the year of the Snake");        
        break;
    case 6:
        console.log("You are born in the year of the Horse");        
        break;
    case 7:
        console.log("You are born in the year of the Goat");        
        break;
    case 8:
        console.log("You are born in the year of the Monkey");        
        break;
    case 9:
        console.log("You are born in the year of the Rooster");        
        break;
    case 10:
        console.log("You are born in the year of the Dog");        
        break;
    case 11:
        console.log("You are born in the year of the Pig");        
        break;
        

    default:
        console.log("Please enter a valid number");
        break;
}