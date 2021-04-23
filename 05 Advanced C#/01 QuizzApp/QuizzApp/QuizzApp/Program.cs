using QuizzAppLibrary.Models;
using QuizzAppServices.Models;
using System;
using System.Linq;

namespace QuizzApp
{

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Database database = new Database();
                bool isRunning = true;
                while (isRunning)
                {
                    Console.Clear();
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine("--------------------------------------------------");
                    Console.WriteLine("Welcome to the student quiz application. \nAssess the knowledge of the student from this quiz.");
                    Console.WriteLine("--------------------------------------------------");
                    Console.ResetColor();
                    Console.WriteLine();
                    Console.WriteLine("Press one of the following keys:");
                    Console.WriteLine(" 1. Login");
                    Console.WriteLine(" 2. Quit");
                    char userChoice = Console.ReadKey(true).KeyChar;

                    switch (userChoice)
                    {
                        case '1':
                            Assets.Login(database);      
                            break;
                        case '2':
                            isRunning = false;
                            break;
                        default:
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Assets.PressAnyKeyToContinue();
            }
        }
    }
}
