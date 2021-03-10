// #Homework

// ## Refactor

// Previous homework about inheritance refactor it (in a separate homework) with classes.

// In addition:
// * make get/set for liveInSaltWater in AquaticAnimal, typeOfFur in TerrestrialAnimal and typeOfFood in WildAnimal
// * add new properties in DomesticAnimal...The first one is hasOwner boolean value and price. In addtition add static ownerPrice method that in case any animal has owner should add addtional 1000 to it's price value

// ## Bonus

// Redo the same homework separately only using Object.create()

class Animal {
    constructor(name, age, latinName, numberOfLegs) {
        this.name = name;
        this.age = age;
        this.latinName = latinName;
        this.numberOfLegs = numberOfLegs;
    }
    print = () => console.log(`NAME: ${this.name} \nLATIN NAME: ${this.latinName} \nAGE: ${this.age} \nNUMBER OF LEGS: ${this.numberOfLegs}`);
}

class AquaticAnimal extends Animal {
    constructor(name, age, latinName, numberOfLegs, type) {
        super(name, age, latinName, numberOfLegs);
        this.type = type;
        this.liveInSaltWater = false;
        this.liveInFreshWater = false;
        this.type.toLowerCase()
    }

    set type(typeOfWater) {
        typeOfWater.toLowerCase()
        if (typeOfWater != `salt`) {
            this.liveInSaltWater = false;
            this._type = typeOfWater;
            return;
        }
        else {
            this.liveInSaltWater = true;
            this._type = typeOfWater;
        }
    }
    get type() {
        return `the type of fish is ${this._type}, and liveInSaltWater is ${this.liveInSaltWater}`
    }

}

let fish = new AquaticAnimal(`pastrmka`, 2, `pastrmkus`, 0, `fresh`);
console.log(fish.type);

class FlyingAnimal extends Animal {
    constructor(name, age, latinName, numberOfLegs, type, favouriteFood, currentPlace) {
        super(name, age, latinName, numberOfLegs);
        this.type = type;
        this.favouriteFood = favouriteFood;
        this.currentPlace = currentPlace;
    }

    flyout = (place) => {
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

class TerrestrialAnimal extends Animal {
    constructor(name, age, latinName, numberOfLegs, typeOfFur = `No fur detected`) {
        super(name, age, latinName, numberOfLegs)
        this.typeOfFur = typeOfFur;
    }

    sound = (sound) => {
        if (sound == null) {
            console.log(`Please specify a sound that the animal makes`);
            return;
        }
        else {
            console.log(`${this.name} sounds like ${sound}`);
        }
    }
}

class WildAnimal extends TerrestrialAnimal {
    constructor(name, age, latinName, numberOfLegs, typeOfFood, favouriteFood, typeOfFur) {
        super(name, age, latinName, numberOfLegs, typeOfFur);
        this.favouriteFood = favouriteFood;
        this.typeOfFood = typeOfFood;
    }
    
    set favouriteFood(foodType){
        console.log(`we are setting the type of food, please wait`);
        this._favouriteFood = foodType;      
    }

    get favouriteFood(){
        console.log(`we are getting the type of food`)
        return `the type of food is: ` + this._favouriteFood;
    }
}

class DomesticAnimal extends TerrestrialAnimal {
    constructor(name, age, latinName, numberOfLegs, typeOfFur, price, ownerName) {
        super(name, age, latinName, numberOfLegs, typeOfFur)
        this.ownerName = ownerName;
        this.price = price;
        this.hasOwnwer = this.ownerName.length > 0 ? this.hasOwnwer = true : this.hasOwnwer = false;
    }

    static ownerPrice(object) {
        if (object.hasOwnwer == true) {
            object.price += 1000;        
        }
        else return;
    }
}

let kokoska = new DomesticAnimal(`kokoska`, 1, `kokoskus`, 2, ``,3000,`blazo`)
console.log(kokoska.price);

DomesticAnimal.ownerPrice(kokoska);

console.log(kokoska.price);

let boar = new WildAnimal(`boar`,2,`boarusHoarus`,4,`herbivore`,`nuts`,`long brown fur`)
boar.print();

console.log(boar.favouriteFood);
