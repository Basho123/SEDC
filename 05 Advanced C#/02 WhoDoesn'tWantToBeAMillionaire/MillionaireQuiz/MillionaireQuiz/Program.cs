using MillionaireQuizLibrary;
using MillionaireQuizLibrary.Media;
using MillionaireQuizServices;
using System;
using System.Media;

namespace MillionaireQuiz
{
    class Program
    {
       
        static void Main(string[] args)
        {
            Console.BackgroundColor = ConsoleColor.DarkBlue;
            Console.ForegroundColor = ConsoleColor.White;
            Console.Clear();
            try
            {
                Sound.Intro().Play();
                while (true)
                {
                    Console.Clear();
                    Console.WriteLine("Who doesn't want to be a millionaire");
                    Console.WriteLine();
                    Console.WriteLine("1. Play");
                    Console.WriteLine("2. High Score");
                    Console.WriteLine("3. Quit");

                    //Database.ListUsers();

                    char userChoice = Console.ReadKey(true).KeyChar;

                    if (userChoice != '1' && userChoice != '2' && userChoice != '3') continue;

                    if (userChoice == '1') Quiz.MainMenu();
                    if (userChoice == '2') Quiz.HighScore();
                    if (userChoice == '3') break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("General exception {0}", ex);
                Assets.PressAnyKeyToContinue();

            }
            finally
            {
                Console.Clear();
                Console.WriteLine("Goodbye, and have a nice day!");
                Assets.PressAnyKeyToContinue();
            }
            Database.Update();
        }
    }
}
