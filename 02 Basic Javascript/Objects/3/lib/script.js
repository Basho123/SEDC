//script.js // exercise 1

$(document).ready(function () {
    let currentDate = new Date();
    let seconds = currentDate.getSeconds();
    let minutes = currentDate.getMinutes();
    let hours = currentDate.getHours();
    let day = currentDate.getDate();
    let month = currentDate.getMonth()+1;
    let year = currentDate.getFullYear();
    if (month >= 0 && month < 10){
        month = `0${currentDate.getMonth()+1}`;
    }  
    if (day >= 0 && day < 10){
        day = `0${currentDate.getDate()}`;
    }    
    if (minutes >= 0 && minutes < 10){
        minutes = `0${currentDate.getMinutes()}`;
    }
    if (seconds >= 0 && seconds < 10){
        seconds = `0${currentDate.getSeconds()}`;
    }

    
    let date = `${day}.${month}.${year}`;
    let time = `${hours}:${minutes}:${seconds}`
    console.log(date);
    let books = [];

    function Book(title, author, select, date = date, time = time) {
        this.title = title;
        this.author = author;
        this.select = select;
        this.date = date;
        this.time = time;
    }
    function showBooks(booksArray, locationToShow) {
        locationToShow.innerHTML = '';
        for (let book of booksArray) {
            locationToShow.innerHTML += `
            <tr>
                <td>${book.title} </td>
                <td>${book.author}</td>
                <td>${book.select}</td>
                <td>${book.date}</td>
                <td>${book.time}</td>
            </tr>`
        }

    }

    let workspace = $("#toAddInside")[0];
    let bookName = $("#books")[0];
    let authorName = $("#author")[0];
    let select = $("#select")[0];
    console.log(select.value);

    let submit = $("#submit");

    submit.click(function (event) {
        event.preventDefault();

        let name = bookName.value;
        let author = authorName.value;        

        if (name.length && author.length > 0) {
            let newBook = new Book(name, author, select.value, date, time);
            books.push(newBook);
            showBooks(books, workspace);
            bookName.value = '';
            authorName.value = '';

        }
        else {
            alert(`Please enter valid data`);
        }
    })


});