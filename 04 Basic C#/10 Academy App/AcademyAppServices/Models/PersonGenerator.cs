using AcademyAppLibrary.Enums;
using AcademyAppLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace AcademyAppServices.Models
{
    static public class PersonGenerator
    {
        #region Random Student Generator
        static public Student RandomStudent(Gender gender)
        {
            Names allNames = new Names();
            Random random = new Random();


            int subjectsLength = Enum.GetNames(typeof(Subject)).Length;
            int gradesLength = Enum.GetNames(typeof(Grade)).Length;

            string randomMaleName = allNames.MaleFirst[random.Next(0, allNames.MaleFirst.Count)];
            string randomFemaleName = allNames.FemaleFirst[random.Next(0, allNames.FemaleFirst.Count)];
            string randomMaleLastName = allNames.MaleLast[random.Next(0, allNames.MaleLast.Count)];
            string randomFemaleLastName = allNames.FemaleLast[random.Next(0, allNames.FemaleLast.Count)];

            string randomUserName = $"{(char)random.Next(50, 100)}{(char)random.Next(50, 100)}{(char)random.Next(50, 100)}{random.Next(443)}";
            string randomPassword = $"{random.Next(444)}{(char)random.Next(50, 100)}{(char)random.Next(50, 100)}{(char)random.Next(50, 100)}";

            Subject randomSubject = (Subject)random.Next(0, subjectsLength);

            return gender switch
            {
                Gender.Male => new Student(randomMaleName, randomMaleLastName, randomUserName, randomPassword, randomSubject, gender, new Dictionary<Subject, Grade>()
                    {
                        { Subject.Acoustics,                             (Grade)random.Next(0, gradesLength) },
                        { Subject.ComputerHardwareAndSoftwareForAudio,   (Grade)random.Next(0, gradesLength) },
                        { Subject.Electrotech,                           (Grade)random.Next(0, gradesLength) },
                        { Subject.MusicHistory,                          (Grade)random.Next(0, gradesLength) },
                        { Subject.Piano,                                 (Grade)random.Next(0, gradesLength) },
                        { Subject.RecordingTechniques,                   (Grade)random.Next(0, gradesLength) },
                        { Subject.SolfeggioAndMusicTheory,               (Grade)random.Next(0, gradesLength) }
                    }),
                Gender.Female => new Student(randomFemaleName, randomFemaleLastName, randomUserName, randomPassword, randomSubject, gender, new Dictionary<Subject, Grade>()
                    {
                        { Subject.Acoustics,                             (Grade)random.Next(0, gradesLength) },
                        { Subject.ComputerHardwareAndSoftwareForAudio,   (Grade)random.Next(0, gradesLength) },
                        { Subject.Electrotech,                           (Grade)random.Next(0, gradesLength) },
                        { Subject.MusicHistory,                          (Grade)random.Next(0, gradesLength) },
                        { Subject.Piano,                                 (Grade)random.Next(0, gradesLength) },
                        { Subject.RecordingTechniques,                   (Grade)random.Next(0, gradesLength) },
                        { Subject.SolfeggioAndMusicTheory,               (Grade)random.Next(0, gradesLength) }
                    }),
                _ => new Student(),
            };
        }
        #endregion

        #region Peson Creator
        static public Person Person(List<Person> listOfPersons)
        {
            bool accountCreatorWelcome = true;
            bool roleIsSetting = true;
            bool firstNameIsCreating = true;
            bool lastNameIsCreating = true;
            bool userNameIsCreating = true;
            bool passwordIsCreating = true;

            Role role = Role.Student;


            while (accountCreatorWelcome)
            {
                Console.Clear();
                Console.WriteLine("Welcome to the Account creator!!!");
                Console.WriteLine(" 1) Create new account");
                Console.WriteLine(" 2) Exit account creator");

                char menuValue = Console.ReadKey(true).KeyChar;

                switch (menuValue)
                {
                    case '1':
                        accountCreatorWelcome = false;
                        break;
                    case '2':
                        accountCreatorWelcome = false;
                        roleIsSetting = false;
                        firstNameIsCreating = false;
                        break;
                    default:
                        Console.WriteLine("Please enter one of the numbers specified");
                        Assets.PressAnyKeyToContinue();
                        break;
                }
            }

            while (roleIsSetting)
            {
                Console.Clear();
                Console.WriteLine("Enter role of the new user to be created from the menu");
                Console.WriteLine(" 1) Admin");
                Console.WriteLine(" 2) Student");
                Console.WriteLine(" 3) Trainer");
                Console.WriteLine(" 4) Back");

                char menuValue = Console.ReadKey(true).KeyChar;

                switch (menuValue)
                {
                    case '1':
                        role = Role.Admin;
                        roleIsSetting = false;
                        break;
                    case '2':
                        role = Role.Student;
                        roleIsSetting = false;
                        break;
                    case '3':
                        role = Role.Trainer;
                        roleIsSetting = false;
                        break;
                    case '4':
                        roleIsSetting = false;
                        firstNameIsCreating = false;
                        break;
                    default:
                        Console.WriteLine("Please enter one of the numbers specified");
                        Assets.PressAnyKeyToContinue();
                        break;
                }
            }

            while (firstNameIsCreating)
            {
                Console.Clear();
                Console.WriteLine($"Enter {role}'s First Name");
                string firstName = Console.ReadLine();
                if (!Assets.ValidateStringForNameFormat(firstName)) continue;
                else
                {
                    firstNameIsCreating = false;
                    while (lastNameIsCreating)
                    {
                        Console.Clear();
                        Console.WriteLine($"Enter {role}'s Last Name");
                        string lastName = Console.ReadLine();
                        if (!Assets.ValidateStringForNameFormat(lastName)) continue;
                        else
                        {
                            lastNameIsCreating = false;
                            while (userNameIsCreating)
                            {
                                Console.Clear();
                                Console.WriteLine("Username must be unique and longer than 4 characters");
                                Console.WriteLine($"Enter {role}'s user name");
                                string userName = Console.ReadLine();
                                if (Assets.UsernameExists(userName, listOfPersons))
                                {
                                    Console.WriteLine("Username already exists, please enter another username");
                                    Assets.PressAnyKeyToContinue();
                                }
                                else if (!Assets.ValidateStringForUsernameFormat(userName))
                                {
                                    Console.WriteLine("Not a valid username format");
                                    Assets.PressAnyKeyToContinue();
                                    continue;
                                }
                                else
                                {
                                    userNameIsCreating = false;
                                    while (passwordIsCreating)
                                    {
                                        Console.Clear();
                                        Console.WriteLine("Password should be unique and longer than 4 characters using special characters");
                                        Console.WriteLine($"Enter {role}'s password");
                                        string password = Console.ReadLine();
                                        if (password.Length < 4) Console.WriteLine("Password too short, please input more that 4 characters");
                                        else
                                        {
                                            Console.WriteLine("Retype your password again!");
                                            string passwordVerify = Console.ReadLine();
                                            if (password != passwordVerify)
                                            {
                                                Console.WriteLine("Passwords do not match");
                                                Assets.PressAnyKeyToContinue();
                                            }
                                            else
                                            {
                                                passwordIsCreating = false;
                                                switch (role)
                                                {
                                                    case Role.Student:
                                                        Console.WriteLine($"New {role} {firstName} {lastName} successfuly added");
                                                        Assets.PressAnyKeyToContinue();
                                                        return new Student(firstName, lastName, userName, password, Subject.MusicHistory, Gender.NotSpecified, new Dictionary<Subject, Grade>()
                                                        {
                                                            { Subject.Acoustics,                             Grade.NoGrade },
                                                            { Subject.ComputerHardwareAndSoftwareForAudio,   Grade.NoGrade },
                                                            { Subject.Electrotech,                           Grade.NoGrade },
                                                            { Subject.MusicHistory,                          Grade.NoGrade },
                                                            { Subject.Piano,                                 Grade.NoGrade },
                                                            { Subject.RecordingTechniques,                   Grade.NoGrade },
                                                            { Subject.SolfeggioAndMusicTheory,               Grade.NoGrade }
                                                        });
                                                    case Role.Trainer:
                                                        Console.WriteLine($"New {role} {firstName} {lastName} successfuly added");
                                                        Assets.PressAnyKeyToContinue();
                                                        return new Trainer(firstName, lastName, userName, password);
                                                    case Role.Admin:
                                                        Console.WriteLine($"New {role} {firstName} {lastName} successfuly added");
                                                        Assets.PressAnyKeyToContinue();
                                                        return new Admin(firstName, lastName, userName, password);
                                                    default:
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return new Person();
        }
        #endregion
    }
}

