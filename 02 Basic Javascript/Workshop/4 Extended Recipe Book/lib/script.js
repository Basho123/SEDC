//script.js
//extended recipe book

// Task 4
// Write a JavaScript page that can save recipes in a table.
// There should be inputs for:
// Name
// Ingredients ( strings )
// TimeToMake
// The recipes in the table should have a delete button that delets the table row
// Below the table there should be 3 buttons
// Show recipe that takes the longest time to make, show recipe that takes the shortest time to make and show all
// The buttons should change the table to only show that recipe or show all recipes


//DOM TARGETING
let recipeNameInput = document.getElementById('recipeNameInput');
let ingredientsInput = document.getElementById('ingredientsInput');
let timeToMakeInput = document.getElementById('timeToMakeInput');

let postButton = document.getElementsByTagName('button')[0];

let showLongest = document.getElementsByTagName('button')[1];
let showShortest = document.getElementsByTagName('button')[2];
let showAll = document.getElementsByTagName('button')[3];

let tBody = document.getElementsByTagName('tbody')[1]; //must be 1 beacuse 0 takes <tHead> value instead

//THIS IS ACTUALLY TARGETED AFTER IT IS CREATED
let spliceButton = document.getElementsByClassName('spliceButton');

//ARRAYS TO SAVE STRINGS
let recipeNameArr = [];
let ingredientsArr = [];
let timeToMakeArr = [];
let spliceButtonValueArr = [];



//SAVE BUTTON
postButton.addEventListener('click', function () {

    //ALERT IF ANY FIELD IS EMPTY
    if (
        recipeNameInput.value === `` ||
        ingredientsInput.value === `` ||
        timeToMakeInput.value == ``
    ) {
        alert(`Please fill all the fields`);
    }

    
    else {
        
        //FIRST CLEAR THE INNER HTML
        tBody.innerHTML = ``;
        
        //THEN ADD THE INPUT FIELD VALUES TO THE ARRAYS
        recipeNameArr.push(recipeNameInput.value)
        ingredientsArr.push(ingredientsInput.value)
        timeToMakeArr.push(timeToMakeInput.value)
        spliceButtonValueArr.push(`Delete this recipe`);

        //LOOP TO PRINT THE ARRAYS IN TABLE
        for (i = 0; i < recipeNameArr.length; i++) {
            tBody.innerHTML += `
        <tr> 
            <td>${i + 1}</td>        
            <td>${recipeNameArr[i]}</td>
            <td>${ingredientsArr[i]}</td>
            <td>${timeToMakeArr[i]} minutes</td>
            <td><button class = "spliceButton">${spliceButtonValueArr[i]}</button></td>
        </tr>
        `
        }

        //THIS IS FOR THE DELETE BUTTON
        for (let i = 0; i < spliceButtonValueArr.length; i++) {
            spliceButton[i].addEventListener('click', function (event) {                
            //WE USE ARRAY SPLICE TO REMOVE THE ITEMS DELETED FROM THE ARRAY
                recipeNameArr.splice([i], 1);
                ingredientsArr.splice([i], 1);
                timeToMakeArr.splice([i], 1);
                spliceButtonValueArr.splice([i], 1);
            //AND THEN DELETE THE PARENT NODE HTML ELEMENT
                event.target.parentNode.parentNode.remove(event.parentNode)
            }, false)
        };

        //CLEAR ALL THE VALUES
        recipeNameInput.value = ``
        ingredientsInput.value = ``
        timeToMakeInput.value = ``
    }
})

//SHOW LONGEST RECIPE BUTTON
showLongest.addEventListener('click', function () {
    tBody.innerHTML = ``;
    let longestTime = 0;

    //CHECK WITH longestTime variable and replace the HTML if passed
    for (i = 0; i < recipeNameArr.length; i++) {
        if (timeToMakeArr[i] > longestTime) {
            longestTime = timeToMakeArr[i];
            tBody.innerHTML = `
            <tr> 
                <td>${i + 1}</td>        
                <td>${recipeNameArr[i]}</td>
                <td>${ingredientsArr[i]}</td>
                <td>${timeToMakeArr[i]} minutes</td>
                <td><button class = "spliceButton">${spliceButtonValueArr[i]}</button></td>
            </tr>
            `
        }
    }
})


//SHOW SHORTEST RECIPE BUTTON
showShortest.addEventListener('click', function () {
    tBody.innerHTML = ``;
    let shortestTime = Infinity;

    //CHECK WITH shortestTime variable and replace the HTML if passed
    for (i = 0; i < recipeNameArr.length; i++) {
        if (timeToMakeArr[i] < shortestTime) {
            shortestTime = timeToMakeArr[i];
            tBody.innerHTML = `
            <tr> 
                <td>${i + 1}</td>        
                <td>${recipeNameArr[i]}</td>
                <td>${ingredientsArr[i]}</td>
                <td>${timeToMakeArr[i]} minutes</td>
                <td><button class = "spliceButton">${spliceButtonValueArr[i]}</button></td>
            </tr>
            `
        }
    }
})


//SHOW ALL RECIPES BUTTON
showAll.addEventListener('click', function () {

    //THIS IS JUST A COPY OF THE SAVE BUTTON CLICK FUNCTION, BUT WITHOUT THE ARRAY PUSH THINGS

    tBody.innerHTML = ``;
    for (i = 0; i < recipeNameArr.length; i++) {
        tBody.innerHTML += `
        <tr> 
            <td>${i + 1}</td>        
            <td>${recipeNameArr[i]}</td>
            <td>${ingredientsArr[i]}</td>
            <td>${timeToMakeArr[i]} minutes</td>
            <td><button class = "spliceButton">${spliceButtonValueArr[i]}</button></td>
        </tr>
        `
    }
    for (let i = 0; i < spliceButtonValueArr.length; i++) {
        spliceButton[i].addEventListener('click', function (event) {
            recipeNameArr.splice([i], 1);
            ingredientsArr.splice([i], 1);
            timeToMakeArr.splice([i], 1);
            spliceButtonValueArr.splice([i], 1);
            event.target.parentNode.parentNode.remove(event.parentNode)
        }, false)
    };
    recipeNameInput.value = ``
    ingredientsInput.value = ``
    timeToMakeInput.value = ``

})



