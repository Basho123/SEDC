using MillionaireQuizLibrary;
using MillionaireQuizLibrary.Media;
using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;
using MillionaireQuizServices.Models;

namespace MillionaireQuizServices
{
    public static class Question
    {
        public static Dictionary<int, List<string>> One { get; set; }
        public static Dictionary<int, List<string>> Two { get; set; }
        public static Dictionary<int, List<string>> Three { get; set; }
        public static Dictionary<int, List<string>> Four { get; set; }
        public static Dictionary<int, List<string>> Five { get; set; }
        public static Dictionary<int, List<string>> Six { get; set; }
        public static Dictionary<int, List<string>> Seven { get; set; }
        public static Dictionary<int, List<string>> Eight { get; set; }
        public static Dictionary<int, List<string>> Nine { get; set; }
        public static Dictionary<int, List<string>> Ten { get; set; }
        public static Dictionary<int, List<string>> Eleven { get; set; }
        public static Dictionary<int, List<string>> Twelve { get; set; }
        public static Dictionary<int, List<string>> Thirteen { get; set; }
        public static Dictionary<int, List<string>> Fourteen { get; set; }
        public static Dictionary<int, List<string>> Fifteen { get; set; }
        public static List<Dictionary<int, List<string>>> AllQuestions { get; set; }

        static Question()
        {
            #region One
            One = new Dictionary<int, List<string>>();
            One.Add(1, new List<string> {
                "Which of these products is sold by the brands Colgate, Oral-B and Sensodyne?",
                "Deodorant",
                "Shampoo",
                "Toothpaste*",
                "Sun cream",
                "Colgate, Oral-B and Sensodyne sell and produce toothpase.",
                "100"
            });
            One.Add(2, new List<string> {
                "In the UK, the abbreviation NHS stands for National 'what' Service?",
                "Humanity",
                "Health",
                "Honour*",
                "Sun cream",
                "Colgate, Oral-B and Sensodyne sell and produce toothpase.",
                "100"
            });
            #endregion

            #region Two
            Two = new Dictionary<int, List<string>>();
            Two.Add(1, new List<string> {
                "Which tool was used as a weapon by the Norse god Thor?",
                "Pillers",
                "Hammer*",
                "Screwdriver",
                "Saw",
                "Thor used his mighty hammer.",
                "200",
            });
            #endregion

            #region Three
            Three = new Dictionary<int, List<string>>();
            Three.Add(1, new List<string> {
                "What is the name of the classic dessert consisting of sponge cake and ice cream covered in meringue?",
                "Baked Rhode Island",
                "Baked Wyoming",
                "Baked Connecticut",
                "Baked Alaska*",
                @"the name of the classic dessert consisting of sponge cake and ice cream covered in meringue is ""Baked Alaska""",
                "500"
            });
            #endregion

            #region Four
            Four = new Dictionary<int, List<string>>();
            Four.Add(1, new List<string> {
                "Trigonometry is a branch of which subject?",
                "Biology",
                "Economics",
                "Psychology",
                "Mathematics*",
                "Trigonometry is a branch of Mathematics",
                "1000"
            });
            #endregion

            #region Five
            Five = new Dictionary<int, List<string>>();
            Five.Add(1, new List<string> {
                "Lily Savage was a persona of which TV personality?",
                "Paul O'Grady*",
                "Barry Humphries",
                "Les Dawson",
                "Brendan O'Carroll",
                "Lily Savage was a persona of Paul O'Grady",
                "2000"
            });
            #endregion

            #region Six
            Six = new Dictionary<int, List<string>>();
            Six.Add(1, new List<string> {
                "Which of these means a speech in a play where a character talks to themselves rather than to other characters?",
                "Interlude",
                "Revue",
                "Soliloquy*",
                "Chorus",
                "Soliloquy is a speech in a play where a character talks to themselves rather than to other characters.",
                "5000"
            });
            #endregion

            #region Seven
            Seven = new Dictionary<int, List<string>>();
            Seven.Add(1, new List<string> {
                "Which of these is a religious event celebrated in Hinduism?",
                "Diwali*",
                "Ramadan",
                "Hanukkah",
                "Whitsun",
                "Diwali is celebrated in Hinduism.",
                "10000",
            });
            #endregion

            #region Eight
            Eight = new Dictionary<int, List<string>>();
            Eight.Add(1, new List<string> {
                "British athlete Katarina Johnson-Thompson became a world champion in which athletics event in 2019?",
                "Heptathlon*",
                "Marathon",
                "100 meters",
                "400 meters hurdles",
                "Heptathlon is the discipline that Katarina trains in.",
                "25000",
            });
            #endregion

            #region Nine
            Nine = new Dictionary<int, List<string>>();
            Nine.Add(1, new List<string> {
                "Which iconic horror film involves a couple whose newborn child is replaced at birth with the Antichrist?",
                "The Shining",
                "Don't Look Now",
                "The Exorcist",
                "The Omen*",
                "The Omen is the correct answer!",
                "50000"
            });
            #endregion

            #region Ten
            Ten = new Dictionary<int, List<string>>();
            Ten.Add(1, new List<string> {
                "In the opera by Rossini, what is the first name of The Barber of Seville?",
                "Tamino",
                "Alfredo",
                "Don Carlos",
                "Figaro*",
                "Figaro is the first name of The Barber of Seville!",
                "100000"
            });
            #endregion

            #region Eleven
            Eleven = new Dictionary<int, List<string>>();
            Eleven.Add(1, new List<string> {
                "Which of these books is believed to have been inspired by the real-life experiences of the Scottish sailor Alexander Selkirk?",
                "Moby Dick",
                "Robinson Crusoe*",
                "Treasure Island",
                "The Count of Monte Cristo",
                "The book Robinson Crusoe is believed to have been inspired by the real-life experiences of the Scottish sailor Alexander Selkirk",
                "200000"
            });
            #endregion

            #region Twelve
            Twelve = new Dictionary<int, List<string>>();
            Twelve.Add(1, new List<string> {
                "Which toxic substance is obtained from the pressed seeds of the castor oil plant?",
                "Sarin",
                "Strychnine",
                "Ricin*",
                "Cyanide",
                "Ricin, a very nasty toxin, is extracted from the pressed seeds of the castor oil plant.",
                "400000"
            });
            #endregion

            #region Thirteen
            Thirteen = new Dictionary<int, List<string>>();
            Thirteen.Add(1, new List<string> {
                "The Twelve Apostles is a series of peaks connected to which mountain?",
                "Aoraki Mount Cook",
                "K2",
                "Table Mountain*",
                "Mont Blanc",
                "Table Mountain is the correct answer.",
                "600000"
            });
            #endregion

            #region Fourteen
            Fourteen = new Dictionary<int, List<string>>();
            Fourteen.Add(1, new List<string> {
                "First performed in 1804, Beethoven's Eroica Symphony was originally dedicated to which historical figure?",
                "Marie Antoinette",
                "Napoleon Bonaparte*",
                "Louis XVIII of France",
                "Voltaire",
                "First performed in 1804, Beethoven's Eroica Symphony was originally dedicated to Napoleon Bonaparte",
                "800000"
            });
            #endregion

            #region Fifteen
            Fifteen = new Dictionary<int, List<string>>();
            Fifteen.Add(1, new List<string> {
                "In the history of motor sport, which of these iconic races was held first?",
                "Le Mans 24 Hours",
                "Monaco Grand Prix",
                "Indy 500",
                "Isle of Man TT*",
                "Isle of Man TT is the first race held first in the motor sport.",
                "1000000"
            });
            #endregion

            #region AllQuestions
            AllQuestions = new List<Dictionary<int, List<string>>>();
            AllQuestions.Add(One);
            AllQuestions.Add(Two);
            AllQuestions.Add(Three);
            AllQuestions.Add(Four);
            AllQuestions.Add(Five);
            AllQuestions.Add(Six);
            AllQuestions.Add(Seven);
            AllQuestions.Add(Eight);
            AllQuestions.Add(Nine);
            AllQuestions.Add(Ten);
            AllQuestions.Add(Eleven);
            AllQuestions.Add(Twelve);
            AllQuestions.Add(Thirteen);
            AllQuestions.Add(Fourteen);
            AllQuestions.Add(Fifteen);
            #endregion
        }

        static public bool Ask(int numberOfQuestion, int numberOfPermutation, User user)
        {
            bool questionAnswered = false;
            char numberOfCorrectAnswer = ' ';
            char userInput = ' ';
            int moneyWonUntillNow = 0;   
            while (!questionAnswered)
            {
                List<string> currentQuestion = AllQuestions[numberOfQuestion][numberOfPermutation];
                if (numberOfQuestion > 4) Sound.SuspenseSound().PlayLooping();
                if (numberOfQuestion <= 4) Sound.EasyQuestion().PlayLooping();

                Question.PrintHeader(numberOfQuestion, currentQuestion, user);
                Question.Print(currentQuestion);

                while (true)
                {
                    userInput = Console.ReadKey(true)
                                          .KeyChar
                                           .ToString()
                                           .ToLower()
                                           .ToCharArray()[0];
                    if (userInput == '5' && !user.UsedFiftyFiftyHelp)
                    {
                        Question.PrintHeader(numberOfQuestion, currentQuestion, user);
                        Sound.EasyQuestion().Stop();
                        Helper.FiftyFifty(currentQuestion, user);
                        userInput = Console.ReadKey(true)
                                          .KeyChar
                                           .ToString()
                                           .ToLower()
                                           .ToCharArray()[0];
                    }
                    if (userInput == '6' && !user.UsedPhoneHelp)
                    {
                        Question.PrintHeader(numberOfQuestion, currentQuestion, user);
                        Sound.EasyQuestion().Stop();
                        Question.Print(currentQuestion);
                        Sound.TelephoneHelp().Play();
                        Helper.Friend(currentQuestion, numberOfQuestion, user);
                        userInput = Console.ReadKey(true)
                                          .KeyChar
                                           .ToString()
                                           .ToLower()
                                           .ToCharArray()[0];
                    }
                    if (userInput == '7' && !user.UsedAudienceHelp)
                    {
                        Question.PrintHeader(numberOfQuestion, currentQuestion, user);
                        Sound.EasyQuestion().Stop();
                        Helper.Audience(currentQuestion,numberOfQuestion,user);
                        userInput = Console.ReadKey(true)
                                          .KeyChar
                                           .ToString()
                                           .ToLower()
                                           .ToCharArray()[0];
                    }
                    if (userInput == 'a' || userInput == 'b' || userInput == 'c' || userInput == 'd')
                    {

                        Question.PrintHeader(numberOfQuestion, currentQuestion, user);
                        numberOfCorrectAnswer = PrintSelected(currentQuestion, userInput);

                        Console.WriteLine("");
                        Console.WriteLine("Are you sure? Y/N");

                        if (numberOfQuestion >= 5) Sound.SuspenseSound().Stop();
                        if (numberOfQuestion < 5) Sound.EasyQuestion().Stop();

                        Sound.AreYouSure().Play();
                        char UserInputBool = Console.ReadKey(true).KeyChar;

                        if (UserInputBool == 'N' || UserInputBool == 'n') break;
                        if (UserInputBool == 'Y' || UserInputBool == 'y')
                        {
                            questionAnswered = true;

                            Question.PrintHeader(numberOfQuestion, currentQuestion, user);
                            PrintCorrectAnswer(currentQuestion, userInput);

                            Console.WriteLine();
                            if (numberOfCorrectAnswer != userInput)
                            {
                                Sound.WrongAnswer2().Play();
                                Console.ForegroundColor = ConsoleColor.Red;
                                Console.WriteLine("Wrong Answer!");
                                Console.ForegroundColor = ConsoleColor.White;

                                Database.Update();
                                user.UsedFiftyFiftyHelp = false;
                                user.UsedPhoneHelp = false;
                                user.UsedAudienceHelp = false;
                            }
                            else
                            {
                                if (numberOfQuestion <= 4) Sound.CorrectAnswer1().Play();
                                if (numberOfQuestion > 4) Sound.CorrectAnswer2().Play();

                                moneyWonUntillNow = int.Parse(currentQuestion[6]);
                               
                                if (numberOfQuestion == 4 || numberOfQuestion == 9 || numberOfQuestion == 14)
                                {
                                    user.Points += moneyWonUntillNow;

                                    Console.WriteLine();
                                    Console.ForegroundColor = ConsoleColor.Cyan;
                                    Console.WriteLine(
                                        numberOfQuestion == 4 ? "You are at your first guaranteed sum."
                                        : numberOfQuestion == 9 ? "You are at your second guaranteed sum."
                                        : "You are a millionaire!!!");
                                    Database.Update();
                                }
                                Console.WriteLine();
                                Console.ForegroundColor = ConsoleColor.Green;
                                Console.WriteLine("Correct Answer!");
                                Console.ForegroundColor = ConsoleColor.White;
                            }
                            Console.WriteLine();
                            Console.WriteLine(currentQuestion[5]);
                            Assets.PressAnyKeyToContinue();

                            if (numberOfQuestion >= 4 && numberOfQuestion <14 && numberOfCorrectAnswer == userInput)
                            {
                                Console.Clear();
                                Console.WriteLine("Prepare for question number {0}", numberOfQuestion + 2);
                                Sound.NextQuestion().Play();
                                Assets.PressAnyKeyToContinue();
                            }
                            break;
                        }
                    }
                }
            }
            return numberOfCorrectAnswer == userInput;
        }

        public static void Print(List<string> currentQuestion)
        {
            for (int i = 1; i < currentQuestion.Count - 2; i++)
            {
                Console.WriteLine($"{(char)(i + 64)}. {currentQuestion[i].Replace("*", " ")}");
            }
        }

        public static char PrintSelected(List<string> currentQuestion, char userInput)
        {
            char numberOfCorrectAnswer = ' ';
            for (int i = 1; i < currentQuestion.Count - 2; i++)
            {
                if (i == userInput - 96)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine($"{(char)(i + 64)}. {currentQuestion[i].Replace("*", " ")}");
                    Console.ForegroundColor = ConsoleColor.White;
                }
                else Console.WriteLine($"{(char)(i + 64)}. {currentQuestion[i].Replace("*", " ")}");
                if (currentQuestion[i].Contains('*')) numberOfCorrectAnswer = (char)(i + 96);
            }
            return numberOfCorrectAnswer;
        }

        public static void PrintCorrectAnswer(List<string> currentQuestion, char userInput)
        {
            for (int i = 1; i < currentQuestion.Count - 2; i++)
            {
                if (i == userInput - 96 && !currentQuestion[i].Contains('*'))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"{(char)(i + 64)}. {currentQuestion[i].Replace("*", " ")}");
                    Console.ForegroundColor = ConsoleColor.White;
                }
                else if (currentQuestion[i].Contains('*'))
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine($"{(char)(i + 64)}. {currentQuestion[i].Replace("*", " ")}");
                    Console.ForegroundColor = ConsoleColor.White;
                }
                else Console.WriteLine($"{(char)(i + 64)}. {currentQuestion[i]}");
            }
        }

        public static void PrintHeader(int numberOfQuestion, List<string> currentQuestion, User user)
        {
            Console.Clear();
            Console.WriteLine("----------------------------------");
            Console.WriteLine($"Player: {user.FirstName} {user.LastName} \nMoney: {user.Points} $ \n");
            Helper.HelpsUsed(user);
            Console.WriteLine();

            Console.WriteLine($"Question number: {numberOfQuestion+1}\n");
            Console.WriteLine(currentQuestion[0]);
            Console.WriteLine("\n\n\n\n");
        }
    }
}
