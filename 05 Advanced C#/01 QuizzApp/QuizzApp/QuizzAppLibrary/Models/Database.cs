using QuizzAppLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuizzAppLibrary.Models
{
    public class Database
    {


        public List<User> Users { get; set; } = new List<User>();
        public Dictionary<int, List<string>> Questions { get; set; }

        public Database()
        {
            #region Users
            Users = new List<User>()
            {
                new Student("Ivan", "Jamandilovski", "basho123", "123456", Role.Student),
                new Student("Elena", "Ivanovska", "elena123", "123456", Role.Student),
                new Student("Pane", "Manaskov", "pane123", "123456", Role.Student),

                new Teacher("Kristina","Spasevska","kiki123","123456",Role.Teacher)
            };
            #endregion
            #region Questions
            Questions = new Dictionary<int, List<string>>();

            Questions.Add(1, new List<string> {
                "What is the capital of Tasmania?",
                "Dodoma",
                "Hobart*",
                "Launceston",
                "Wellington",
                "Capital of Tasmania is Hobart with 206,097 citizens"
            });

            Questions.Add(2, new List<string>
            {
                "What is the tallest building in the Republic of the Congo?",
                "Kinshasa Democratic Republic of the Congo Temple",
                "Palais de la Nation",
                "Kongo Trade Centre",
                "Nabemba Tower*",
                "Tallest building in Republic of Congo is Nabemba Tower with 106 meters"


            });

            Questions.Add(3, new List<string>
            {
                "Which of these is not one of Pluto's moons?",
                "Styx",
                "Hydra",
                "Demios*",
                "Cerberos",
                "Pluto has 5 moons, Styx, Hydra, Nix, Charon and Cerberos are them.",

            });

            Questions.Add(4, new List<string>
            {
                "What is the smallest lake in the world?",
                "Onega Lake",
                "Benxi Lake *",
                "Kivu Lake",
                "Wakatipu Lake",
                "The smallest lake in the world is Benxi Lake in Lianoning Province, with surface area of whooping 15m²",
            });

            Questions.Add(5, new List<string>
            {
                "What country has the largest population of alpacas?",
                "Chad",
                "Peru*",
                "Australia",
                "Niger",
                "Peru has a population of 3.6 million alpacas, making it the world leader of alpaca population as is the leading producer of alpaca fiber."
            });
            #endregion
        }
    }
}

