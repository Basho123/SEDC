using MillionaireQuizLibrary;
using MillionaireQuizServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Media;
using MillionaireQuizLibrary.Media;

namespace MillionaireQuizServices
{
    public static class Quiz
    {
    
        public static void MainMenu()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("------------------------------------");
                Console.WriteLine("1. Login with existing character");
                Console.WriteLine("2. Create new character");
                Console.WriteLine("3. Back");

                char userChoice = Console.ReadKey(true).KeyChar;

                if (userChoice == '1')
                {
                    while (true)
                    {
                        User user = LoggedInUser();
                        if (user == null) break;
                        Play(user);
                        break;
                    }
                }
                if (userChoice == '2') Database.AddNewUser(Database.CreateUser());
                if (userChoice == '3') break;
            }

        }
        public static User LoggedInUser()
        {
            User user = null;
            while (true)
            {
                Console.WriteLine("Input X to break");

                Console.WriteLine("Enter username: ");
                string userName = Console.ReadLine();
                if (userName.ToLower() == "x") break;

                Console.WriteLine("Enter password: ");
                string password = Console.ReadLine();
                if (password.ToLower() == "x") break;

                user = Database.Users.FirstOrDefault(x => x.UserName == userName && x.Password == password);
                if (user == null)
                {
                    Console.WriteLine("Username does not exist or password is incorrect");
                    continue;
                }
                break;
            }
            return user;
        }
        public static void HighScore()
        {

        }
        public static void Play(User user)
        {
            Console.WriteLine($@"Welcome to the quiz ""Who doesn't want to be a millionaire""! Today, we have {user.FirstName} {user.LastName} on the table!");
            Console.WriteLine($"Current balance: {user.Points} $");
            Console.WriteLine();
            Console.WriteLine($@"Fifteen questions, each answered by choosing a, b, c or d!");


            for (int i = 0; i <= Question.AllQuestions.Count; i++)
            {
                if (i == Question.AllQuestions.Count)
                {
                    Console.WriteLine("Congragulations, you are a millionaire!!!");
                    Sound.Intro().Play();
                    Assets.PressAnyKeyToContinue();
                    break;
                }

                bool correctAnswer = Question.Ask(i, 1, user);

                if (!correctAnswer)
                {
                    Assets.PressAnyKeyToContinue();
                    break;
                }   
                    Assets.PressAnyKeyToContinue();
            }
           
        }
    }
}
