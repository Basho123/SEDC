using AcademyAppLibrary.Enums;
using AcademyAppLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace AcademyAppServices.Models
{
    static public class Assets
    {
        static public bool UsernameExists(string stringToCheck, List<Person> listOfUsers)
        {
            List<Person> userToCheck = listOfUsers
                .Where(user => stringToCheck == user.UserName)
                .ToList();
            return userToCheck.Count > 0 && userToCheck.FirstOrDefault().UserName == stringToCheck;
        }
        static public bool IsValidPassword(string userToCheck, string passwordToCheck, List<Person> listOfUsers)
        {
            List<Person> correctUser = listOfUsers
                                    .Where(user => passwordToCheck == user.Password && userToCheck == user.UserName)
                                    .ToList();
            return correctUser.Count > 0;
        }
        static public Role GetPersonRole(string user, List<Person> listOfUsers)
        {
            Role foundRole = Role.Student;
            foreach (Person item in listOfUsers)
            {
                if (user == item.UserName) foundRole = item.Role;
            }
            return foundRole;
        }
        static public Person getPersonFromUsername(string stringToCheck, List<Person> listOfUsers)
        {
            List<Person> getUser = listOfUsers
                .Where(user => user.UserName == stringToCheck)
                .ToList();
            return getUser.FirstOrDefault();
        }
        static public void RemoveUser(string stringToCheck, List<Person> listOfUsers)
        {
            List<Person> user = listOfUsers
           .Where(user => stringToCheck == user.UserName)
           .ToList();
            listOfUsers.Remove(user.FirstOrDefault());
        }
        static public void PromoteUser(string stringToCheck, List<Person> listOfUsers, Role roleToSet)
        {
            List<Person> user = listOfUsers
           .Where(user => stringToCheck == user.UserName)
           .ToList();
            user.FirstOrDefault().Role = roleToSet;
        }
        static public bool ValidateStringForNameFormat(string userInput)
        {
            Regex stringIsLetters = new Regex("^[a-zA-Z]+$");

            if (!stringIsLetters.IsMatch(userInput))
            {
                Console.WriteLine("Please input only letters in the field");
                PressAnyKeyToContinue();
            }
            else if (userInput.Length <= 2)
            {
                Console.WriteLine("Please input more than 2 characters");
                PressAnyKeyToContinue();
            }
            else return true;

            return false;
        }
        static public bool ValidateStringForUsernameFormat(string userInput)
        {
            Regex stringIsOnlyLettersAndNumbers = new Regex("^[a-zA-Z0-9]+$");
            if (!stringIsOnlyLettersAndNumbers.IsMatch(userInput))
            {
                Console.WriteLine("Please input only letters or numbers the field");
                PressAnyKeyToContinue();
            }
            else if (userInput.Length <= 2)
            {
                Console.WriteLine("Please input more than 2 characters");
                PressAnyKeyToContinue();
            }
            else return true;

            return false;
        }
        static public void PressAnyKeyToContinue()
        {
            char dummyChar = ' ';
            Console.WriteLine("PRESS ANY KEY TO CONTINUE....");
            dummyChar = Console.ReadKey(true).KeyChar;
        }
        static public void PrintStudentGrades(List<Person> listOfUsers)
        {
            Console.Clear();
            Console.WriteLine("INPUT THE NAME OF THE STUDENT YOU WISH TO CHECK THE GRADES");
            string studentInput = Console.ReadLine();

            Student student = (Student)listOfUsers
                                .Where(x => x.UserName == studentInput)
                                .FirstOrDefault();
            if (student == null)
            {
                Console.WriteLine("No such user exists");
                Console.WriteLine();
                PressAnyKeyToContinue();
            }

            else
            {
                Console.WriteLine($"{student.FirstName} {student.LastName} with username {student.UserName} grades");
                Console.WriteLine();
                foreach (var item in student.Grades)
                {
                    Console.WriteLine($"{item.Key}       :{item.Value}");
                }
                Console.WriteLine();
                PressAnyKeyToContinue();
            }
        }

        static public void PrintAllSubjectsAttendancy(List<Person> listOfUsers)
        {
            Dictionary<Subject, List<Student>> subjectAttendancyDictionary = new Dictionary<Subject, List<Student>>();

            List<Student> castedStudents = new List<Student>();

            List<Person> studentsToBeCasted = listOfUsers
                                                .Where(x => x.Role == Role.Student)
                                                .ToList();

            foreach (Student item in studentsToBeCasted)
            {
                castedStudents.Add(item);
            };
            var groupedStudents = castedStudents
                                    .GroupBy(x => x.CurrentSubject);

            foreach (var item in groupedStudents)
            {
                subjectAttendancyDictionary.Add(item.Key, item.ToList());
            }

            foreach (var item in subjectAttendancyDictionary)
            {
                Console.WriteLine($"{item.Key}: {item.Value.Count} students attending");
            }




        }

        static public void SetStudentGrade(List<Person> listOfUsers, Subject profesorSubject)
        {
            Console.Clear();
            Console.WriteLine("Input the name of the student you wish to grade");
            string studentInput = Console.ReadLine();

            Student student = (Student)listOfUsers
                                .Where(x => x.UserName == studentInput)
                                .FirstOrDefault();
            if (student == null)
            {
                Console.WriteLine("Invalid input");
                Console.WriteLine();
                PressAnyKeyToContinue();
            }

            else
            {
                Console.WriteLine("Enter student grade to be set");
                Console.WriteLine(" 0) NoGrade");
                Console.WriteLine(" 1) Appailing");
                Console.WriteLine(" 2) VeryBad");
                Console.WriteLine(" 3) Bad");
                Console.WriteLine(" 4) Average");
                Console.WriteLine(" 5) Good");
                Console.WriteLine(" 6) VeryGood");
                Console.WriteLine(" 7) Perfect");

                //char studentGradeChar = Console.ReadKey(true).KeyChar;
                string studentGradeString = Console.ReadLine();
                Regex checkString = new Regex("[0-7]");

                var gradeToBeRevised = student.Grades
                                        .Where(x => x.Key == profesorSubject).FirstOrDefault();

                if (!checkString.IsMatch(studentGradeString)) Console.WriteLine("Please enter valid number!!!");
                else
                {
                    int studentGradeInt = int.Parse(studentGradeString);
                    try
                    {
                        student.Grades[gradeToBeRevised.Key] = (Grade)studentGradeInt;
                        Console.WriteLine($"Student's grade has been set to {(Grade)studentGradeInt}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    };
                    Console.WriteLine();
                }
            }
        }
    }
}
