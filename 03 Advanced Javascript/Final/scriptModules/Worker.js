
class Worker extends Human {
    constructor(name, gender, age, workingPosition = `apprentice`, yearsOfService = 0, salary = 0, salaryBonus = 0) {
        super(name, gender, age)
        this.isWorker = true;
        this.workingPosition = workingPosition.toLocaleUpperCase();
        this.yearsOfService = yearsOfService;
        this.salary = salary;
        this.salaryBonus = salaryBonus;

        (function hehe(workerName, workerGender, workerAge, workerWorkingPosition, workerYearsOfService, workerSalary, workerSalaryBonus) {

            if (workerAge >= 18 && workerAge < 70) {
                if (workerWorkingPosition === `TRACTOR DRIVER`
                    || workerWorkingPosition === `HAYSTACK COMBER`
                    || workerWorkingPosition === `FARMER`
                    || workerWorkingPosition === `ANIMAL HANDLER`
                    || workerWorkingPosition === `APPRENTICE`
                ) {
                    globalPeopleCount++;
                    globalWorkerCount++;

                    //SALARY FOR THE WORKER AND REVENUE FROM THE WORKER
                    setInterval(() => {
                        globalBudget -= workerSalaryBonus;
                        workerSalariesPaid -= workerSalaryBonus;

                        globalBudget += workerSalaryBonus * 1.3;
                        workerRevenue += workerSalaryBonus * 1.3;

                    }, 10000)

                    console.log(`FARM WORKER NUMBER ${globalWorkerCount}:\n NAME: ${workerName}\n GENDER: ${workerGender}\n AGE: ${workerAge} \n WORKING POSITION: ${workerWorkingPosition}\n YEARS OF SERVICE: ${workerYearsOfService} \n BASE SALARY: ${workerSalary}$\n SALARY WITH BONUSES: ${workerSalaryBonus}$`)
                }
                else {
                    console.log(`WORKER ${workerName.toUpperCase} WAS AT APROPRIATE AGE, BUT SERVICE IS NOT REQUIRED`)
                }
            }
            else
                console.log(`WORKER ${workerName.toUpperCase()} WAS NOT HIRED DUE TO INAPROPRIATE AGE (${workerAge}) BUT IS STILL AT THE FARM`);
        })(this.name, this.gender, this.age, this.workingPosition, this.yearsOfService, this.salary, this.salaryBonus);


        setInterval(() => {
            this.yearsOfService++;
            globalWorkerCount;
            globalPeopleCount;
        }, 10000)
    }
}