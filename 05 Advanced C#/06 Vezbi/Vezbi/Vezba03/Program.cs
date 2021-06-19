using System;
using System.Collections.Generic;
using Vezbi.Database;
using Vezbi.Entities;
using Vezba03.Helpers;

namespace Vezba03
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> listOfIntegers = new List<int>() { 1, 3, 4 };
            List<string> listOfStrings = new List<string>() { "abec", "dgds" };


            GenericHelper.PrintAnimals(Database.dogs);
            GenericHelper.PrintList(listOfIntegers);
            GenericHelper.PrintList(listOfStrings);

            Console.ReadLine();
        }


    }
}
