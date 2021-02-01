# SEDC
//script.js // calculator

$(document).ready(function () {
    //VALUES THAT ARE USED TO CALCULATE AND PRINT ON DISPLAY
    //VAL 1 IS UPPER, VAL2 IS SMALLER DISPLAY
    let val1 = $("#val1")[0];
    let val2 = $("#val2")[0];

    //THIS IS AN ARRAY FOR THE BUTTONS    
    let button = $(".inputNumber")

    //THESE ARE MORE COMPLEX SO THEY NEED TO BE SEPARATE
    let equalsBut = $("#equals");
    let clearBut = $("#clear");
    let dotBut = $("#dot");
    let sinBut = $("#sinus");

    //THIS ARRAY IS USED TO PUSH NUMBERS ENTERED
    let numbersGlobal = [];
   
    //THE OPERATORS TAKEN FROM ARRAY
    let listOfPossibleOperators = ['+', '-', '*', '/', '^', '?', 'sin']
    let equationEnded = false;
    //THIS OPERATOR ARRAY IS USED FOR THE CALCULATION PROCESS
    //FIRST OPERATOR IS DELAYED WITH A PLACEHOLDER "SKIP"
    let operator = ['skip'];

     //THIS IS THE RESULT
     let result = 0;


    //THIS IS USED TO RESET THE COUNTER TO SHOW ZERO, BUT NOT ADD TO THE NUMBER
    //LENGTH CHECK IS TO HANDLE THE DECIMAL NUMBER
    function deleteZero() {
        if (val1.value == 0 && val1.value.length === 1) {            
            val1.value = '';
        }
    }

    /////////////////////////////////////////////
    //THIS HANDLES ALL THE INPUTS FROM KEYBOARD//
    /////////////////////////////////////////////

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        //THIS IS FOR THE NUMBERS
        for (let i = 0; i < 10; i++) {
            if (event.key === `${i}`) {
                deleteZero();
                val1.value += i;
            }
        }

        //THIS HANDLES ALL THE OPERATORS
        for (let i = 0; i < listOfPossibleOperators.length; i++) {
            if (event.key === `${listOfPossibleOperators[i]}` && equationEnded === false) {
                numbersGlobal.push(parseFloat(val1.value));
                operator.push(listOfPossibleOperators[i]);
                val2.value += `${val1.value}${listOfPossibleOperators[i]}`;
                val1.value = 0;
            }

            if (event.key === `${listOfPossibleOperators[i]}` && equationEnded === true) {
                operator = ['skip'];              
                operator.push(listOfPossibleOperators[i]);
                equationEnded = false;
                result = 0;
                val2.value += `${listOfPossibleOperators[i]}`;
                val1.value = 0;
            }
        }        

        //THIS HANDLES EQUALS, JUST HIT ENTER
        if (event.key === `Enter`) {
            equalsBut.click();
        }
       
        //THIS IS DOT, DOT IS COOL
        if (event.key === `.`) {
            val1.value+=`.`;
        }   
        //BACKSPACE DELETES LAST INPUTED NUMBER
        if (event.key === `Backspace`) {
            let toDelArray = [];
            for (let each of val1.value) {
                toDelArray.push(each);
            }
            toDelArray.splice(toDelArray.length - 1);
            val1.value = '';
            for (let each of toDelArray) {
                val1.value += each;
            }
            parseFloat(val1.value);
        }

        //DELETE AND ESCAPE RESETS THE CALCULATOR
        if (event.key === `Delete` || event.key === `Escape`) {
            //JUST USE THE MOUSE CLEAR BUTTON DECLARED LATER
            clearBut.click();           
        }
        // // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    });

    /////////////////////////////////////
    //THIS HANDLES ALL THE MOUSE CLICKS//
    /////////////////////////////////////
    window.addEventListener("click", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }        
        // LOOP FOR ALL THE NUMBERS ON MOUSE CLICK
        for (let i = 0; i < 10; i++) {
            if (event.target.innerText === `${i}`) {
                deleteZero();
                val1.value += i;
            }
        }
        //THIS HANDLES ALL THE OPERATORS
        for (let i = 0; i < listOfPossibleOperators.length; i++) {
            if (event.target.innerText === `${listOfPossibleOperators[i]}` && equationEnded === false) {
                numbersGlobal.push(parseFloat(val1.value));
                operator.push(listOfPossibleOperators[i]);
                val2.value += `${val1.value}${listOfPossibleOperators[i]}`;
                val1.value = 0;
            }

            if (event.target.innerText === `${listOfPossibleOperators[i]}` && equationEnded === true) {
                operator = ['skip'];
                operator.push(listOfPossibleOperators[i]);
                equationEnded = false;
                result = 0;
                // operator.push(listOfPossibleOperators[i]);
                val2.value += `${listOfPossibleOperators[i]}`;
                val1.value = 0;
            }
            else if (event.target.innerText === `?`) {
                numbersGlobal.push(parseFloat(val1.value));
                operator.push(`?`);
                val2.value += `${val1.value}^`;
                val1.value = 0;
                equalsBut.click();                
                break;
            }

            //SINUS BUTTON
            else if (event.target.innerText === `sin`) {
                numbersGlobal.push(parseFloat(val1.value));
                operator.push(`sin`);
                val2.value += `${val1.value}^`;
                val1.value = 0;
                equalsBut.click();                
                break;
            }
        }
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    });
    
    //CLEAR BUTTON, ALSO USED BY DELETE BUTTON AND ESCAPE
    clearBut.click(function () {
        numbersGlobal = [];
        operator = ['skip'];
        result = 0;       
        val1.value = 0;
        val2.value = ``;
        equationEnded = false;
    });

    dotBut.click(function(){
        val1.value+=`.`;
    })

    //EQUALS
    equalsBut.click(function () {
        equationEnded = true;   
        numbersGlobal.push(parseFloat(val1.value));
        //OPERATORS CHECKING SO TO CALCULATE THE LAST INPUTED NUMBER
        for (let i = 1; i < numbersGlobal.length; i++) {
            //PLUS
            if (operator[i] === '+' && i < 2) {
                result += numbersGlobal[i - 1] + numbersGlobal[i];
            }
            else if (operator[i] === '+' && i >= 2) {
                result += numbersGlobal[i];
            }
            //MINUS
            else if (operator[i] === '-' && i < 2) {
                result += numbersGlobal[i - 1] - numbersGlobal[i];
            }
            else if (operator[i] === '-' && i >= 2) {
                result -= numbersGlobal[i];
            }
            //MULTIPLY
            else if (operator[i] === '*' && i < 2) {
                result += numbersGlobal[i - 1] * numbersGlobal[i];
            }
            else if (operator[i] === '*' && i >= 2) {
                result *= numbersGlobal[i];
            }
            //DIVIDE
            else if (operator[i] === '/' && i < 2) {
                result += numbersGlobal[i - 1] / numbersGlobal[i];
            }
            else if (operator[i] === '/' && i >= 2) {
                result /= numbersGlobal[i];
            }
            //POWER (SQUARE)
            else if (operator[i] === '^' && i < 2) {
                result += numbersGlobal[i - 1] ** numbersGlobal[i];
            }
            else if (operator[i] === '^' && i >= 2) {
                result **= numbersGlobal[i];
            }
            //ROOT
            else if (operator[i] === '?' && i < 2) {
                result += Math.sqrt(numbersGlobal[i - 1]);
            }
            else if (operator[i] === '?' && i >= 2) {
                result = Math.sqrt(result);
            }
            //SINUS
            else if (operator[i] === 'sin' && i < 2) {
                result += Math.sin(numbersGlobal[i - 1]);
            }
            else if (operator[i] === 'sin' && i >= 2) {
                result = Math.sin(result);
            }
            else {
                break;
            }                   
        }       
        
        //THESE WILL PRINT ON THE DISPLAY
        val2.value += `${numbersGlobal[numbersGlobal.length - 1]}=${Math.round(result * 1000) / 1000}`
        val1.value = Math.round(result * 1000) / 1000;

        //THE RESULT WILL OVERWRITE GLOBAL ARRAY NUMBERS SO IT CAN CONTINUE CALCULATING
        numbersGlobal = [result];
       
    })
    
});
