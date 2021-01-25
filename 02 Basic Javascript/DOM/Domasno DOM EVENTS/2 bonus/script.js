//script.js

//INPUT FIELDS
let nameInput = document.getElementById('name');
let lastNameInput = document.getElementById('lastName');
let companyInput = document.getElementById('company');

let numberInput = document.getElementById('phoneNumber');
let imageURL = document.getElementById('image');

let submitButton = document.getElementById('submitButton');

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// PHONE BOOK
let masterBook = document.getElementById('masterBook');
let phoneBook = document.getElementsByClassName('phoneBook')[0];

let name = document.getElementsByTagName('h2')[0];
let lastName = document.getElementsByTagName('h2')[1];
let company = document.getElementsByTagName('h2')[2];

let number = document.getElementsByTagName('h3')[0];

let image = document.getElementsByTagName('img')[0];

submitButton.addEventListener('click', function () {
    if (imageURL.value.length === 0) {
        imageURL.value = `images/avatar.jpg`;
    }
    if ((nameInput.value.length > 0 || lastNameInput.value.length > 0) && numberInput.value.length > 8) {
        masterBook.innerHTML += `
    <div class="phoneBook">
    <div>
        <h2>${nameInput.value}</h2>
        <h2>${lastNameInput.value}</h2>
        <h2>${companyInput.value}</h2>
    </div>
    <div>
        <h4>Number:</h4>
        <h3 id="number">${numberInput.value}</h3>
    </div>
    <div>
        <img src="${imageURL.value}" alt="image of the person's number" width="200px">
    </div>
</div>`
        nameInput.value = '';
        lastNameInput.value = '';
        companyInput.value = '';
        numberInput.value = '';
        imageURL.value = '';
    }

    else { alert(`Please input valid data`);    
    imageURL.value = ''; }
})

