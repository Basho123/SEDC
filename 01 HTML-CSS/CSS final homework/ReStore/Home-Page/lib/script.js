//script.js
//homepage script

let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');

let homepageBodyData = document.getElementsByTagName(`body`)[0].innerText;
let dataToExport = homepageBodyData.split(" ");


searchButton.addEventListener(`click`, () => {
    if (searchInput.value != undefined && searchInput.value.length !== 0) {
        window.sessionStorage.setItem(`searchBar`, searchInput.value);
        location.href = "../Search-Page/Index.html";
    }
    else return;
})

