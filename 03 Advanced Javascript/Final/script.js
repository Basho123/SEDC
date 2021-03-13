
//#region GLOBAL CLASSES AND THEIR DESTRUCTURING
let humans = {
    all: 0,
    workers: {
        all: 0,
        tractorDriver: 0,
        haystackComber: 0,
        farmer: 0,
        animalHandler: 0,
        apprentice: 0,
    },
    tourists: {
        all: 0,
    }
}

let animals = {
    all: 0,
    livestock: {
        cows: 0,
        horses: 0,
        pigs: 0,
    },
    poultry: {}
}

let globalDwellings = {
    beds: 0,
    stables: 0,
    waterTowerCapacity: 1000,
    wells: 0,
    surface: 0,
    surfaceOccupied: 0,
}

let machines = {
    all: 0,
    tractor: 0,
}

let resources = {
    meat: 100,
    milk: 100,
    water: 1000,
    hay: 100,
}

let economy = {

    totalBudget: parseInt(Math.random() * 1000) + 100000,
    salariesPaid: 0,
    workerRevenue: 0,
    farmExpenses: 0,
    workFactor: 0,
    workFactorCalculated: () => {
        return 1 + (economy.workFactor / 100)
    }
}


let page = {
    table: document.getElementById(`tableBody`),
    log: document.getElementById(`log`),
    upgradeSleepingHouseButton: document.getElementById(`upgradeSleepingHouse`),
    upgradeStablesButton: document.getElementById(`upgradeStables`),
    upgradeWaterTowerButton: document.getElementById(`upgradeWaterTower`),
    buyMoreSurfaceButton: document.getElementById(`buyMoreSurface`),
    random: (number) => {
        return Math.floor(Math.random() * number);
    }
}

let arrayOfWorkers = [];
let arrayOfGuests = [];
let arrayOfAnimals = [];
let arrayOfMachines = [];

let monthCounter = 1;

//DESTRUCTURING
let { workers } = humans
let { tourists } = humans

let { livestock } = animals;
let { poultry } = animals;

let { random } = page;

//#endregion




//#region PROTOTYPE CLASSES

class Mammal {
    constructor(legs = 4, hands = 0, species = `species not defined`) {
        this.eyes = 2;
        this.legs = legs;
        this.hands = hands;
        this.drinkMilk = true;
        this.species = species;
    }
}

class Avian {
    constructor(legs = 2, wings = 2, species = `species not defined`) {
        this.legs = legs;
        this.wings = wings;
        this.laysEggs = true;
        this.hasFeathers = true;
        this.hasBeak = true;
        this.species = species;
    }
}

class Machine {
    constructor(wheels = 4, fuel = `diesel`, color = `red`, type = `GENERIC MACHINE`, inService = true, licensePlates = `TEST DRIVE`, health = 100, isBroken = false, economyFactor = 0) {
        this.wheels = wheels;
        this.fuel = fuel;
        this.color = color;
        this.type = type;
        this.licensePlates = licensePlates;
        this.inService = inService;
        this.health = health;
        this.isBroken = isBroken;
        this.economyFactor = economyFactor;

        setInterval(() => {
            if (this.inService === true) {
                let checkPrice = 1000;
                this.health = 100;
                this.isBroken = false;
                economy.totalBudget -= checkPrice;
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += ` <h3 class = "divCardMain" style = "color:black; background-color:yellow">VEHICLE OF ${this.type} WITH LICENCE PLATES ${this.licensePlates} HAS WENT TECHNICAL CHECK AND THE INSURANCE WAS RENEWED, ${checkPrice}$ HAVE BEEN DEDUCTED.</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
            }
            else null;

        }, 120000)
        setInterval(() => {//INTERVAL
            console.log(`---------------------`);
            console.log(`this.isBroken`, this.isBroken);
            console.log(`this.economyFactor`, this.economyFactor);
            console.log(`this.economyFactor`, this.health);
            if (this.isBroken === true) {
                economy.workFactor -= this.economyFactor;

                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class = "divCardMain" style="color: white;background-color:black;">VEHICLE OF ${this.type} WITH LICENCE PLATES ${this.licensePlates} IS UNDERGOING SERVICE, PLEASE WAIT...</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

                setTimeout(() => {
                    console.log(`------TIMEOUT-----------`);
                    console.log(`this.isBroken`, this.isBroken);
                    console.log(`this.economyFactor`, this.economyFactor);
                    console.log(`this.health`, this.health);


                    let servicePrice = Math.floor(10000 / this.health) + this.economyFactor;
                    this.health = 100;
                    this.isBroken = false;
                    economy.workFactor += this.economyFactor;
                    economy.totalBudget -= servicePrice;

                    let newDivItem = document.createElement('DIV');
                    newDivItem.innerHTML += `<h3 class = "divCardMain" style="color: black;background-color:yellow;">VEHICLE ${this.type} WITH LICENCE PLATES ${this.licensePlates} HAS WENT REPAIR SERVICE , ${servicePrice}$ HAVE BEEN DEDUCTED.</h3>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])

                }, 600000 / this.health)
            }

            else null;
        }, 20000)
    }
}

//#endregion

//#region  MACHINES
//CLASSES AND THEIR CORRESPONDING FUNCTIONALITIES FUNCTIONS
class Tractor extends Machine {
    constructor(type, licensePlates, inService, isBroken, price) {
        super();
        this.type = type;
        this.licensePlates = licensePlates;
        this.inService = inService;
        this.isBroken = isBroken;
        this.price = price;
        this.economyFactor = 500;

        (function tractorAI(tractorType, tractorlicencePlates, tractorPrice, economyFactor) {
            economy.workFactor += economyFactor;
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `
            <div class = "divCardMain">
                <div class = "divCard1">
                    <h3>NEW TRACTOR BOUGHT</h3>           
                    <ul>  
                        <li>MODEL: ${tractorType}</li>
                        <li>LICENSE PLATES: ${tractorlicencePlates}</li>                                  
                        <li>TRACTOR PRICE: ${tractorPrice}$</li>                                  
                    </ul>
                </div>
                <div class = "divCard2">
                    <img src="images/tractor.png" height="100%">
                </div>
            </div>
            `
            page.log.insertBefore(newDivItem, page.log.childNodes[0])
        })(this.type, this.licensePlates, this.price, this.economyFactor);

        setInterval(() => {
            if (this.inService === true && this.isBroken === false) {
                let randomBreakdownChance = random(100)
                if (this.health < randomBreakdownChance) {
                    this.isBroken = true;
                    economy.workFactor -= this.economyFactor;

                    let newDivItem = document.createElement('DIV');
                    newDivItem.innerHTML += ` <h3 class = "divCardMain" style = color:red; background-color: blue;" >VEHICLE  ${this.type} WITH LICENCE PLATES ${this.licensePlates} HAS BROKEN DOWN!</h3>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])
                    return;
                }
                else null;

                this.health -= 3;
            }
            else null;
        }, 10000)

    }

}

let generateTractor = () => {
    let type = `IMT 560 TRACTOR`
    let licensePlates = `SK-${random(10)}${random(10)}${random(10)}${random(10)}-${random(10)}${random(10)}`
    let price = 10000;

    //ON EVERY 1 TRACTOR DRIVER, 1 TRACTOR CAN BE BOUGHT
    if (machines.tractor < workers.tractorDriver && economy.totalBudget > price) {
        economy.totalBudget -= price;
        economy.farmExpenses -= price;

        machines.all++;
        machines.tractor++;
        arrayOfMachines.push(new Tractor(type, licensePlates, true, false, price));
    }
}
//#endregion

//#region FARM
class Farm {
    constructor(surfaceArea = 50000, stablesCount = 1, sleepingQuarters = 1, waterTowerCapacity = 1000, numberOfWells = 1) {
        this.surfaceArea = surfaceArea;
        this.stablesCount = stablesCount;
        this.sleepingQuarters = sleepingQuarters;
        this.waterTowerCapacity = waterTowerCapacity;
        this.numberOfWells = numberOfWells;

        globalDwellings.beds = this.sleepingQuarters * 5;
        globalDwellings.stables = this.stablesCount * 10;

        setInterval(() => {
            globalDwellings.wells = this.numberOfWells;
            if (resources.water < globalDwellings.waterTowerCapacity - this.numberOfWells * 10) {
                resources.water += this.numberOfWells * 2
            }

            globalDwellings.surface = this.surfaceArea;
            globalDwellings.surfaceOccupied = this.stablesCount * 10000 + this.sleepingQuarters * 10000;
            globalDwellings.occupiedSurface = 0;
            globalDwellings.beds = this.sleepingQuarters * 5;
            globalDwellings.stables = this.stablesCount * 10;
            globalDwellings.waterTowerCapacity = this.waterTowerCapacity;
        }, 1000)
    }

}
let farm = new Farm();
console.log(farm);


page.upgradeSleepingHouseButton.addEventListener(`click`, () => {
    if (globalDwellings.surface - globalDwellings.surfaceOccupied > 5000) {
        if (economy.totalBudget >= 10000) {
            farm.sleepingQuarters++;
            economy.totalBudget -= 10000;
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `
            <div class = "divCardMain">
                <div class = "divCard1">
                    <h3>NEW SLEEPING QUARTERS BUILT</h3>           
                    <ul>  
                        <li>COSTS: 10000$</li>
                        <li>SLEEPING PLACES: +5</li>                                  
                    </ul>
                </div>
                <div class = "divCard2">
                    <img src="images/sleepingQuarters.png" height="100%">
                </div>
            </div>
            `
            page.log.insertBefore(newDivItem, page.log.childNodes[0])


        }
        else {
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += ` <h3 class = "divCardMain">NOT ENOUGH MONEY FOR THIS UPGRADE</h3>`
            page.log.insertBefore(newDivItem, page.log.childNodes[0])
        }
    }
    else {
        let newDivItem = document.createElement('DIV');
        newDivItem.innerHTML += ` <h3 class = "divCardMain">NOT ENOUGH SURFACE AREA ON YOUR FARM</h3>`
        page.log.insertBefore(newDivItem, page.log.childNodes[0])
    }

})

page.upgradeStablesButton.addEventListener(`click`, () => {
    if (globalDwellings.surface - globalDwellings.surfaceOccupied > 5000) {
        if (economy.totalBudget >= 5000) {
            farm.stablesCount++;
            economy.totalBudget -= 5000;
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `
        <div class = "divCardMain">
            <div class = "divCard1">
                <h3>NEW STABLES BUILT</h3>           
                <ul>  
                    <li>COSTS: 5000$</li>
                    <li>STABLES CAPACITY: +10</li>                                  
                </ul>
            </div>
            <div class = "divCard2">
                <img src="images/stables.png" height="100%">
            </div>
        </div>
        `
            page.log.insertBefore(newDivItem, page.log.childNodes[0])


        }
        else {
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += ` <h3 class = "divCardMain">NOT ENOUGH MONEY FOR THIS UPGRADE</h3>`
            page.log.insertBefore(newDivItem, page.log.childNodes[0])
        }
    }
    else {
        let newDivItem = document.createElement('DIV');
        newDivItem.innerHTML += ` <h3 class = "divCardMain">NOT ENOUGH SURFACE AREA ON YOUR FARM</h3>`
        page.log.insertBefore(newDivItem, page.log.childNodes[0])
    }
})

page.upgradeWaterTowerButton.addEventListener(`click`, () => {
    if (economy.totalBudget >= 5000) {
        farm.waterTowerCapacity += 500;
        economy.totalBudget -= 5000;
        let newDivItem = document.createElement('DIV');
        newDivItem.innerHTML += `
        <div class = "divCardMain">
            <div class = "divCard1">
                <h3>WATER TOWER CAPACITY EXTENDED</h3>           
                <ul>  
                    <li>COSTS: 5000$</li>
                    <li>WATER TOWER CAPACITY +500</li>                                  
                </ul>
            </div>
            <div class = "divCard2">
                <img src="images/waterTower.png" height="100%">
            </div>
        </div>
        `
        page.log.insertBefore(newDivItem, page.log.childNodes[0])


    }
    else {
        let newDivItem = document.createElement('DIV');
        newDivItem.innerHTML += ` <h3 class = "divCardMain">NOT ENOUGH MONEY FOR THIS UPGRADE</h3>`
        page.log.insertBefore(newDivItem, page.log.childNodes[0])
    }
})

page.buyMoreSurfaceButton.addEventListener(`click`, () => {
    if (economy.totalBudget >= 20000) {
        farm.surfaceArea += 25000;
        economy.totalBudget -= 25000;
        let newDivItem = document.createElement('DIV');
        newDivItem.innerHTML += `
        <div class = "divCardMain">
            <div class = "divCard1">
                <h3>FARM SURFACE AREA EXTENDED</h3>           
                <ul>  
                    <li>COSTS: 20000$</li>
                    <li>SURFACE AREA +25000</li>                                  
                </ul>
            </div>
            <div class = "divCard2">
                <img src="images/surfaceArea.png" height="100%">
            </div>
        </div>
        `
        page.log.insertBefore(newDivItem, page.log.childNodes[0])


    }
    else {
        let newDivItem = document.createElement('DIV');
        newDivItem.innerHTML += ` <h3 class = "divCardMain">NOT ENOUGH MONEY FOR THIS UPGRADE</h3>`
        page.log.insertBefore(newDivItem, page.log.childNodes[0])
    }
})
//#endregion

//#region HUMAN
class Human extends Mammal {
    constructor(name = `name not specified`, gender = `gender not specified`, age = `age not specified`) {
        super(2, 2, `Human`)
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
}
class Worker extends Human {
    constructor(name, gender, age, workingPosition = `apprentice`, yearsOfService = 0, salary = 0, salaryBonus = 0, baseSalary = 0) {
        super(name, gender, age)
        this.isWorker = true;
        this.workingPosition = workingPosition.toLocaleUpperCase();
        this.yearsOfService = yearsOfService;
        this.baseSalary = baseSalary;
        this.salary = salary;
        this.salaryBonus = salaryBonus;
        this.works = true;

        switch (this.workingPosition) {
            case `FARMER`:
                economy.workFactor += 5;
                break;
            case `APPRENTICE`:
                economy.workFactor += 3;
                break;
            default:
                break;
        }

        (function workerAI(workerName, workerGender, workerAge, workerWorkingPosition, workerYearsOfService, workerSalary, workerSalaryBonus, workerBaseSalary) {
            if (workerWorkingPosition === `TRACTOR DRIVER`
                || workerWorkingPosition === `HAYSTACK COMBER`
                || workerWorkingPosition === `FARMER`
                || workerWorkingPosition === `ANIMAL HANDLER`
                || workerWorkingPosition === `APPRENTICE`
            ) {
                humans.all++;
                workers.all++;

                addRemoveWorkerPositions(workerWorkingPosition, '++');
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML = `
                <div class = "divCardMain">
                    <div class = "divCard1">
                        <h3>NEW WORKER HIRED</h3>
                        <ul>
                            <li>FARM WORKER NUMBER: ${workers.all}</li>
                            <li>NAME: ${workerName}</li>
                            <li>AGE: ${workerAge}</li>
                            <li>GENDER: ${workerGender}</li>
                            <li>WORKING POSITION: ${workerWorkingPosition}</li>
                            <li>YEARS OF SERVICE: ${workerYearsOfService}</li>
                            <li>BASE SALARY: ${workerBaseSalary}$</li>
                            <li>BONUSES: ${workerSalaryBonus}$</li>
                        </ul>
                    </div>
                    <div class = "divCard2">
                    <img src="images/${gender}${(Math.ceil(Math.random() * 4))}.jpg" height="100%">
                    </div>
                </div>
                    `
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

            }
            else {
                console.log(`SERVICE IS NOT REQUIRED`)
            }

        })(this.name, this.gender, this.age, this.workingPosition, this.yearsOfService, this.salary, this.salaryBonus, this.baseSalary);


        //SALARY, REVENUE, AGE AND YEARS OF SERVICE ARE UPDATED HERE
        setInterval(() => {
            if (this.works == true) {
                if (this.yearsOfService < 10) {
                    this.salaryBonus = parseInt((this.baseSalary * (this.yearsOfService / 10) * 50) / 150)
                }
                else if (this.yearsOfService > 10) {
                    this.salaryBonus = parseInt((this.baseSalary * (this.yearsOfService / 10) * 25) / 150)
                }
                this.salary = (this.baseSalary + this.salaryBonus)

                //IF THERE IS NO FOOD OR WATER WORKER LEAVES WORK
                if (resources.milk < 1) {
                    resources.meat--;
                    if (resources.meat < 1) {
                        this.works = false;
                        arrayOfWorkers.splice(this, 1);
                        let newDivItem = document.createElement('DIV');
                        newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 25px;color:red; background-color: black;">${this.name} has left the farm because there was no food!</h3>`
                        page.log.insertBefore(newDivItem, page.log.childNodes[0])
                    }
                    else null;
                }
                else resources.milk--;

                //console.log(`worker name and salary`, this.name, this.salary);

                if (resources.water > 1) {
                    resources.water--;
                }
                else {
                    this.works = false;
                    arrayOfWorkers.splice(this, 1);
                    let newDivItem = document.createElement('DIV');
                    newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 25px;color:red; background-color: black;">${this.name} has left the farm because there was no water!</h3>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])
                }


                economy.totalBudget -= this.baseSalary * 1.1;
                economy.salariesPaid -= this.baseSalary * 1.1;

                economy.totalBudget += (this.salary * 1.3);
                economy.workerRevenue += (this.salary * 1.3);

                this.age++;
                this.yearsOfService++;

                switch (this.workingPosition) {
                    case `TRACTOR DRIVER`:
                        null;
                        break;
                    case `HAYSTACK COMBER`:
                        resources.hay += parseInt((this.yearsOfService / 2) * 10 * economy.workFactorCalculated());

                        break;
                    case `FARMER`:
                        resources.hay += parseInt((this.yearsOfService / 2) * 5 * economy.workFactorCalculated());
                        resources.water += 1;
                        break;
                    case `ANIMAL HANDLER`:
                        null;
                        break;
                    case `APPRENTICE`:
                        resources.hay += parseInt((this.yearsOfService / 2) * 2 * economy.workFactorCalculated());
                        resources.water += 1;                        
                        break;
                    default:
                        break;
                }
            }
            else null;

        }, random(1000) + 9000)
    }
}
class Tourist extends Human {
    constructor(name, gender, age, reason = `sight seeing`) {
        super(name, gender, age)
        this.reason = reason.toUpperCase();
        this.touristTimeSpent = 0;
        this.touristBudget = random(5000);
        this.isOnFarm = true;
        this.touristBudgetThatCameWith = this.touristBudget;

        (function touristAI(touristName, touristGender, touristAge, touristReason) {
            humans.all++;
            tourists.all++;
            if (touristReason === `SIGHT SEEING`
                || (touristReason === `HORSE RIDING`)
                || (touristReason === `FOOD SHOPPING`)
            ) {
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `           
            <div class = "divCardMain">
                <div class = "divCard1">
                    <h3>NEW TOURIST VISIT LOGGED</h3>           
                    <ul>                
                        <li>NAME: ${touristName}</li>
                        <li>AGE: ${touristAge}</li>
                        <li>GENDER: ${touristGender}</li>               
                        <li>REASON OF VISIT: ${touristReason}</li>
                    </ul>
                </div>
                <div class = "divCard2">
                    <img src="images/${touristGender}${(Math.ceil(Math.random() * 4))}.jpg" height="100%">
                </div>
            </div>
            `
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

            }
            else {
                page.log.innerHTML += `TOURIST ${touristName} VISITED THE FARM FOR ${touristReason}, BUT FOUND NOTHING OF INTEREST`
            }

        })(this.name, this.gender, this.age, this.reason);

        setInterval(() => {
            if (this.isOnFarm === true) {
                this.touristTimeSpent++;
                switch (this.reason) {
                    case `SIGHT SEEING`:
                        economy.totalBudget += 100;
                        this.touristBudget -= 100;
                        break;
                    case `HORSE RIDING`:
                        if (livestock.horses > 0) {
                            economy.totalBudget += 500;
                            this.touristBudget -= 500;
                        }
                        else {
                            let newDivItem = document.createElement('DIV');
                            newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:purple; background-color: black;">Tourist ${this.name} came for ${this.reason} and has left the farm because there were no horses</p>`
                            page.log.insertBefore(newDivItem, page.log.childNodes[0])
                            this.isOnFarm = false;
                            arrayOfGuests.splice(this, 1)
                            return;
                        }

                    case `FOOD SHOPPING`:
                        let shopAmmountMilk = random(20);
                        let shopAmmountMeat = random(20);
                        console.log(random(20));
                        console.log(shopAmmountMilk, shopAmmountMeat, `||`, resources.milk, resources.meat);
                        if (resources.meat > shopAmmountMeat) {
                            resources.meat -= shopAmmountMeat
                            economy.totalBudget += shopAmmountMeat * 20;
                            this.touristBudget -= shopAmmountMeat * 20;
                        }
                        if (resources.milk > shopAmmountMilk) {
                            resources.milk -= shopAmmountMilk
                            economy.totalBudget += shopAmmountMilk * 20;
                            this.touristBudget -= shopAmmountMilk * 20;
                        }
                        else if (resources.milk < shopAmmountMeat && resources.milk < shopAmmountMeat) {
                            arrayOfGuests.splice(this, 1);
                            this.isOnFarm = false
                            let newDivItem = document.createElement('DIV');
                            newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:purple; background-color: pink;">Tourist ${this.name} came for ${this.reason} and has left the farm because there was nothing to shop</p>`
                            page.log.insertBefore(newDivItem, page.log.childNodes[0])
                        }
                        else null;

                        break;
                    default:
                        break;
                }
            }
            else null;
        }, 10000)
    }

}
let randomName = (gender) => {
    if (gender === `male`) {
        let arrayOfMaleNames = [`Trajko`, `Petko`, `Mitko`, `Ratko`, `Zoran`, `Goran`, `Simeon`, `Aleksandar`, `Fenjir`, `Fuat`, `Onur`]
        let arrayOfMaleLastNames = [`Acevski`, `Petkovski`, `Mitkov`, `Ratkovski`, `Zogravski`, `Goranovski`, `Simonovski`, `Spasevski`, `Nikolovski`, `Mehmed`, `Kishov`]

        let randomMaleName = arrayOfMaleNames[random(arrayOfMaleNames.length)]
        let randomMaleLastName = arrayOfMaleLastNames[random(arrayOfMaleLastNames.length)]

        return `${randomMaleName.toUpperCase()} ${randomMaleLastName.toUpperCase()}`
    }
    else if (gender === `female`) {

        let arrayOfFemaleNames = [`Martina`, `Sara`, `Elena`, `Aleksandra`, `Ana`, `Renata`, `Bojana`, `Kristina`, `Sonja`, `Ivana`, `Tina`]
        let arrayOfFemaleLastNames = [`Martinovska`, `Spasevska`, `Ilajzovska`, `Skenderovska`, `Nikolovska`, `Ristevska`, `Ugrinovska`, `Kralevic`, `Markovska`, `Vrvenovska`, `Manojlovska`]

        let randomFemaleName = arrayOfFemaleNames[random(arrayOfFemaleNames.length)]
        let randomFemaleLastNames = arrayOfFemaleLastNames[random(arrayOfFemaleLastNames.length)]

        return `${randomFemaleName.toUpperCase()} ${randomFemaleLastNames.toUpperCase()}`;
    }
    else return;
}
let hireRandomWorker = () => {
    if (workers.all < globalDwellings.beds) {
        let arrayOfJobs = [`TRACTOR DRIVER`, `HAYSTACK COMBER`, `FARMER`, `ANIMAL HANDLER`, `APPRENTICE`]

        let gender = random(2);
        let age = random(50) + 15       
        let yearsOfService = 0;
        let job = arrayOfJobs[random(arrayOfJobs.length)]

        let workerSalary = 0;
        let workerSalaryBonus = 0;
        let workerSalaryBase = 0;

        switch (job) {
            case `OVERSEER`:
                workerSalaryBase = 1200;
                break;
            case `TRACTOR DRIVER`:
                workerSalaryBase = 500;
                break;
            case `HAYSTACK COMBER`:
                workerSalaryBase = 230;
                break;
            case `FARMER`:
                workerSalaryBase = 250;
                break;
            case `ANIMAL HANDLER`:
                workerSalaryBase = 400;
                break;
            case `APPRENTICE`:
                workerSalaryBase = 30;
                break;

            default:
                break;
        }

        yearsOfService < 10
            ? workerSalaryBonus = parseInt((workerSalaryBase * yearsOfService * 50) / 150)
            : workerSalaryBonus = parseInt((workerSalaryBase * yearsOfService * 25) / 150)


        if (gender === 1) {//MALE
            arrayOfWorkers.push(new Worker(`${randomName(`male`)}`, `Male`, age, job, yearsOfService, workerSalary, workerSalaryBonus, workerSalaryBase))
        }
        else if (gender === 0) {//FEMALE
            arrayOfWorkers.push(new Worker(`${randomName(`female`)}`, `Female`, age, job, yearsOfService, workerSalary, workerSalaryBonus, workerSalaryBase));
        }
    }
    else null;

}
let generateRandomTourist = () => {
    let arrayOfActivities = [`SIGHT SEEING`, `HORSE RIDING`, `FOOD SHOPPING`]

    let gender = random(2);
    let age = random(50) + 15;

    let activity = arrayOfActivities[Math.floor(Math.random() * arrayOfActivities.length)]


    if (gender === 1) {//MALE
        arrayOfGuests.push(new Tourist(`${randomName(`male`)}`, `Male`, age, activity))
    }
    else if (gender === 0) {//FEMALE
        arrayOfGuests.push(new Tourist(`${randomName(`female`)}`, `Female`, age, activity));
    }
}
function addRemoveWorkerPositions(parameter, operator) {
    if (operator === `--`) {
        switch (parameter) {
            case `TRACTOR DRIVER`:
                workers.tractorDriver--
                break;
            case `HAYSTACK COMBER`:
                workers.haystackComber--
                break;
            case `FARMER`:
                workers.farmer--;
                break;
            case `ANIMAL HANDLER`:
                workers.animalHandler--;
                break;
            case `APPRENTICE`:
                workers.apprentice--;
                break;
            default:
                break;
        }
    }
    else if (operator === `++`) {
        switch (parameter) {
            case `TRACTOR DRIVER`:
                workers.tractorDriver++
                break;
            case `HAYSTACK COMBER`:
                workers.haystackComber++
                break;
            case `FARMER`:
                workers.farmer++;
                break;
            case `ANIMAL HANDLER`:
                workers.animalHandler++;
                break;
            case `APPRENTICE`:
                workers.apprentice++;
                break;
            default:
                break;
        }
    }
    else console.warn(`please type '++' or '--' in the operator fields`);


}
//#endregion

//#region ANIMAL
class Horse extends Mammal {
    constructor(age, color, weight, price) {
        super(4, 0, `Horse`)
        this.age = age;
        this.color = color;
        this.weight = weight;
        this.price = price;
        this.eats = `Hay`;
        this.sick = false;

        this.color.toUpperCase();

        (function horseAI(horseAge, horseColor, horseWeight, horsePrice) {
            economy.workFactor += parseInt((horseWeight + 300 / horseAge + 15) / 30)
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `
            <div class = "divCardMain">
            <div class = "divCard1">
                <h3>A ${horseColor} HORSE HAS BEEN BOUGHT</h3>           
                <ul>  
                    <li>AGE: ${horseAge}</li>                   
                    <li>WEIGHT: ${horseWeight} KG</li>          
                    <li>HORSE PRICE: ${Math.floor(horsePrice)} $</li>
                </ul>
            </div>
            <div class = "divCard2">
                <img src="images/${horseColor}horse.png" height="100%">
            </div>
        </div>
            `
            page.log.insertBefore(newDivItem, page.log.childNodes[0])

        })(this.age, this.color, this.weight, this.price);

        setInterval(() => {
            if (this.age != -1) {
                this.age++;
                if (this.age > 45 || this.weight < 100) {
                    arrayOfAnimals.splice(this, 1)

                    let newDivItem = document.createElement('DIV');
                    newDivItem.innerHTML += `<h3 class ="dropDown" style="color: white; background-color:black">A ${this.color} HORSE HAS JUST DIED ON YOUR FARM BECAUSE OF OLD AGE, AND THE MEAT HAD TO BE THROWN OUT</h3>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])

                    this.age = -1;
                    return;
                }
                if (resources.hay > 0 && resources.water > 0) {
                    this.weight += random(2)
                    resources.hay -= 2;
                    resources.water -= 2;
                }
                else {
                    this.weight -= random(10)
                }

                let sicknessRandomNumber = random(100)
                let terminalSicknessRandomNumber = random(100)

                if (sicknessRandomNumber < 3) {
                    this.sick = true;
                }
                if (this.sick === true) {
                    if (terminalSicknessRandomNumber < 3) {
                        this.age = -1;
                        animals.all--;
                        livestock.horses--;
                        let newDivItem = document.createElement('DIV');
                        newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A ${this.color} HORSE HAS DIED FROM SICKNESS</h3>`
                        page.log.insertBefore(newDivItem, page.log.childNodes[0])
                    }
                    else {
                        this.weight -= random(5)
                    }

                }
            }
            else null;

        }, 10000)
    }
}

class Pig extends Mammal {
    constructor(age = 1, weight = 50, price = 100) {
        super(4, 0, `Pig`)
        this.age = age;
        this.weight = weight;
        this.price = price;
        this.eats = `Hay`;
        this.sick = false;

        (function pigAI(pigAge, pigWeight, pigPrice) {
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `
            <div class = "divCardMain">
            <div class = "divCard1">
                <h3>A PIG HAS BEEN BOUGHT</h3>           
                <ul>  
                    <li>AGE: ${pigAge}</li>
                    <li>WEIGHT: ${pigWeight} KG</li>          
                    <li>PIG PRICE: ${Math.floor(pigPrice)} $</li>
                </ul>
            </div>
            <div class = "divCard2">
                <img src="images/pig.png" height="100%">
            </div>
        </div>
            `
            page.log.insertBefore(newDivItem, page.log.childNodes[0])

        })(this.age, this.weight, this.price);

        setInterval(() => {
            if (this.age != -1) {
                this.age++;
                if (this.age > 25 || this.weight < 20) {
                    arrayOfAnimals.splice(this, 1)

                    let newDivItem = document.createElement('DIV');
                    newDivItem.innerHTML += `<h3 class ="dropDown" style="color: white; background-color:black">A PIG HAS JUST DIED ON YOUR FARM BECAUSE OF OLD AGE, AND THE MEAT HAD TO BE THROWN OUT</h3>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])

                    this.age = -1;
                    return;
                }
                if (resources.hay > 0 && resources.water > 0) {
                    this.weight += random(20)
                    resources.hay--;
                    resources.water--;
                }
                else {
                    this.weight -= random(20)
                }

                let sicknessRandomNumber = random(100);
                let terminalSicknessRandomNumber = random(100);

                if (sicknessRandomNumber < 5) {
                    this.sick = true;
                }
                if (this.sick === true) {
                    if (terminalSicknessRandomNumber < 5) {
                        this.age = -1;
                        animals.all--;
                        livestock.pigs--;
                        let newDivItem = document.createElement('DIV');
                        newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A PIG HAS DIED FROM SICKNESS</h3>`
                        page.log.insertBefore(newDivItem, page.log.childNodes[0])
                    }
                    else {
                        this.weight -= random(10)
                    }

                }
            }
            else null;

        }, 10000)
    }
}

class Cow extends Mammal {
    constructor(age, milkAmount, weight, price) {
        super(4, 0, `Cow`)
        this.age = age;
        this.milkAmount = milkAmount;
        this.weight = weight;
        this.price = price;
        this.eats = `Hay`;
        this.sick = false;

        (function cowAI(cowAge, cowMilkAmount, cowWeight, cowPrice) {
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `
            <div class = "divCardMain">
            <div class = "divCard1">
                <h3>A COW HAS BEEN BOUGHT</h3>           
                <ul>  
                    <li>AGE: ${cowAge}</li>
                    <li>WEIGHT: ${cowWeight} KG</li>               
                    <li>MILK PER MONTH: ${cowMilkAmount} LITERS</li>
                    <li>COW PRICE: ${Math.floor(cowPrice)} $</li>
                </ul>
            </div>
            <div class = "divCard2">
                <img src="images/cow.jpg" height="100%">
         </div>
        </div>
            `
            page.log.insertBefore(newDivItem, page.log.childNodes[0])

        })(this.age, this.milkAmount, this.weight, this.price);

        setInterval(() => {
            if (this.age != -1) {
                this.age++;
                if (this.age > 30 || this.weight < 80) {
                    arrayOfAnimals.splice(this, 1)

                    let newDivItem = document.createElement('DIV');
                    newDivItem.innerHTML += `<h3 class ="dropDown" style="color: white; background-color:black">A COW HAS JUST DIED ON YOUR FARM BECAUSE OF OLD AGE, AND THE MEAT HAD TO BE THROWN OUT</h3>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])

                    this.age = -1;
                    return;
                }
                if (resources.hay > 0 && resources.water > 0) {
                    this.weight += random(10)
                    this.milkAmount++;
                    resources.hay--;
                    resources.water--;
                }
                else {
                    this.weight -= random(20)
                    this.milkAmount -= 2;
                }

                if (this.age > 15) {
                    if (this.milkAmount > 0) {
                        this.milkAmount--
                    }
                }

                let sicknessRandomNumber = random(100);
                let terminalSicknessRandomNumber = random(100);
                // console.log(`===========`);
                // console.log(`sickness random number`, sicknessRandomNumber);
                // console.log(`terminal sickness random number`, terminalSicknessRandomNumber);
                // console.log(this.sick);
                // console.log(`===================`);

                if (sicknessRandomNumber < 5) {
                    this.sick = true;
                }
                if (this.sick === true) {
                    if (terminalSicknessRandomNumber < 5) {
                        this.age = -1;
                        animals.all--;
                        livestock.cows--;
                        let newDivItem = document.createElement('DIV');
                        newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A COW HAS DIED FROM SICKNESS</h3>`
                        page.log.insertBefore(newDivItem, page.log.childNodes[0])
                    }
                    else {
                        this.milkAmount /= 2;
                        this.weight -= random(100);
                    }

                }


                resources.milk += this.milkAmount;
            }
            else null;

        }, 10000)
    }
}
let generateCow = () => {
    if (animals.all < globalDwellings.stables) {
        let age = random(3) + 1;
        let milkAmount = random(20) + 5;
        let weight = random(100) + 100;

        let price = (milkAmount * weight) / age / 10

        //ON EVERY 1 ANIMAL HANDLER, 3 COWS CAN BE BOUGHT
        if (livestock.cows < workers.animalHandler * 3 && economy.totalBudget > price) {
            economy.totalBudget -= price;
            economy.farmExpenses -= price;

            animals.all++;
            livestock.cows++;
            arrayOfAnimals.push(new Cow(age, milkAmount, weight, price));
        }
    }
}

let generatePig = () => {
    if (animals.all < globalDwellings.stables) {
        let age = 1;
        let weight = random(100) + 100

        let price = weight / age

        //ON EVERY 1 ANIMAL HANDLER, 6 PIGS CAN BE BOUGHT
        if (livestock.pigs < workers.animalHandler * 6 && economy.totalBudget > price) {
            economy.totalBudget -= price;
            economy.farmExpenses -= price;

            animals.all++;
            livestock.pigs++;
            arrayOfAnimals.push(new Pig(age, weight, price));
        }
    }
}
let generateHorse = () => {
    if (animals.all < globalDwellings.stables) {
        let age = random(5) + 1;
        let weight = random(200) + 200;

        let price = weight / age * 10

        let colors = [`BLACK`, `WHITE`, `BROWN`, `ALBINO`]
        let color = colors[random(3)]

        //ON EVERY 1 FARMER, 3 HORSES CAN BE BOUGHT
        if (livestock.horses < workers.farmer * 3 && economy.totalBudget > price) {
            economy.totalBudget -= price;
            economy.farmExpenses -= price;

            animals.all++;
            livestock.horses++;
            arrayOfAnimals.push(new Horse(age, color, weight, price));
        }
    }
}
//#endregion


hireRandomWorker();

//INSPECTION AND AI CHECKS

//#region INSPECTION FOR IREGULARITIES
let inspection = () => {
    let newDivItem = document.createElement('DIV');
    newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:red; background-color: black;">An inspection is conducting on the farm...</p>`
    page.log.insertBefore(newDivItem, page.log.childNodes[0])
    let fines = 0;

    setTimeout(() => {
        (function trudovaInspekcija() {
            for (let worker of arrayOfWorkers) {
                let newDivItem = document.createElement('DIV');
                if (worker.age < 18) {
                    newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:cyan; background-color: black;">worker ${worker.name} was sent home because of young age</p>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])

                    humans.all--;
                    workers.all--;
                    addRemoveWorkerPositions(worker.workingPosition, '--');
                    worker.works = false;
                    console.log(`after kick`, worker.works);
                    arrayOfWorkers.splice(worker, 1)
                    fines++;
                    continue;
                }
                else if (worker.age > 70) {
                    newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:yellow; background-color: black;">worker ${worker.name} was retired due to old age</p>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])
                    humans.all--;
                    workers.all--;
                    addRemoveWorkerPositions(worker.workingPosition, '--');
                    worker.works = false;
                    console.log(`after kick`, worker.works);
                    arrayOfWorkers.splice(worker, 1)
                    fines++;
                    continue;
                }
                else if (worker.yearsOfService > 20) {
                    newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:yellow; background-color: cyan;">worker ${worker.name} was retired and was granted bonus money</p>`
                    page.log.insertBefore(newDivItem, page.log.childNodes[0])
                    economy.totalBudget -= 1000;
                    humans.all--;
                    workers.all--;
                    addRemoveWorkerPositions(worker.workingPosition, '--');
                    worker.works = false;
                    console.log(`after kick`, worker.works);
                    arrayOfWorkers.splice(worker, 1)
                    continue;
                }
            }
            if (fines === 0) {
                newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:green; background-color: yellow;">Everythings seems to be in order</p>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
            }
            else {
                newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:yellow; background-color: red;">Some irregularities were found on your farm</p>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
            }
        })();
    }, 10000)

    //INSPECTION FINISHED
    setTimeout(() => {
        if (fines !== 0) {
            economy.totalBudget -= (fines * 500);

            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:black; background-color: red;">Inspection has finished. You have been charged ${fines * 500}$ for ${fines} found irregularities.</p>`
            fines = 0;
            page.log.insertBefore(newDivItem, page.log.childNodes[0])


        }
        else {
            let newDivItem = document.createElement('DIV');
            newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:yellow; background-color: Green;">Inspection has finished. Everything seems to be in order. Thank you for your cooperation.</p>`
            page.log.insertBefore(newDivItem, page.log.childNodes[0])
        }

    }, 2500)
}

//INSPECTION INTERVAL
setInterval(() => {
    let randomNumber = random(100)
    if (randomNumber < 6) {
        inspection();
    }
}, 10000)
//#endregion

//#region VETERINARY INSPECTOR
setInterval(() => {
    (function veterinaryInspector() {
        let veterinaryCost = 100;
        economy.totalBudget -= veterinaryCost;
        let numberOFsickAnimalsFound = 0;
        let newDivItem = document.createElement('DIV');

        newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:WHITE; background-color: darkred;">A VERERINARY HAS BEEN HIRED TO CHECK THE ANIMALS, AND COSTED ${veterinaryCost} $</h3>`
        page.log.insertBefore(newDivItem, page.log.childNodes[0])

        for (let animal of arrayOfAnimals) {
            if ((animal instanceof Cow) === true && animal.sick === true) {
                numberOFsickAnimalsFound++;
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A COW HAS BEEN FOUND SICK AND TAKEN CARE OF</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
                animal.sick = false;
                continue;
            }
            if ((animal instanceof Pig) === true && animal.sick === true) {
                numberOFsickAnimalsFound++;
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A PIG HAS BEEN FOUND SICK AND TAKEN CARE OF</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
                animal.sick = false;
                continue;
            }
            if ((animal instanceof Horse) === true && animal.sick === true) {
                numberOFsickAnimalsFound++;
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A HORSE HAS BEEN FOUND SICK AND TAKEN CARE OF</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
                animal.sick = false;
                continue;
            }
            else continue;
        }
        setTimeout(() => {
            if (numberOFsickAnimalsFound === 0) {
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: pink;"> NO SICK ANIMALS WERE FOUND ON THE FARM</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
            }
            else {
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:white; background-color: darkred;"> ${numberOFsickAnimalsFound} SICK ANIMALS WERE FOUND, AND THE VET CHARGED ${numberOFsickAnimalsFound * veterinaryCost} $</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])
            }
        }, 2000)

    })();
}, 100000)
//#endregion

//#region AI CHECK FOR TOURIST
setInterval(() => {
    (function touristInspector() {
        for (let tourist of arrayOfGuests) {
            let newDivItem = document.createElement('DIV');
            if (tourist.touristTimeSpent > 10) {
                newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:cyan; background-color: blue;">Tourist ${tourist.name} spent ${tourist.touristTimeSpent} months on your farm, spent ${tourist.touristBudgetThatCameWith - tourist.touristBudget} $ and had a great time on your farm and left home</p>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

                humans.all--;
                tourists.all--;
                tourist.isOnFarm = false;
                arrayOfGuests.splice(tourist, 1)
                continue;
            }
            else if (tourist.touristBudget < 100) {
                newDivItem.innerHTML += `<p class ="dropDown" style = "font-size: 20px;color:cyan; background-color: blue;">Tourist ${tourist.name} spent ${tourist.touristTimeSpent} months on your farm, spent ${tourist.touristBudgetThatCameWith} $ and had a great time on your farm</p>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

                humans.all--;
                tourists.all--;
                tourist.isOnFarm = false;
                arrayOfGuests.splice(tourist, 1)
                continue;
            }
            else continue;

        }
    })();
}, 10000)
//#endregion

//#region REGULAR BUTCHER VISIT
setInterval(() => {
    (function butcherInspector() {
        economy.totalBudget -= 200;
        let newDivItem = document.createElement('DIV');

        newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;">A BUTCHER HAS BEEN HIRED TO CHECK THE ANIMALS, AND COSTED 200$</h3>`
        page.log.insertBefore(newDivItem, page.log.childNodes[0])

        for (let animal of arrayOfAnimals) {
            if ((animal instanceof Cow) === true && (animal.age > 20 && animal.weight > 200) || animal.weight > 300) {
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A COW HAS BEEN BUTCHERED AND GAVE ${Math.floor(animal.weight / 2)} KG MEAT</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

                animals.all--;
                livestock.cows--;
                resources.meat += animal.weight / 2
                animal.age = -1;
                arrayOfAnimals.splice(animal, 1)
                continue;
            }
            if ((animal instanceof Pig) === true && (animal.age > 10 && animal.weight > 80) || animal.weight > 200) {
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> A PIG HAS BEEN BUTCHERED AND GAVE ${parseInt(animal.weight / 1.2)} KG MEAT</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

                animals.all--;
                livestock.pigs--;
                resources.meat += animal.weight / 1.2
                animal.age = -1;
                arrayOfAnimals.splice(animal, 1)
                continue;
            }
            if ((animal instanceof Horse) === true && animal.age > 30 && animal.weight > 100) {
                let newDivItem = document.createElement('DIV');
                newDivItem.innerHTML += `<h3 class ="dropDown" style = "font-size: 20px;color:black; background-color: red;"> AN OLD HORSE HAS BEEN BUTCHERED AND GAVE ${parseInt(animal.weight / 3)} KG MEAT</h3>`
                page.log.insertBefore(newDivItem, page.log.childNodes[0])

                animals.all--;
                livestock.horses--;
                resources.meat += animal.weight / 3
                animal.age = -1;
                arrayOfAnimals.splice(animal, 1)
                continue;
            }
            else continue;
        }
    })();
}, 80000)
//#endregion


//INTERVAL REGIONS

//#region TOP PAGE TABLE AND IT'S INTERVALS
function months(number) {
    let months = ['', "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    if (monthCounter === 12) {
        monthCounter = 0;
    }

    return months[number];

}
function tablePrint() {
    page.table.innerHTML = `
    <tr>
        <td>${months(monthCounter)}</td>
        <td>${globalDwellings.surfaceOccupied}/${globalDwellings.surface}</td>
        <td>${machines.all}</td>
        <td>${workers.all}/${globalDwellings.beds}</td>
        <td>${animals.all}/${globalDwellings.stables}</td>
        <td>${parseInt(resources.milk)}</td>
        <td>${parseInt(resources.meat)}</td>
        <td>${resources.hay}</td>
        <td>${resources.water}/${globalDwellings.waterTowerCapacity}</td>       
        <td>${workers.tractorDriver}</td>
        <td>${workers.haystackComber}</td>
        <td>${workers.farmer}</td>
        <td>${workers.animalHandler}</td>
        <td>${workers.apprentice}</td>  
        <td>${Math.floor(economy.workFactor)}</td>
        <td>${Math.floor(economy.salariesPaid)} $</td>
        <td>${Math.floor(economy.workerRevenue)} $</td>        
        <td>${Math.floor(economy.farmExpenses)} $</td>        
        <td>${Math.floor(economy.totalBudget)} $</td>
    </tr>
    `
}
tablePrint();
setInterval(() => {
    tablePrint();
}, 1000)
setInterval(() => {
    monthCounter++;
}, 10000)
//#endregion

//#region INTERVALS

//WORKER INTERVAL
setInterval(() => {
    if (economy.totalBudget > 1000) {
        hireRandomWorker();
        economy.totalBudget -= 1000;
    };
}, 8000)

//TOURIST INTERVAL
setInterval(() => {
    let randomNumberWithDependancy = Math.floor(Math.random() * 1000 / (((resources.meat + resources.milk + livestock.horses) + 2000) / 1000))
    console.log(randomNumberWithDependancy);
    if (randomNumberWithDependancy < 100) {
        generateRandomTourist();
    }
}, 10000)

//COW INTERVAL
setInterval(() => {
    generateCow();
}, 12000)

//PIG INTERVAL
setInterval(() => {
    generatePig();
}, 10000)

//HORSE INTERVAL
setInterval(() => {
    generateHorse();
}, 20000)


//TRACTOR INTERVAL
setInterval(() => {
    generateTractor();
}, 1000)

//#endregion