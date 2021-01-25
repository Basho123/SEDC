//script.js
// HOMEWORK
// CREATE A DYNAMIC TABLE
// Write a Javascript function that will dynamiclly create a table
// User should input the number of Colums and Rows
// In every table cell print which row and column it is (ex. Row-3 Column-1)
// Don't forget to use google! :)

let rowsInput = document.getElementById('rows');
let columnsInput = document.getElementById('columns');
let table = document.getElementById('table');
let submit = document.getElementById('submit');

submit.addEventListener('click', function () {
    table.innerHTML = '';
    for (let i = 1; i <= rowsInput.value; i++) {
        document.getElementById('mainTableTag').border = '3px';
        table.innerHTML += `
        <tr>`; 

        for (let g = 1; g <= columnsInput.value; g++) {
            table.lastElementChild.innerHTML += `
            <td style = "background-color: rgb(${Math.random()*255},255,255);">this is row ${i}, column ${g}</td>`
            if(g > columnsInput.value){
                continue;
            }               
        }     
          
        table.innerHTML += `
        </tr>`;        
    }
    
})
