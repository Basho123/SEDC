﻿using RPSLSgameLibrary.Models;
using RPSLSgameServices;
using System;

namespace RPSLgame
{
    class Program
    {     
        static void Main(string[] args)
        {
            Database database = new Database();
            try
            {
                while (true)
                {
                    Console.Clear();
                    Console.WriteLine("-------------------------------------------------------------");
                    Console.WriteLine("Hello to world championship of rock paper scissors tournament");
                    Console.WriteLine("-------------------------------------------------------------");
                    Console.WriteLine();
                    Console.WriteLine(" [1] New Game");
                    Console.WriteLine(" [2] Check Score");
                    if (database.Players[1].Score != 0 || database.Players[0].Score != 0)  Console.WriteLine("\n [3] Continue");
                    Console.WriteLine("\n [9] Quit");

                    char userInput = Console.ReadKey(true).KeyChar;

                    if (userInput == '9') break;
                    switch (userInput)
                    {
                        default:
                            break;
                        case '1':
                            database.Players[1].Score = 0;
                            database.Players[0].Score = 0;
                            Assets.PlayWithComputer(database.Players[1], database.Players[0]);
                            break;                  
                        case '2':
                            Assets.ShowScore(database.Players[1], database.Players[0]);
                            break;
                        case '3':
                            Assets.PlayWithComputer(database.Players[1], database.Players[0]);
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
