using System;
using System.Collections.Generic;
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

            List<int> lista = new List<int>
            {
                1,2,3,4,5,6,7
            };

            Console.WriteLine("With Vanilla");
            lista.GetNFromList(7).ForEach(x => Console.WriteLine(x));
            Console.WriteLine("With LINQ");
            lista.GetNFromListLinq(7).ForEach(x => Console.WriteLine(x));



            Console.ReadLine();
        }
    }
}
