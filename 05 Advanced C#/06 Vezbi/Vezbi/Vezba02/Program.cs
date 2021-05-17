using System;
using Vezba02.Helpers;

namespace Vezba02
{
    class Program
    {
        static void Main(string[] args)
        {
            //Create extension methods:
            int hehe = 25;
            string someWord = "LoremIpsumDolorSitAmet";
            Console.WriteLine($"is hehe even? {hehe.IsEven()}");
            Console.WriteLine($"First character of a given string: {someWord.GetFirstLetter()}");
            Console.WriteLine($"Last character of a given string: {someWord.GetLastLetter()}");
            Console.ReadLine();
        }
    }
}
