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



//
postButton.addEventListener('click', function () {
    if (
        recipeNameInput.value === `` ||
        ingredientsInput.value === `` ||
        timeToMakeInput.value == ``
    ) {
        alert(`Please fill all the fields`);
    }
    else {
        tBody.innerHTML = ``;

        recipeNameArr.push(recipeNameInput.value)
        ingredientsArr.push(ingredientsInput.value)
        timeToMakeArr.push(timeToMakeInput.value)
        spliceButtonValueArr.push(`Delete this recipe`);

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
    }
})

showLongest.addEventListener('click', function () {
    tBody.innerHTML = ``;
    let longestTime = 0;

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

showShortest.addEventListener('click', function () {
    tBody.innerHTML = ``;
    let shortestTime = Infinity;

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

showAll.addEventListener('click', function () {
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



