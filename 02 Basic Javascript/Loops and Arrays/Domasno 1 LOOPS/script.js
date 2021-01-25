//script.js

function findNumber(number,array){
    let counter = 0;
    for (i = 0; i < array.length; i++){
        if (number === array[i]){
            counter++;
        }       
    }
    console.log(`There is ${counter} occurencies of the number ${number}
    in this excercise`);
   
}


number = 2;
arrayOfNumbers = [3,4,3,2,3,4]

findNumber(number,arrayOfNumbers);

function filterOddEven(array,type){
    result = 0;
    numbers = [];

    if (type === "even"){
        for(i = 0; i<array.length; i++){
            if(array[i]%2 === 0){
                result+= array[i];
                numbers.push(array[i]);                
            }
        }
        console.log(`The sum of all the ${type} numbers is ${result},
        and the numbers involved are ${numbers}.`);  
    }

    else if (type === "odd"){
        for(i = 0; i<array.length; i++){
            if(array[i]%2 != 1){
                result+= array[i];
                numbers.push(array[i]);                
            }
        }
        console.log(`The sum of all the ${type} numbers is ${result},
        and the numbers involved are ${numbers}.`);
    }

    else{ console.log(`Please enter valid input type and numbers`);}   
}

filterOddEven([2,4,5,6,3342,234,324,23432,42314465,457,6587465], "even")
