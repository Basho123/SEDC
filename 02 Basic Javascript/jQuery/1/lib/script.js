//script.js // exercise 1
/*
HOMEWORK PART 1
CREATE A GREETING APP WITH JQUERY
Create an input
Create a button
When clicked the button should print a greet message in an h1 header
Ex: input: Petko output message: Hello there Petko!

You must use JQuery to complete the task*/





//ЕВЕ ТИ ЕДЕН ЗГУЖВАН РУЖЕН КОД
/*Кога сум начекувал вакви кодови на интернет сум се крстел што е ова. Нормално убаво 
е да се сочува во варијабли се, ама ова, ете екпериментално, ќе го оставам вака, за да не им се плашам
во иднина на вакви кодови.

И да, се согласувам дека е лоша практика, пошто многу ружно изгледа. */

$(document).ready(function(){
    $("body").css('text-align', 'center')
    $("body").css('padding-top', `10%`)   
    $('button').click(function(){
        $('button').after(`<h1> HELLO ${$('input')[0].value}. </h1>`);
        $("h1").css('font-size', `${15 + (Math.random()*50)}px`)
    });
});