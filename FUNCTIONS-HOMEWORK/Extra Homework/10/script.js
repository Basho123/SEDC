// Extra Homework/10/script.js

// For each of the 6 coffee cups I buy, I get a 7th cup free. In total, I get 7 cups. Create a function that takes n cups bought and return as an integer the total number of cups I would get.
// Example: totalCups(6) output 7
// Example: totalCups(12) output 14
// Example: totalCups(213) output 248

coffeeCupsPrompt = parseInt(prompt(`Check how many coffee cups you would get for free with our new offer`));

function freeCoffee(cups) {   

   if (isNaN(cups) || cups < 1) {
      console.log(`Please enter a valid number.`);      
   }else if (cups < 6){
      console.log(`You got only ${cups} cups of coffee, with no bonus. You should get ${6 - cups} more cups of coffee to get 1 free cup of cofee.`);
   }
   
   else { console.log(`You will get a total of ${Math.floor(cups / 6) + cups} cups of coffee,
Horray, you got ${Math.floor(cups / 6)} cups of coffee free.`); }
}


freeCoffee(coffeeCupsPrompt);