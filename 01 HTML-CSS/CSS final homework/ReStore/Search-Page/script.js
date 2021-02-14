//script.js
//searchpage script



let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let toChange = document.getElementById('toChange');
let foundResult = document.getElementById('foundResult');
let HTMLDecoder = document.getElementById('HTMLDecoder');
let productListArray = document.getElementsByClassName('product-list');

let arrayWithData = []
let counter = 0;
let counter2 = 0;

let allDiv = [];

let electricGuitarData = link => functionForSearch(link);
electricGuitarData(`http://127.0.0.1:5501/Categories/Guit-Bass/Electric-Guitars/Index.html`);

let acousticGuitarData = link => functionForSearch(link);
acousticGuitarData(`http://127.0.0.1:5501/Categories/Guit-Bass/Acoustic-Guitars/Index.html`);

let bassGuitarData = link => functionForSearch(link);
bassGuitarData(`http://127.0.0.1:5501/Categories/Guit-Bass/Electric-Bass-Guitars/Index.html`);

async function functionForSearch(link) {  
    let response = await fetch(link)    
    let data = await response.text();
    arrayWithData.push(data);
    HTMLDecoder.innerHTML += data;
    arrayWithData = [];
    for (let i = 0; i < productListArray.length; i++) {
        arrayWithData.push(productListArray[i].innerText.split(' '))        
    }    
    for (let i = 0; i < productListArray.length; i++) {
        for (let g = 0; g < arrayWithData[i].length; g++) {
            if (window.sessionStorage.searchBar.toLowerCase() === arrayWithData[i][g].toLowerCase()) {
                counter++;
                counter2++;
                foundResult.innerHTML = `<span style="font-weight: bold;">Found ${counter} results:</span> <br>`;
                toChange.innerHTML += `${productListArray[i].innerHTML}`;
            }
            else if (counter === 0) {
                toChange.innerHTML = ``;
            }             
        }
    }    
    
    if(counter2 === 0){
        toChange.innerHTML = `No results found for <span style="font-weight: bold;">"${window.sessionStorage.searchBar}"</span> <br>`
    }          
    counter = 0;
}



console.log(`search value`, window.sessionStorage.searchBar);

let product = document.getElementsByClassName('product-card');
allDiv.push(product);




//console.log(`Window local storage`, window.localStorage);

searchButton.addEventListener(`click`, () => {
    if (searchInput.value != undefined && searchInput.value.length !== 0) {
        window.sessionStorage.setItem(`searchBar`, searchInput.value);
        location.href = "./Index.html";
    }
    else return;
})
