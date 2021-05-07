using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleE_Shop.Services
{
    public static class Assets
    {
        public static char PressAnyKey() => Console.ReadKey(true).KeyChar;     
        public static char PressAnyKey(string placeHolder)
        {
            Console.WriteLine(placeHolder);
            return Console.ReadKey(true).KeyChar;
        }
    }
}
