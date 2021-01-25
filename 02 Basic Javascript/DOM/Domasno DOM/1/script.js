//script.js

// Change the page with JavaScript

// Change the text of all paragraphs and headers with javascript
// Note:The html must not be changed

document.querySelector('#myTitle').innerText = "Basho";
document.getElementsByClassName('paragraph')[0].innerText = "Hehe";

document.getElementsByClassName('second')[0].innerText = "cENA bACE"
document.getElementsByClassName('second')[0].nextElementSibling.innerText = "рачваста шеснаеска";

document.querySelectorAll('div')[2].firstElementChild.innerText = 'Цена за кеш?';
document.querySelectorAll('div')[2].firstElementChild.nextElementSibling.innerText = '#profesional';