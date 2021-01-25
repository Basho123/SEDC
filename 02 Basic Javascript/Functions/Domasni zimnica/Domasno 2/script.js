//Domasno 2/script.js


//FUNCTION TO TEST TYPEOF()
function parameter(value){
    return typeof(value);   
}

// OBJECT MADE FOR TEST PURPOSES
class TestObject{
  constructor(value){
    this.value = value;
  }
}



let userInput1 = new TestObject(1);
let userInput2 = false;
let userInput3 = 2;
let userInput4 = "cena-druze";
let userInput5;

let checkType1 = parameter(userInput1);
let checkType2 = parameter(userInput2);
let checkType3 = parameter(userInput3);
let checkType4 = parameter(userInput4);
let checkType5 = parameter(userInput5);

console.log(checkType1);
console.log(checkType2);
console.log(checkType3);
console.log(checkType4);
console.log(checkType5);

