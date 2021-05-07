using ConsoleE_Shop.Library.Core.Entities;
using ConsoleE_Shop.Library.Database;
using ConsoleE_Shop.Services;
using ConsoleE_Shop.Services.Navigation;
using System;

namespace ConsoleE_Shop.App
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.ForegroundColor = ConsoleColor.White;
            Console.Clear();           
            
            // 1. Create folder structure 
            // 2. Create interfaces, classes and enums BONUS the product itself has multiple properties!!!
            // 3. Create database
            // 4. Populate database
            // 5. Start creating app flow logic...         

            Navigation.MainMenu();





            Console.ReadLine();
        }
    }
}
