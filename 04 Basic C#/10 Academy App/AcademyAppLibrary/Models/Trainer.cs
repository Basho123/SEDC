using System;
using System.Collections.Generic;
using System.Text;
using AcademyAppLibrary.Enums;


namespace AcademyAppLibrary.Models
{
    public class Trainer : Person
    {
        public Subject TrainerSubject { get; private set; }
        public List<Subject> TrainerSubjects { get; private set; }


        public Trainer()
        {
            Role = Role.Trainer;
        }

        //SINGLE SUBJECT TRAINER CONSTRUCTOR
        public Trainer(string firstName, string lastName, string userName, string password, Subject trainerSubject)
        {
            Role = Role.Trainer;
            Gender = Gender.Male;

            TrainerSubject = trainerSubject;

            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
        }

        //MULTIPLE SUBJECTS TRAINER CONSTRUCTOR
        public Trainer(string firstName, string lastName, string userName, string password, List<Subject> trainerSubjects)
        {
            Role = Role.Trainer;
            TrainerSubjects = trainerSubjects;

            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
        }
        //RANDOM SUBJECT TRAINER CONSTRUCTOR
        public Trainer(string firstName, string lastName, string userName, string password)
        {
            Random random = new Random();
            Role = Role.Trainer;
            Gender = Gender.Male;
            TrainerSubject = (Subject)random.Next(0,Enum.GetNames(typeof(Subject)).Length);
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
        }
    }
}
