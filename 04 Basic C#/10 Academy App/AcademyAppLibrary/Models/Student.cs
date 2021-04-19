using AcademyAppLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AcademyAppLibrary.Models
{
    public class Student : Person
    { 
        public Subject CurrentSubject { get; set; }
        public Dictionary<Subject, Grade> Grades { get; set; }
        public Student()
        {
            //Role = Role.Student;
        }
        public Student(string firstName, string lastName, string userName, string password, Subject currentSubject, Gender gender, Dictionary<Subject, Grade> grades)
        {
            Role = Role.Student;
            CurrentSubject = currentSubject;
            Grades = grades;
            Gender = gender;

            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
        }

        public Student(string firstName, string lastName, string userName, string password, Gender gender)
        {
            Role = Role.Student;
            CurrentSubject = Subject.MusicHistory;
            Grades = new Dictionary<Subject, Grade>()
            {
                { Subject.Acoustics,                             Grade.NoGrade },
                { Subject.ComputerHardwareAndSoftwareForAudio,   Grade.NoGrade },
                { Subject.Electrotech,                           Grade.NoGrade },
                { Subject.MusicHistory,                          Grade.NoGrade },
                { Subject.Piano,                                 Grade.NoGrade },
                { Subject.RecordingTechniques,                   Grade.NoGrade },
                { Subject.SolfeggioAndMusicTheory,               Grade.NoGrade },
            };
            Gender = gender;

            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
        }

        public override void DisplayInfo()
        {
            Console.WriteLine("===========================");
            Console.WriteLine("First Name    : {0}", FirstName);
            Console.WriteLine("Last  Name    : {0}", LastName);
            Console.WriteLine("User  Name    : {0}", UserName);
            Console.WriteLine("Role          : {0}", Role);

            Console.WriteLine("---------------------------");
            Console.WriteLine($"{FirstName} {LastName} GRADES");

            foreach (var item in Grades)
            {             
                Console.WriteLine($"{item.Key}  : {item.Value}");              
            }

            Console.WriteLine("===========================");
        }
    }
}
