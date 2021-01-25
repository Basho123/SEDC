// Extra Homework/05/script.js

// ------------ Task 05 ------------<br/>
// Some basic arithmetic operators are +, -, *, /, and %. In this challenge you will 
// be given three parameters, num1, num2, and an operator. Use the operator on number 1 and 2
// Example: calculate(3, 7, '*')
// output: 21<br/>

userInputNum1 = parseFloat(prompt(`you are given three parameters, num1, num2, and an operator. 
Use the operator on number 1 and 2.
a
Enter the first number`));
userInputNum2 = parseFloat(prompt(`Now enter the second number`));
userInputOperator = prompt(`Now enter one of the operators: +, -, *, /, and %.`);



function calculate(num1, num2, operator) {
   if (isNaN(num1) || isNaN(num2)) {
      console.log("Please enter valid numbers.");
   }
   else {
      switch (operator) {
         default:
            console.log("Please enter valid numbers");
            break;
         case '+':
            console.log(`The result is ${num1 + num2}.`);
            break;
         case '-':
            console.log(`The result is ${num1 - num2}.`);
            break;
         case '*':
            console.log(`The result is ${num1 * num2}.`);
            break;
         case '/':
            console.log(`The result is ${num1 / num2}.`);
            break;
         case '%':
            console.log(`The result is ${num1 % num2}.`);
            break;        
      }
   }
}

calculate(userInputNum1, userInputNum2, userInputOperator);
