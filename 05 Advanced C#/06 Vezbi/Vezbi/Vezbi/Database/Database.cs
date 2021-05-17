using System;
using System.Collections.Generic;
using System.Text;
using Vezbi.Entities;

namespace Vezbi.Database
{
    public static class Database
    {
        static public List<Cat> cats = new List<Cat>()
        {
            new Cat("Tom", 3, "Blue", false),
            new Cat("Garfield", 2, "Orange", true),
            new Cat("Majlo", 5, "Black", false)
        };

        static public List<Dog> dogs = new List<Dog>()
        {
            new Dog("Sharko", 5, "Red", "Sharplaninec"),
            new Dog("Sasho", 6, "Green", "Chernobilski Terier"),
            new Dog("Dzuko", 3, "Blue", "Pit-Bull Terier")
        };

        static public List<Bird> birds = new List<Bird>()
        {
            new Bird("Skolovrancice", 5, "Red", true),
            new Bird("Vrapce", 6, "Purple", true),
            new Bird("Papagalce", 2, "Blue", false)
        };


    }
}
