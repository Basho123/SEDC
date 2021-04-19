using System;
using System.Collections.Generic;
using System.Text;
using AcademyAppLibrary.Enums;

namespace AcademyAppLibrary.Models
{
    public class Database
    {
        public List<Person> people = new List<Person>() {

        new Admin("Admin","Admin","Admin","Admin"),

        new Trainer("Valentino","Skenderovski","Tino123","enterprise",Subject.ComputerHardwareAndSoftwareForAudio),
        new Trainer("Bratislav","Zafirovski","Braco123","seeAnimalHearAnimal",Subject.RecordingTechniques),
        new Trainer("Slobodan","Tanevski","Cobe123","emiter",new List<Subject>(){
            Subject.Acoustics,
            Subject.Electrotech,
            Subject.SoundReinforcementAndSoundSystems
        }),
        new Trainer("Aleksandar","Trajkovski","Ace123","mircheAcev123",new List<Subject>(){
            Subject.SolfeggioAndMusicTheory,
            Subject.Piano,
            Subject.MusicHistory
        }),


        new Student("Ivan","Jamandilovski","Basho123", "123456",Subject.Acoustics, Gender.Male, new Dictionary<Subject, Grade>()
            {
                { Subject.Acoustics,                             Grade.NoGrade },
                { Subject.ComputerHardwareAndSoftwareForAudio,   Grade.Perfect },
                { Subject.Electrotech,                           Grade.Good },
                { Subject.MusicHistory,                          Grade.VeryBad },
                { Subject.Piano,                                 Grade.Good },
                { Subject.RecordingTechniques,                   Grade.Perfect },
                { Subject.SolfeggioAndMusicTheory,               Grade.Perfect },
            }),
           };


    }
}
