// Extra Homework/07/script.js

// ------------- Task 07 -----------
//A bartender is writing a simple program to determine whether he should serve 
//drinks to someone. He only serves drinks to people 18 and older and when he's 
//not on break. So you need two parameters, one for user age and other for the
// bartender being on break or not.
// Given the person's age, and whether break time is in session, create a function
// which returns whether he should serve drinks.<br/>
// Example: shouldServeDrinks(17, true) output false
// Example: shouldServeDrinks(19, false) output true
// Example: shouldServeDrinks(30, true) output false

bartenderBreak = confirm(`Is the bartender on Break?
press OK for yes, and CANCEL for no.`);
let personAge;

if (bartenderBreak === true) {
   console.log(`Too bad, return to bartender when his break ends.`);
}

else{
   personAge = parseInt(prompt(`Enter the person age.`));

   if (isNaN(personAge)) {
      console.log(`Please enter a valid number.`);
   } 
   
   else if (personAge >= 18 && personAge < 120) {
      console.log(`The person is eligible for drink.`);
   } else if (personAge > 120) {
      console.log(`You must be crazy serving alcohol to such old people, it must be a zombie.`);
   }

   else { console.log(`Person is too young to drink alcohol, kick him out`); }
}
