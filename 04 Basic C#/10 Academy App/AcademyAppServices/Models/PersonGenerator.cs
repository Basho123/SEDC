using AcademyAppLibrary.Enums;
using AcademyAppLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AcademyAppServices.Models
{
    static public class PersonGenerator
    {
        static public Student Student(Gender gender)
        {
            Names allNames = new Names();
            Random random = new Random();


            int subjectsLength = Enum.GetNames(typeof(Subject)).Length;
            int gradesLength = Enum.GetNames(typeof(Grade)).Length;

            string randomMaleName = allNames.MaleFirst[random.Next(0, allNames.MaleFirst.Count)];
            string randomFemaleName = allNames.FemaleFirst[random.Next(0, allNames.FemaleFirst.Count)];
            string randomMaleLastName = allNames.MaleLast[random.Next(0, allNames.MaleLast.Count)];
            string randomFemaleLastName = allNames.FemaleLast[random.Next(0, allNames.FemaleLast.Count)];

            string randomUserName = $"{(char)random.Next(50,100)}{(char)random.Next(50, 100)}{(char)random.Next(50, 100)}{random.Next(443)}";
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
    }
}

