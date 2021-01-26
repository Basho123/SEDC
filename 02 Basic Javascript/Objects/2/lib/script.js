//script.js // exercise 1
/*HOMEWORK PART 1
CREATE OBJECT ANIMAL WITH 2 PROPERTIES AND 1 METHOD:
name
kind
speak (method)
this method will take one parameter and will print in the console a message: 
e.g. dog.speak(“hey bro!!!”) will log in the console “Dog says: ‘Hey bro!!!’”

Bonus: enter the values from prompt or from HTML inputs*/

$(document).ready(function () {

    let dogs = [];
    function Dog(dogName, species) {
        this.name = dogName;
        this.species = species;
        
        this.bark = function(bark){           
            return `${this.name} says ${bark}`;
        }
    }
    console.log(dogs);

    function showDog(dogArr, element) {
        element.innerHTML = "";
        for (let each of dogArr) {
           
            let bark = each.bark(`WOOF`);            
            element.innerHTML += `<p>A ${each.name} with the species of ${each.species} says ${bark}</p>`;       
             
        }
    }


    let button = $('#button');
    let name = $('#name')[0];
    let species = $('#species')[0];
    let nekojDiv = $('#nekojDiv')[0];

    button.click(function () {
        if (name.value.length > 0 && species.value.length >0){
        let dogName = name.value;
        let dogSpecies = species.value;
        let newDog = new Dog(dogName, dogSpecies);
        dogs.push(newDog);
        showDog(dogs, nekojDiv);
        console.log(`dog name: ${name.value}`);
        console.log(`dog species: ${species.value}`);
        name.value = '';
        species.value = '';
        }
        else {
            alert(`Please input something in all the fields`);
        }
    });





});