/*
Return and print every property with their values from 23 user
Show all albums that have "omnis" in their title
Create new user
Delete random TODO
Use https://jsonplaceholder.typicode.com/ 
*/

//first exercise
document.getElementById("firstButton").addEventListener('click', function () {
    let listToPrintUsers = document.getElementById('listToPrintUsers');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(convert => convert.json())
        .then(users => {
            for (let each of users) {
                listToPrintUsers.innerHTML +=
                    `
                    <h2>${each.name}</h2>                    
            <li>Name: ${each.name}</li>
            <li>Username: ${each.username}</li>
            <li>Email: ${each.email}</li>
            <li>Address: <ul> 
            <li>Stret: ${each.address.street}</li> 
            <li>Suite: ${each.address.suite}</li>   
            <li>City: ${each.address.city}</li>
            <li>Zipcode: ${each.address.zipcode}</li>     
            <li>Geo: <ul>
            <li>Latitude: ${each.address.geo.lat}</li> 
            <li>Longditude: ${each.address.geo.lng}</li>                  
            </ul>
            </ul>
            <li>Phone: ${each.phone}</li>
            <li>Website: ${each.website}</li>    
            <li>Company:
            <ul> 
            <li>Name: ${each.company.name}</li>  
            <li>Catch phrase: ${each.company.catchPhrase}</li>  
            <li>bs: ${each.company.bs}</li> 
            </ul>
            <br/>
            <hr/>
            `
            }
        })
        .catch(error => console.error(error))
})


//second exercise
document.getElementById("secondButton").addEventListener('click', function () {
    let listToPrintAlbums = document.getElementById('listToPrintAlbums');
    listToPrintAlbums.innerHTML = ``;

    fetch('https://jsonplaceholder.typicode.com/albums')
        .then(convert => convert.json())
        .then(albums => {
            let albumsArray = [];
            let h2 = document.createElement('h2');

            for (let each of albums) {
                if (each.title.search('omnis') != -1) {
                    albumsArray.push(each);
                }
            }
            for (let each of albumsArray) {

                document.getElementsByTagName('body')[0].insertBefore(h2, listToPrintAlbums);

                h2.innerText = `albums that have "omnis" in their title`;
                listToPrintAlbums.innerHTML +=
                    `<li>ID: ${each.userId} Title: ${each.title}</li><br/>`
            }
        })
})

document.getElementById("secondButton2").addEventListener('click', function () {
    listToPrintAlbums.innerHTML = ``;
    document.getElementsByTagName('h2')[0].remove();
})

//third exercise


function createUser(name, username, email) {
    // let emailFormat = ;
    console.log(email);

    //NORMALNO OVA GUGLANO E ALI I DA GO UCIME NEKAD
    //NE BI GO ZAPAMTIL NA PAMET, ZNAM SAMO DEKA SE VIKA REGULAR EXPRESSION ILI REGEX
    //I MNOGU E VEROJATNO DEKA VO IDNINA BI GO GUGLAL PAK MAKAR I 10 GODINI SENIOR DA SUM
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        if (name !== '' && username !== '') {
            fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                }
            })
                .then(response => response.json())
                .then(function (convertedJson) {
                    console.log(`suclsesfuly created new user`, convertedJson)
                })
                .catch(error => console.error(error))
        }
        else {
            alert('please input some data for username and password')
        }
    }
    else {
        alert('please enter valid email');
    }

}

document.getElementById("thirdButton").addEventListener('click', function () {
    let nameValue = document.getElementById('nameValue').value;
    let usernameValue = document.getElementById('userNameValue').value;
    let emailValue = document.getElementById('emailValue').value;
    createUser(nameValue, usernameValue, emailValue);
})

//CETVRTA VEZBA

document.getElementById("deleteRandom").addEventListener('click', function () {
    let randomNumber = Math.ceil(Math.random() * 100);

    fetch('https://jsonplaceholder.typicode.com/todos/'+randomNumber, {
        method: "DELETE",
    })
        .then(response => response.json())
        //ZOSTO OVA E UNDEFINED? DEKA E IZBRISANO?
        .then(todoPost => console.log(`The random number is ${randomNumber}, and deleted the todo with that id number, and the post is now, ${todoPost.id}`))
        .catch(error => console.log(error))

})

