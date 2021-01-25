//script.js
//

//Прашање: приметив дека во заградите немора да се стави let на почеток на for loop,
//пример може да се постави како for(each of array), и работи како што треба. Но сепак ќе си го 
//користам со let заради случајно редеклалирање во иднина на друга надворешна варијабла.
//на 22ра линија од кодот е искористено така, дали автоматски се декларира внатре?


function sumMinMaxNumbers(array) {
    let auxillaryNumberArray = [];
    let auxillaryNaNArray = [];
    
    for (let i = 0; i < array.length; i++){
        for (let g = 0; g < array.length; g++){
            if(array[i] < array[g]){
                [array[i],array[g]] = [array[g], array[i]];
            }
        }
    }

    for (let each of array){
        
        if (!isNaN(each) && each !== true && each !== false){            
            auxillaryNumberArray.push(each);
        }
        else {auxillaryNaNArray.push(each); }
    }

    console.log(`========================================================`);
    console.log("This is the whole array: " + array);
    console.log("This is the auxilary number array: "+auxillaryNumberArray);  
    console.log("This is the garbage found in the equation that cannot be calculated: "+ auxillaryNaNArray);
    console.log(`\nThe MIN number is ${auxillaryNumberArray[0]}, the MAX number is ${auxillaryNumberArray[auxillaryNumberArray.length-1]}, and the sum of them numbers is ${auxillaryNumberArray[0] + auxillaryNumberArray[auxillaryNumberArray.length-1]}, yahoo.`);    
    console.log(`========================================================\n\n\n`);
}

sumMinMaxNumbers([25,24,26453,12,2345,20,"cena bace ","cena imbox ", true, NaN, false, undefined]);
sumMinMaxNumbers([43543,435432,12323,765745,"братанче", "плек", "лојзе", "тепик", true]);
sumMinMaxNumbers([45645645,45645645623,65877876,2113,243,435456,43656,787686,"lorem ipsum", false, true, NaN, 43543,76587869,4365476,453543])