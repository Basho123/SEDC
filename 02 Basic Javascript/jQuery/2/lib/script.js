//script.js // exercise 2
/*HOMEWORK PART 2
Create a header generator

Create two inputs, one for text and one for color
Create a button that says: generate h1
Create an h3 element for messages
When the button is clicked create a new header below the inputs and button
The new header should have the text and color from the inputs
If the person enters an invalid color or an empty text show an error message 
to the message element
 You must use JQuery to complete the task */

$(document).ready(function () {

    let textInput = $("#text")[0];
    let textColor = $("#textColor")[0];
    let paletteColor = $("#paletteColor")[0];
    let button = $('button');
    console.log(paletteColor.value);

    button.click(function () {        
        if (textColor.value.length !== 0) {
            header = button.after(`<h1 style="color: ${textColor.value}">${textInput.value}</h1>`);
            textColor.value = '';
        }
        else {
           button.after(`
           <h3> You didn't inputed in the color text anything, so the color palette color will be used </h3>
           <h1 style="color: ${paletteColor.value}">${textInput.value}</h1>`);
        }
    });



});