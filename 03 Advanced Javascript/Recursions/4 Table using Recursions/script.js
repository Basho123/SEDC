//script.js
//Write a function that will print table using Javascript arrow functions, 
//the table should have x columns and y rows. 
//The values for x and y are inserted by the user.

let rowsInput = document.getElementById('rows');
let columnsInput = document.getElementById('columns');
let table = document.getElementById('table');
let submit = document.getElementById('submit');
let trArray = ``;
columnCounter = 0;

let columnDraw = (columns) => {
    if (columns === 0) {
        return 0;
    }
    else {
        columnDraw(columns - 1)
        columnCounter++
        trArray += `<td style="background-color: rgb(255,${(Math.random() * 255)},0);">Column ${columnCounter}</td>`
    }
    return trArray;
}

let tableDraw = (rows) => {
    if (rows === 0) {
        return 0;
    }
    else {
        tableDraw(rows - 1);
        return table.innerHTML += `<tr> ${trArray}</tr>`
    }
}


submit.addEventListener('click', () => {
    columnDraw(columnsInput.value)

    table.innerHTML = '';
    tableDraw(rowsInput.value);
    rowsInput.value = ``
    columnsInput.value = ``
})
