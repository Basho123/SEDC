using CinemaniaLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace CinemaniaLibrary.Models
{
    public class Database
    {
        public List<Member> ListOfUsers { get; set; }
        public List<Movie> ListOfMovies { get; set; }
        public Database()
        {
            ListOfUsers = new List<Member>()
            {
            new Employee("Ivan", "Jamandilovski", 25, "Admin", "Admin", "/", 200, 0),
            new User("Nekoj", "Ovojonovski", 25, "User", "User", "223-305", TypeOfSubscription.Monthly, new List<MovieType>() { MovieType.Action, MovieType.Comedy }),
            };

            ListOfMovies = new List<Movie>()
            {
             new Movie("Koga Lisjata Pagaat Season 01", "Turska srceparatelna serija", 2018, MovieType.Drama, false),
             new Movie("Koga Lisjata Pagaat Season 02", "Turska srceparatelna serija", 2019, MovieType.Drama, true),
             new Movie("Star Trek: Discovery Season 01", "Sci-Fi classic", 2019, MovieType.ScienceFiction, false),
             new Movie("Terminator 2", "Action Classic", 1996, MovieType.Action, true),
             new Movie("Republika Severna Makedonija", "18+", 2007, MovieType.Adult, false),
            };         
        }

        public void PrintAllUsers()
        {
            ListOfUsers.ForEach(item => item.DisplayInfo());           
        }




    }
}
