//script.js // exercise from class
/* 
EXERCISE 4
Create three inputs for numbers
Print the average of the three numbers in an h1 element
If the average is larger or the same as 10 the result should be in green
If the average is smaller than 10 the result should be red


Do this with JQuery
*/
$(document).ready(function(){

let input = $('input');
let headline = $('h2');
let button = $('button');

button.click(function(){
    let average = (parseInt(input[0].value) + parseInt(input[1].value) + parseInt(input[2].value)) / 3;
    
    headline.html(`${Math.floor(average)}`);
   
    if (average >= 10){
        headline.css(`color`, `green`);
    }  
    else {
        headline.css(`color`, `red`);
    }    
 });
});