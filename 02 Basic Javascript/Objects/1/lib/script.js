//script.js
/*EXERCISE 5
Create a student registry form. The form should have:

First Name
Last Name
Age

The form should have a save button which will create a student object and 
add it to an array (students). Log the array after every save to see
the results in the console. 
Bonus: Make the students appear in an unordered list in the page.*/

$(document).ready(function(){

    let students = [];
    function Student(first, last, age){
      this.firstName = first;
      this.lastName = last;
      this.age = age;
    }
    
    function showStudents(studentsArr, element){
      element.innerHTML = "";
      for (let student of studentsArr) {
        element.innerHTML += `<li><b>Name:</b> ${student.firstName} ${student.lastName}, 
        <b>Age:</b> ${student.age}</li>`;
      }
    }
    let studentForm = document.getElementById("studentForm");
    let result = document.getElementById("result1");
    
    studentForm.getElementsByTagName("button")[0].addEventListener("click", function(){
      let first = studentForm.children[0].value;
      let last = studentForm.children[1].value;
      let age = studentForm.children[2].value;
      let newStudent = new Student(first, last, age);
      students.push(newStudent);
      showStudents(students, result.getElementsByTagName("ul")[0]);
      studentForm.children[0].value = "";
      studentForm.children[1].value = "";
      studentForm.children[2].value = "";
    });

});


