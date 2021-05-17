using System;
using System.Collections.Generic;
using System.Linq;
using Vezbi.Database;
using Vezbi.Entities;

namespace Vezba01
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Create an abstract class Animal and Dog, Cat and Bird classes inheriting it");
            //Get all dogs of a particular race
            List<Dog> dogsOfParticularRace = Database.dogs
                                                        .Where(x => x.Race == "particularRace")
                                                        .ToList();
            // Get the last lazy cat
            Cat getLastLazyCat = Database.cats.LastOrDefault(x => x.IsLazy);

            //Get the all wild birds that are younger than 3 and are ordered by their name
            List<Bird> birdsYoungerThan3 = Database.birds
                                                    .Where(x => x.Age < 3)
                                                    .OrderBy(x => x.Name)
                                                    .ToList();
            Console.ReadLine();
        }
    }
}
