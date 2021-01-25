//script.js

// Write a javascript function that:
// When given any array of strings (should work with array with any number of elements)
// It will create one big string and return it
// Ex:["Hello", "there", "students", "of", "SEDC", "!"]
// Result: "Hello there students of SEDC!"

let promptStringArray = [];

while(true){
    let promptString = prompt("Input your desired word, when you enter enough words, type END");
    if (promptString === "END"){
        break;
    }
    else{   
    promptStringArray.push(promptString);
    }
    
}

function arrayOfStrings(strings){
    let array = []; 
    for(let each of strings){
        array.push(each);
    }
    console.log(`You inputed: ${array}`);
}

arrayOfStrings(promptStringArray);