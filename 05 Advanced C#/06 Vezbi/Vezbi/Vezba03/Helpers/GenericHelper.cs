using System;
using System.Collections.Generic;
using System.Text;
using Vezbi.Entities;

namespace Vezba03.Helpers
{
    public static class GenericHelper
    {
        public static void PrintList<T>(this List<T> items)
        {
            items.ForEach(x => Console.WriteLine(x));
        }
        public static void PrintAnimals<T>(this List<T> items) where T : Animal
        {
            items.ForEach(x => x.Print());
        }
    }
}
