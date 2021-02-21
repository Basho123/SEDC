// script.js for HOF
/*
    # HomeWork

    There is a JSON file with students. Make a call to the file and get the following data from it:
    * All students with an average grade higher than 3
    * All students with an average grade between 2 and 5
    * All female student names with an average grade of 5
    * All male student full names who live in Skopje and are over 18 years old
    * The average grades of all female students over the age of 24
    * All male students with a name starting with B and average grade over 2
    * The average grades of all female students over the age of 16 and who lives in Skopje and has "L" or "l" in their last name
    * Callback function that will return result of multiplication of two numbers
    * Callback function that will print the result of every user from "https://jsonplaceholder.typicode.com/users"

    Use higher order functions to find the answers
    **Link:** https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json
*/

fetch(`https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json`)
    .then(convert => convert.json())
    .then(students => {

        let avgGradeHigherThan3 = students.filter(student => student.averageGrade > 3);
        console.log(`Students with average grade higher than 3`, avgGradeHigherThan3);

        let avgGradeBetween2and5 = students.filter(student => student.averageGrade > 2 && student.averageGrade < 5);
        console.log(`Students with average grades between 2 and 5`, avgGradeBetween2and5);

        let femalesWithAvgGrade5 = students.filter(student => student.gender == `Female` && student.averageGrade === 5);
        console.warn(`Female students with average grades of 5`, femalesWithAvgGrade5);

        let maleStudentFullNamesSkopje18YO = []
        students.map(student => {
            student.city == `Skopje` && student.age >= 18 && student.gender == `Male`
                ? maleStudentFullNamesSkopje18YO.push(`From ${student.city}, age ${student.age}: ${student.firstName} ${student.lastName}`)
                : false;
        })
        console.log(` All male student full names who live in Skopje and are over 18 years old`, maleStudentFullNamesSkopje18YO);

        let averageGradesOfAllFemaleStudentsOver24 = []
        students.map(student => {
            student.gender == `Female` && student.age > 24
                ? averageGradesOfAllFemaleStudentsOver24.push(`Age ${student.age}: ${student.firstName} ${student.lastName}, has average grade of ${student.averageGrade}`)
                : false;
        })
        console.log(`The average grades of all female students over the age of 24`, averageGradesOfAllFemaleStudentsOver24);

        //All male students with a name starting with B and average grade over 2
        let maleStudentsOnBOver2 = students.filter(student => student.gender == `Male` && student.firstName[0] === `B` && student.averageGrade > 2)
        console.log(`All male students with a name starting with B and average grade over 2`, maleStudentsOnBOver2);

        //The average grades of all female students over the age of 16 and who lives in Skopje and has "L" or "l" in their last name
        let itWillBeAVeryLongVariableNameIfITryToNameThisVariable = []

        students
            .filter(student => student.age > 16 && student.city === `Skopje` && student.gender === `Female`)
            .forEach(student => student.firstName.indexOf('L') || student.firstName.indexOf('l')
                ? itWillBeAVeryLongVariableNameIfITryToNameThisVariable.push(`${student.firstName} ${student.lastName} has average grade of ${student.averageGrade}`)
                : false);

        console.log(`The average grades of all female students over the age of 16 and who lives in Skopje and has "L" or "l" in their last name`, itWillBeAVeryLongVariableNameIfITryToNameThisVariable);

        //* Callback function that will return result of multiplication of two numbers
        let mult2Numbers = (calculate, number1, number2) => {
            return calculate(number1, number2)
        }
        let multiply = (number1, number2) => number1 * number2;
        console.log(mult2Numbers(multiply, 2, 5));
    })
    .catch(error => console.error(`FAILED FETCHING, CHECK YOUR SPELLING`, error))


// e ova neznam zasto bi go naprail i kako bi go naprail so callback function
let printResultOfEveryUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => response.json())
        .then(users => {
            let resultOfEveryUser = [];
            users.forEach(user => {
                resultOfEveryUser.push(user.name)
                //and so on
            })
            console.log(resultOfEveryUser);
        })
        .catch(error => console.error(`FAILED FETCHING, CHECK YOUR SPELLING`, error))
}

printResultOfEveryUser();