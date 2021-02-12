//script.js
//Write a function that will print table using Javascript arrow functions, 
//the table should have x rows and y columns. 
//The values for x and y are inserted by the user.

let rowsInput = document.getElementById('rows');
let columnsInput = document.getElementById('columns');
let table = document.getElementById('table');
let submit = document.getElementById('submit');

let trArray = ``;
let columnCounter = 0;

let tableDraw = (rows, columns) => {
    if (rows === 0) {
        return 0;
    }
    if (columns === 0) {
        tableDraw(rows - 1, columns);
        columnCounter++
        trArray += `<td style="background-color: rgb(255,${(Math.random() * 255)},0);">Column ${columnCounter}</td>`
        return 0;
    }
    else {
        tableDraw(rows, columns - 1);
        table.innerHTML += `<tr> ${trArray}</tr>`
        return 0;
    }
}

submit.addEventListener('click', () => {

    table.innerHTML = '';
    tableDraw(columnsInput.value, rowsInput.value,);
    rowsInput.value = ``
    columnsInput.value = ``
    trArray = ``;
    columnCounter = 0;
})