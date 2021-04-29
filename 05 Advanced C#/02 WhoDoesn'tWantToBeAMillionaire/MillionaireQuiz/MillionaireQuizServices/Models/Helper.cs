using MillionaireQuizLibrary;
using MillionaireQuizLibrary.Media;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace MillionaireQuizServices.Models
{
    public static class Helper
    {
        public static void FiftyFifty(List<string> currentQuestion, User user)
        {
            Sound.FiftyFiftyHelp().Play();
            user.TimesUsedHelp++;
            user.UsedFiftyFiftyHelp = true;

            string trueQuestion = "";
            string falseQuestion = "";

            for (int i = 1; i < currentQuestion.Count - 2; i++)
            {
                if (currentQuestion[i].Contains('*'))
                {
                    trueQuestion = $"{(char)(i + 64)}. {currentQuestion[i].Replace("*", " ")}";
                }
                else falseQuestion = $"{(char)(i + 64)}. {currentQuestion[i]}";
            }
            Console.WriteLine(trueQuestion);
            Console.WriteLine(falseQuestion);
        }
        public static void Audience(List<string> currentQuestion, int numberOfQuestion, User user)
        {
            Sound.AudienceHelp().Play();
            user.TimesUsedHelp++;
            user.UsedAudienceHelp = true;

            int correctAnswerChance = 100 - numberOfQuestion * 7; // 30% on level 10
            int allOtherAnswersChance = 1;

            int firstAnswerChance = 1;
            int secondAnswerChance = 1;
            int thirdAnswerChance = 1;


            allOtherAnswersChance = 100 - correctAnswerChance;

            firstAnswerChance = allOtherAnswersChance / 2;
            secondAnswerChance = firstAnswerChance / 4 + (firstAnswerChance / 5);
            thirdAnswerChance = firstAnswerChance / 2 + (firstAnswerChance / 7);

            List<int> probabilityPercentage = new List<int>()
            {
                    firstAnswerChance,
                    secondAnswerChance,
                    thirdAnswerChance,
            };
            int probabilityPercentageListCounter = 0;

            List<string> questions = new List<string>();


            for (int i = 1; i < currentQuestion.Count - 2; i++)
            {
                if (currentQuestion[i].Contains('*'))
                {
                    questions.Add($"{(char)(i + 64)}. {currentQuestion[i].Replace("*", " ")} {correctAnswerChance}%");
                }
                else
                {
                    questions.Add($"{(char)(i + 64)}. {currentQuestion[i]} {probabilityPercentage[probabilityPercentageListCounter]}%");
                    probabilityPercentageListCounter++;
                }
            }
            Console.WriteLine($"Asking the audience, {currentQuestion[0]}");
            Console.WriteLine();
            questions.ForEach(x => Console.WriteLine(x));
        }
        public static void Friend(List<string> currentQuestion, int numberOfQuestion, User user)
        {

            Sound.AudienceHelp().Play();
            user.TimesUsedHelp++;
            user.UsedPhoneHelp = true;

            int correctAnswerChance = 100 - numberOfQuestion * 7; // 30% on level 10        

            char friendAnswerIsRight = ' ';
            char friendAnswerIsWrong = ' ';

            for (int i = 1; i < currentQuestion.Count - 2; i++)
            {
                if (currentQuestion[i].Contains('*')) friendAnswerIsRight = (char)(i + 64);
                else friendAnswerIsWrong = (char)(i + 64);
            }
            Console.WriteLine("...");
            Console.WriteLine($"Asking the friend, {currentQuestion[0]}");
            Console.WriteLine("...");
            Console.WriteLine("...");
            Console.WriteLine("...");

            Random random = new Random();

            Console.WriteLine(correctAnswerChance > random.Next(0, 100) ? $"Friend says {friendAnswerIsRight}." : $"Friend says {friendAnswerIsWrong}.");
            Console.WriteLine("...");
            Console.WriteLine("How sure are you?");
            Console.WriteLine("...");
            Console.WriteLine("...");
            Console.WriteLine($"Friend says {correctAnswerChance} percent");
            Console.WriteLine("...");
        }
        public static void HelpsUsed(User user)
        {
            Console.ForegroundColor = user.UsedFiftyFiftyHelp ? ConsoleColor.DarkYellow : ConsoleColor.Yellow;
            Console.WriteLine("5. 50/50");
            Console.ForegroundColor = ConsoleColor.White;

            Console.ForegroundColor = user.UsedPhoneHelp ? ConsoleColor.DarkYellow : ConsoleColor.Yellow;
            Console.WriteLine("6. Call a friend");
            Console.ForegroundColor = ConsoleColor.White;

            Console.ForegroundColor = user.UsedAudienceHelp ? ConsoleColor.DarkYellow : ConsoleColor.Yellow;
            Console.WriteLine("7. Ask the audience");
            Console.ForegroundColor = ConsoleColor.White;
        }
    }
}
