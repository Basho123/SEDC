using System;
using CinemaniaLibrary.Models;
using CinemaniaServices.Models;

namespace CinemaniaApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Database database = new Database();

            while (true)
            {
                Console.SetWindowSize(Console.LargestWindowWidth / 2, Console.LargestWindowHeight / 2);
                Color.Blue();
                Console.Clear();
                Console.WriteLine("                                ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
                Console.WriteLine("                                █ WELCOME TO CINEMANIA █");
                Console.WriteLine("                                ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");

                Console.WriteLine("");
                Console.WriteLine(" Cinemania offers large range of old school VHS movies \n for rent from a vast range of genres. \n Watch modern movies in the old fashioned way");
                Console.WriteLine("");
                Console.WriteLine(" You need to have an account registered to acces the Cinemania\n database and rent movies, please log in or register an account.");
                Console.WriteLine("");

                Console.WriteLine(" ╔════════════════════╗");
                Console.WriteLine(" ║Press 1 to Login    ║");
                Console.WriteLine(" ║Press 2 to Register ║");
                Console.WriteLine(" ║Press 3 to Quit     ║");
                Console.WriteLine(" ╚════════════════════╝");
                Console.WriteLine("");


                char loginValue = Console.ReadKey().KeyChar;
                switch (loginValue)
                {
                    case '1':
                        Assets.Login(database.ListOfUsers, database.ListOfMovies);
                        break;
                    case '2':
                        database.ListOfUsers.Add(Assets.Register(database.ListOfUsers, database.ListOfMovies));
                        break;
                    default:
                        break;
                }            
                if (loginValue == '3') break;
            }

        }
    }
}
