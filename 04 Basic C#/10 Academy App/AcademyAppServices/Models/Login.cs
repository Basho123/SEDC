using AcademyAppLibrary.Models;
using AcademyAppLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AcademyAppServices.Models
{
    static public class Login
    {
        static public void Person(List<Person> listOfPeople)
        {

            bool userNameLoop = true;
            bool passwordLoop = true;

            Console.Clear();
            Console.WriteLine("╔════════════════════╗");
            Console.WriteLine("║Enter your username ║");
            Console.WriteLine("╚════════════════════╝");

            while (userNameLoop)
            {
                Console.WriteLine("Type 3 to return back");
                string userName = Console.ReadLine();
                if (userName == "3") break;
                else if (Assets.UsernameExists(userName, listOfPeople))
                {
                    userNameLoop = false;

                    Console.Clear();
                    Console.WriteLine("╔════════════════════╗");
                    Console.WriteLine("║Enter your password ║");
                    Console.WriteLine("╚════════════════════╝");

                    while (passwordLoop)
                    {
                        Console.WriteLine("Type 3 to return back");
                        string password = Console.ReadLine();
                        if (password == "3") break;
                        if (Assets.IsValidPassword(userName, password, listOfPeople))
                        {
                            passwordLoop = false;

                            Person loggedInPerson = Assets.getPersonFromUsername(userName, listOfPeople);

                            Console.Clear();
                            Console.WriteLine("╔══════════════════╗");
                            Console.WriteLine($"║Welcome {loggedInPerson.FirstName} ");
                            Console.WriteLine("╚══════════════════╝");
                            Console.WriteLine("");

                            switch (loggedInPerson.Role)
                            {
                                case Role.Student:
                                    Student loggedInStudent = (Student)loggedInPerson;
                                    Console.WriteLine($"Currently attending {loggedInStudent.CurrentSubject}");
                                    loggedInStudent.DisplayInfo();
                                    Console.ReadLine();
                                    break;
                                case Role.Admin:
                                    Admin loggedInAdmin = (Admin)loggedInPerson;
                                    loggedInAdmin.DisplayInfo();
                                    while (true)
                                    {
                                        Console.WriteLine("Input a number on keyboard for action");
                                        Console.WriteLine("1) Check all members");
                                        Console.WriteLine("2) Delete a member");
                                        Console.WriteLine("3) Promote or demote a member");
                                        Console.WriteLine("4) Exit");
                                        char menuValue = Console.ReadKey(true).KeyChar;
                                        char dummyChar = ' '; // USED FOR INTERFACE NAVIGATION PURPOSES, NOT USED FOR ANY VALUE
                                        if (menuValue == '4') break;
                                        switch (menuValue)
                                        {
                                            case '1':
                                                listOfPeople.ForEach(x => x.DisplayInfo());
                                                Console.WriteLine("PRESS ANY KEY TO CONTINUE....");
                                                dummyChar = Console.ReadKey(true).KeyChar;
                                                Console.Clear();
                                                break;
                                            case '2':
                                                Console.WriteLine("Enter the username of the person you wish to remove");
                                                string userToBeRemoved = Console.ReadLine();
                                                if (userToBeRemoved == loggedInAdmin.UserName) Console.WriteLine("You cannot delete yourself");
                                                else if (!Assets.UsernameExists(userToBeRemoved, listOfPeople)) Console.WriteLine("Such user does not exist");
                                                else
                                                {
                                                    Console.WriteLine($"User {userToBeRemoved} has been successfuly removed from the database");
                                                    Assets.RemoveUser(userToBeRemoved, listOfPeople);
                                                };
                                                Console.WriteLine("PRESS ANY KEY TO CONTINUE....");
                                                dummyChar = Console.ReadKey(true).KeyChar;
                                                Console.Clear();
                                                break;
                                            case '3':
                                                Console.WriteLine("Enter the username of the person you wish to promote or demote");
                                                string userToBePromoted = Console.ReadLine();
                                                if (!Assets.UsernameExists(userToBePromoted, listOfPeople)) Console.WriteLine("Username does not exist");
                                                else if (userToBePromoted == loggedInAdmin.UserName) Console.WriteLine("You cannot promote or demote yourself, you are an admin already!!!");
                                                else
                                                {
                                                    Console.WriteLine("Enter the role you wish to be assigned to this user:");
                                                    Console.WriteLine("1) Student");
                                                    Console.WriteLine("2) Trainer");
                                                    Console.WriteLine("3) Admin");
                                                    char roleChar = Console.ReadKey(true).KeyChar;
                                                    switch (roleChar)
                                                    {
                                                        case '1':
                                                            Person student = Assets.getPersonFromUsername(userToBePromoted, listOfPeople);

                                                            student.Role = Role.Student;

                                                            Console.WriteLine($"{student.UserName} has been set to status {student.Role}");

                                                            listOfPeople.Remove(student);
                                                            listOfPeople.Add(new Student(student.FirstName, student.LastName, student.UserName, student.Password, student.Gender));
                                                          
                                                            Console.WriteLine("PRESS ANY KEY TO CONTINUE....");
                                                            dummyChar = Console.ReadKey(true).KeyChar;
                                                            break;
                                                        case '2':
                                                            Person trainer = Assets.getPersonFromUsername(userToBePromoted, listOfPeople);
                                                            trainer.Role = Role.Trainer;
                                                            Console.WriteLine($"{trainer.UserName} has been set to status {trainer.Role}");

                                                            listOfPeople.Remove(trainer);
                                                            listOfPeople.Add(new Trainer(trainer.FirstName,trainer.LastName,trainer.UserName,trainer.Password));
                                                           
                                                            Console.WriteLine("PRESS ANY KEY TO CONTINUE....");
                                                            dummyChar = Console.ReadKey(true).KeyChar;
                                                            break;
                                                        case '3':
                                                            Person admin = Assets.getPersonFromUsername(userToBePromoted, listOfPeople);
                                                            admin.Role = Role.Admin;
                                                            Console.WriteLine($"{admin.UserName} has been set to status {admin.Role}");

                                                            listOfPeople.Remove(admin);
                                                            listOfPeople.Add(new Admin(admin.FirstName, admin.LastName, admin.UserName, admin.Password));

                                                            Console.WriteLine("PRESS ANY KEY TO CONTINUE....");
                                                            dummyChar = Console.ReadKey(true).KeyChar;
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                }






                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    break;
                                case Role.Trainer:
                                    Trainer loggedInTrainer = (Trainer)loggedInPerson;
                                    loggedInTrainer.DisplayInfo();
                                    Console.ReadLine();
                                    break;
                                default:
                                    break;
                            }
                        }
                        else Console.WriteLine("Wrong password, please reenter your password");
                    }
                }
                else Console.WriteLine("No such user found in database");
            }

        }

    }
}
