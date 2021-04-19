using RPSLSgameLibrary;
using RPSLSgameLibrary.Enums;
using RPSLSgameLibrary.Models;
using System;
using System.Text.RegularExpressions;

namespace RPSLSgameServices
{
    static public class Assets
    {
        static public Result Combat(Weapon weaponPlayer1, Weapon weaponPlayer2)
            => (weaponPlayer1, weaponPlayer2) switch
            {
                (Weapon.Rock, Weapon.Scissors) => (Result)0,
                (Weapon.Rock, Weapon.Lizard) => (Result)0,
                (Weapon.Rock, Weapon.Paper) => (Result)1,
                (Weapon.Rock, Weapon.Spock) => (Result)1,

                (Weapon.Paper, Weapon.Rock) => (Result)0,
                (Weapon.Paper, Weapon.Spock) => (Result)0,
                (Weapon.Paper, Weapon.Scissors) => (Result)1,
                (Weapon.Paper, Weapon.Lizard) => (Result)1,

                (Weapon.Scissors, Weapon.Paper) => (Result)0,
                (Weapon.Scissors, Weapon.Lizard) => (Result)0,
                (Weapon.Scissors, Weapon.Rock) => (Result)1,
                (Weapon.Scissors, Weapon.Spock) => (Result)1,

                (Weapon.Spock, Weapon.Scissors) => (Result)0,
                (Weapon.Spock, Weapon.Rock) => (Result)0,
                (Weapon.Spock, Weapon.Lizard) => (Result)1,
                (Weapon.Spock, Weapon.Paper) => (Result)1,

                (Weapon.Lizard, Weapon.Spock) => (Result)0,
                (Weapon.Lizard, Weapon.Paper) => (Result)0,
                (Weapon.Lizard, Weapon.Scissors) => (Result)1,
                (Weapon.Lizard, Weapon.Rock) => (Result)1,

                (_, _) => Result.Tie
            };

        static public void PressAnyKeyToContinue()
        {
            Console.WriteLine("Press any key to continue . . .");
            char dummyChar = Console.ReadKey().KeyChar;
        }

        static public void PlayWithComputer(Player player1, Player computerPlayer)
        {
            int roundCounter = 1;

            while (true)
            {
                int playerScore = player1.Score;
                int computerPlayerScore = computerPlayer.Score;
                Console.Clear();
                Console.WriteLine($"--------------ROUND {roundCounter}-------------");
                Console.WriteLine();
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("  ╔══════════════════╦═════════════════════╗");
                Console.WriteLine("  ║Player score {0}       Computer score {1}  ", playerScore, computerPlayerScore);
                Console.WriteLine("  ╚══════════════════╩═════════════════════╝");
                Console.ResetColor();
                Console.WriteLine("-----------------------------------");
                Console.WriteLine("Enter number to choose your weapon:");
                Console.WriteLine("-----------------------------------");
                Console.WriteLine("1. Rock");
                Console.WriteLine("2. Paper");
                Console.WriteLine("3. Scissors");
                Console.WriteLine("4. Lizard");
                Console.WriteLine("5. Spock");
                Console.WriteLine();
                Console.WriteLine();
                Console.WriteLine("Press 'Enter' to return to previous menu.");

                Random random = new Random();
                Result result;

                char userChoiceChar = Console.ReadKey(true).KeyChar;
                string userChoiceString = $"{userChoiceChar}";
                Regex regex = new Regex("^[1-5]");
                Weapon randomWeapon = (Weapon)random.Next(1, 6);

                if (userChoiceChar == 13) break;
                if (!regex.IsMatch(userChoiceString))
                {
                    Console.WriteLine("Please enter valid number");
                    continue;
                }

                int userChoiceInt = int.Parse(userChoiceString);
                result = Combat((Weapon)userChoiceInt, randomWeapon);

                switch (result)
                {
                    case Result.Player1Wins:
                        player1.Score++;
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine($"You won, using {(Weapon)userChoiceInt} against {randomWeapon}");
                        Console.ResetColor();

                        break;
                    case Result.Player2Wins:
                        computerPlayer.Score++;
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine($"You lose, using {(Weapon)userChoiceInt} against {randomWeapon}");
                        Console.ResetColor();

                        break;
                    case Result.Tie:
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine($"It's a tie, {(Weapon)userChoiceInt} against {randomWeapon}");
                        Console.ResetColor();

                        break;
                    default:
                        break;
                }
                roundCounter++;
                PressAnyKeyToContinue();
            }
        }
        static public void ShowScore(Player player1, Player computerPlayer)
        {
            while (true)
            {
                Console.Clear();
                int playerScore = player1.Score+1;
                int computerPlayerScore = computerPlayer.Score+1;
                Console.ForegroundColor =  ConsoleColor.Red;
                Console.WriteLine("  ╔══════════════════╦═════════════════════╗");
                Console.WriteLine("  ║Player wins {0}       Computer wins {1}", playerScore, computerPlayerScore);
                Console.WriteLine("  ╚══════════════════╩═════════════════════╝");
                Console.ResetColor();


                string playerPercentage = $"{(decimal)playerScore / computerPlayerScore:P}";
                string computerPercentage = $"{(decimal)computerPlayerScore / playerScore:P}";

                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine();
                Console.WriteLine("  ╔═══════════════════════════╦══════════════════════════╗");
                Console.WriteLine("  ║Player Ratio {0}          Computer Ratio {1}  ", playerPercentage, computerPercentage);
                Console.WriteLine("  ╚═══════════════════════════╩══════════════════════════╝");
                Console.WriteLine();
                Console.ResetColor();

                Console.WriteLine("Press 'Enter' to return to previous menu");

                char userInput = Console.ReadKey().KeyChar;
                if (userInput == 13) break;
            }         
        }
    }
}
