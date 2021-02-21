//script.js
//searchpage script
document.cookie = "name=ReStore";
document.cookie = "SameSite=None"
document.cookie = "Secure";
console.log(document.cookie);

let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let toChange = document.getElementById('toChange');
let foundResult = document.getElementById('foundResult');
let HTMLDecoder = document.getElementById('HTMLDecoder');

let productListArray = document.getElementsByClassName('product-list');
let forms = document.getElementsByTagName('form');

let arrayWithData = []
let counter = 0;
let counter2 = 0;

let oustideBody = ``;

let electricGuitarData = link => functionForSearch(link, '../Electric-Guitars/');
electricGuitarData(`http://127.0.0.1:5501/Categories/Guit-Bass/Electric-Guitars/Index.html`)

let acousticGuitarData = link => functionForSearch(link, '../Acoustic-Guitars/');
acousticGuitarData(`http://127.0.0.1:5501/Categories/Guit-Bass/Acoustic-Guitars/Index.html`)
let bassGuitarData = link => functionForSearch(link, '../Categories/Guit-Bass/Electric-Bass-Guitars/');
bassGuitarData(`http://127.0.0.1:5501/Categories/Guit-Bass/Electric-Bass-Guitars/Index.html`)
//FUNCTION FOR MAKING A CALL, FIRST PARAMETER IS URL, SECOND IS THE PATH TO THE FOLDER

async function functionForSearch(link, linkToClick = ``) {
    let response = await fetch(link);
    let data = await response.text();
    //Data comes in HTML syntax 
    arrayWithData.push(data);

    for (let i = 0; i < forms.length; i++){
        forms[i].innerHTML = ``;
        forms[i].removeAttribute('id')
    }

    //This decodes the html syntax directly on the page for working
    HTMLDecoder.innerHTML += data;

    //this array is consisted of text data that was decoted from the HTML decoder
    arrayWithData = [];

    //this pushes the text in the arrayWithData and separates all words
    for (let i = 0; i < productListArray.length; i++) {
        arrayWithData.push(productListArray[i].innerText.split(' '))
    }

    //THE ENGINE
    //this for loop checks with the word, [i] stands for index of all products fetched, and [g] is the word from the arrayWithData
    for (let i = 0; i < productListArray.length; i++) {
        for (let g = 0; g < arrayWithData[i].length; g++) {
            //words are converted to lowercase letters, so to remove the case sensitivity
            if (window.sessionStorage.searchBar.toLowerCase() === arrayWithData[i][g].toLowerCase()) {
                //the href from the original product is saved here
                let localLink = ``
                //first counter is used to reset the html on the page found and show how many results were found
                //the second counter is to match if there exists such a product, in this case both counters will be fired, because matching product was found
                counter++;
                counter2++;
                foundResult.innerHTML = `<span style="font-weight: bold;">Found ${counter} results:</span> <br>`;
                localLink = productListArray[i].firstElementChild.getElementsByTagName('a')[0].getAttribute('href');
                //set the href attribute of the picture of the product
                productListArray[i].firstElementChild.getElementsByTagName('a')[0].setAttribute('href', linkToClick + localLink)
                //set the href attribute of the h4 text of the product
                productListArray[i].firstElementChild.firstElementChild.nextElementSibling.firstElementChild.getElementsByTagName('a')[0].setAttribute('href', linkToClick + localLink)
           
                //THIS ADDS THE CARD ON THE PAGE
                toChange.innerHTML += `${productListArray[i].innerHTML}`;

            }
            // HTML is empty if no product of the loop is found
            else if (counter === 0) {
                toChange.innerHTML = ``;
            }
        }
    }

    // HTML to print if no products were found at all
    if (counter2 === 0) {
        toChange.innerHTML = `No results found for <span style="font-weight: bold;">"${window.sessionStorage.searchBar}"</span> <br>`
        HTMLDecoder.innerHTML = ``;
    }

    //reset the counters after the click;
    counter = 0;
    counter2 = 0;
}

searchButton.addEventListener(`click`, () => {
    if (searchInput.value != undefined && searchInput.value.length !== 0) {
        window.sessionStorage.setItem(`searchBar`, searchInput.value);
        location.href = "./Index.html";
    }
    else return;
})
