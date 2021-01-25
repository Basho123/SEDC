//script.js

// BONUS HOMEWORK
// Create a recipe page from inputs

// Ask the user for the name of the recipe
// Ask the user how many ingredients do we need for the recipe
// Ask the user for the name of every ingredient
// Print the name of the recipe in the HTML as heading element, ex: h1-h6
// Print all ingredients as an unordered list in the HTML
// Extra: Use a table if you want to be fancy :)


let ingredients = [];
let amountOfIngredients = [];


//HEADLINE INPUT PROMPT
let recipeName = prompt(`Enter recipe name`);

//INFINITE INGREDIENT INPUT LOOP, STOPPED WITH ESCAPE OR CANCEL
if (recipeName !== null) {    

    //HEADLINE NAME CHANGED HERE
    document.getElementById('dish-name').innerText = recipeName;

    //THIS WILL ADD THE INGREDIENTS IN THE ARRAYS THAT ARE DECLARED FIRST IN THE SCRIPT
    alert(`Please input your ingredients, first the name, then the amount, then, press escape button or 'Cancel' to end ingredient input.`);
    for (let i = 0; i < Infinity; i++) {
        let ingredientPrompt = prompt(`Enter ingredient number ${i + 1}`);
        if (ingredientPrompt === null) {
            break;
        }
        else { ingredients.push(ingredientPrompt); }

        let ingredientAmountPrompt = prompt(`Enter amount for ingredient number ${i + 1} in grams`)
        if (ingredientAmountPrompt === null) {
            break;
        }
        else { amountOfIngredients.push(ingredientAmountPrompt); }
    }  

    //THIS WILL ADD THE STRINGS FROM THE FIRST TWO ARRAYS AND MAKE NEW TD WITH THE CORESPONDING ARRAYS
    for (let i = 0; i < ingredients.length; i++) {
        document.getElementById("table-body").innerHTML += `<tr>
                                <td style = "text-align: left;" class = "tableStyle${i%2}"> ${ingredients[i]} </td>
                                <td style = "text-align: right; color: rgb(${Math.random()*155+100},${Math.random()*155+100},${Math.random()*155+100});" class = "tableStyle${i%2}"> ${amountOfIngredients[i]} grams </td>
                            </tr>`
    } 

    //THIS WILL ADD THE TIME NEEDED FOR COOKING AND SERVINGS AMOUNT
    let timePrompt = prompt("How much time in minutes is the dish prepared?");
    let servings = prompt("How many servings does this dish have?");
    document.getElementById("table-footer").innerHTML = `<tr>
    <td class = "footer"> ${timePrompt} minutes cooking time. </td>
    <td class = "footer"> ${servings} servings</td>
</tr>`

}
else{
    alert('Please reload the page and enter valid data!')
}
