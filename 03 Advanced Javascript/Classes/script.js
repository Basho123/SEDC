/* 
# Homework Inheritance

## Animal Kingdom

Create Animal constructor function that has:

- name
- age
- latinName of the animal
- numberOfLegs
- print method that need to print animal name their latin name next to it, age of the animal and number of legs

Create AquaticAnimal constructor function that inherit from Animal and has:

- type
- liveInSaltWater boolean value
- liveInFreshWater boolean value
- changeLifeEnvironment method that expect type of the water that animal lives in. In case is "salt" it should change property liveInSaltWater value, same with liveInFreshWater in case the value of the type is "fresh"

Create FlyingAnimal constructor function that inherit from Animal and has:

- type
- favoriteFood
- currentPlace - current place where animal is located in
- flyOut - method that expect place and change current place property of the animal

Create TerrestrialAnimal constructor function that inherit from the Animal and has:

- hasFur boolean value
- typeOfFur
- sound - method that log sound that the animal make

Create WildAnimal constructor function that inherit from the TerrestrialAnimal and has:

- typeOfFood
- favoriteFood

Create DomesticAnimal constructor function that inherit from the TerrestrialAnimal and has:

- name
- ownerName

Create multiple object from each type of animals with different values
*/

function Animal(name, age, latinName, numberOfLegs) {
    this.name = name;
    this.age = age;
    this.latinName = latinName;
    this.numberOfLegs = numberOfLegs;
    this.print = () => console.log(`NAME: ${this.name} \nLATIN NAME: ${this.latinName} \nAGE: ${this.age} \nNUMBER OF LEGS: ${this.numberOfLegs}`);
}

function AquaticAnimal(name, age, latinName, numberOfLegs, type) {

    Object.setPrototypeOf(this, new Animal(name, age, latinName, numberOfLegs));
    this.type = type;
    this.liveInSaltWater = false;
    this.liveInFreshWater = false;

    this.type.toLowerCase()
    if (this.type !== `salt` && this.type !== `fresh`) {
        console.log(`Please specify 'salt' or 'fresh' for the type of water that the fish lives in`);
        return;
    }
    else if (this.type == `salt`) {
        console.log(`This  ${this.name} lives in ${type} water`);
        this.liveInSaltWater = true;
        return;
    }
    else {
        console.log(`This ${this.name} lives in ${type} water`);
        this.liveInFreshWater = true;
    }

    this.changeLifeEnvironment = (waterType) => {
        waterType.toLowerCase();
        if (waterType !== `salt` && waterType !== `fresh`) {
            console.log(`please input "salt" or "fresh" for the water type`);
            return;
        }
        else if (waterType === `salt`) {
            this.type = waterType;
            this.liveInSaltWater = true;
            console.log(`The ${this.name} now lives in salt water`);
            return;
        }
        else {
            this.type = waterType;
            this.liveInFreshWater = true;
            console.log(`The ${this.name} now lives in fresh water`);
        }
    }
}

function FlyingAnimal(name, age, latinName, numberOfLegs, type, favouriteFood, currentPlace) {

    Object.setPrototypeOf(this, new Animal(name, age, latinName, numberOfLegs));

    this.type = type;
    this.favouriteFood = favouriteFood;
    this.currentPlace = currentPlace;
    this.flyOut = (place) => {
        if (place !== this.currentPlace) {
            this.currentPlace = place;
            console.log(`The ${this.name} flew out to a better place called ${this.currentPlace}`);
            return
        }
        else {
            console.log(`The ${this.name} didn't spread it's wings and just sat in it's nest located in ${this.currentPlace}`);
        }
    }
}

function TerrestrialAnimal(name, age, latinName, numberOfLegs, typeOfFur = `No fur detected`) {

    Object.setPrototypeOf(this, new Animal(name, age, latinName, numberOfLegs,));

    this.typeOfFur = typeOfFur;
    this.hasFur = this.typeOfFur == `No fur detected` ? false : true;
    this.sound = (sound) => {
        if (sound == null) {
            console.log(`Please specify a sound that the animal makes`);
            return;
        }
        else {
            console.log(`${this.name} sounds like ${sound}`);
        }
    }
}

function WildAnimal(name, age, latinName, numberOfLegs, typeOfFood, favouriteFood,typeOfFur) {

    Object.setPrototypeOf(this, new TerrestrialAnimal(name, age, latinName, numberOfLegs, typeOfFur));   

    this.favouriteFood = favouriteFood;
    this.typeOfFood = typeOfFood;
}

function DomesticAnimal(name, age, latinName,numberOfLegs, ownerName, typeOfFur) {
    Object.setPrototypeOf(this, new TerrestrialAnimal(name, age, latinName, numberOfLegs, typeOfFur));

    this.ownerName = ownerName;
}

// //////////////////////////////////////////////////////////////////////

let genericAnimal = new Animal(`Noplease`, 25, `HomoSapiens`, 2);
genericAnimal.print();

let ohridskaPastrmka = new AquaticAnimal(`Ohrid Trout`, 1, `ohridusPastrmkus`, 0, `fresh`)
ohridskaPastrmka.changeLifeEnvironment(`salt`);

console.log(`=========================================`);

let sparrow = new FlyingAnimal(`sparrow`, 3, 'spiritusSanctus', 2, `non-migrating`, `pikavci`, `Skopje`);
sparrow.print();
sparrow.flyOut(`Skopje`);
sparrow.flyOut(`Tetovo`);

console.log(`=========================================`);

let bigFoot = new TerrestrialAnimal(`Big Foot`, 455, `bigusFutus`, 2, `Long Brown Fur`)
bigFoot.print();
bigFoot.sound(`AARGGH`);
console.log(`Big Foot fur`, bigFoot.hasFur);

let baldCat = new TerrestrialAnimal(`Bald Egyptian Cat`, 3, `catusBaldus`, 4);
baldCat.print();
baldCat.sound(`MEOWRUUUUUUAGH`);
console.log(`baldCat has fur`, baldCat.hasFur);

console.log(`=========================================`);

let hog = new WildAnimal(`Hog`, 3, `wildusBoarus`, 4, `roots`, `little babies`, `long brown fur`)
hog.print();
console.log(`hog has fur`,hog.hasFur);
hog.sound(`SQUEEE`)

console.log(`=========================================`);


let chicken = new DomesticAnimal(`chicken`, 2, `chickenusChickus`, 2, `Basho`)
chicken.print();
console.log(`Chicken fur`, chicken.hasFur);
chicken.sound(`COO COO`)

console.log(`=========================================`);
