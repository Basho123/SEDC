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

            GenericHelper.PrintAnimals(Database.dogs);

            Console.ReadLine();

        }


    }
}
