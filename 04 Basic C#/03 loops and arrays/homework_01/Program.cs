using System;

namespace homework_01
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Black;
            Console.BackgroundColor = ConsoleColor.Gray;
            Console.Clear();

            Console.WriteLine("NAME SAVING APP");

            
            string[] names = new string[]
            {
                "Trajko",
                "Petko",
                "Stanko",
                "Mitko",
                "Pero",
                "Zoran",
                "Goran"
            };
        

            Console.WriteLine("---------------");
            Console.WriteLine("Current names in database");
            Console.ForegroundColor = ConsoleColor.White;
            Console.BackgroundColor = ConsoleColor.Black;
            foreach (string name in names)
            {
                Console.WriteLine(name);
            }
            Console.ForegroundColor = ConsoleColor.Black;
            Console.BackgroundColor = ConsoleColor.Gray;

            do
            {
                Console.WriteLine("---------------");
                while (true)
                {
                    Console.Write("ENTER A NAME: ");
                    string name = Console.ReadLine();
                    Array.Resize(ref names, names.Length + 1);
                    names[names.Length - 1] = name;

                    Console.WriteLine("DO YOU WANT TO ENTER ANOTHER NAME? Y/N ");

                    string confirm1 = Console.ReadLine();
                    if (confirm1 == "N" || confirm1 == "n") break;
                    else continue;
                }
                Console.WriteLine("---------------");
                Console.ForegroundColor = ConsoleColor.White;
                Console.BackgroundColor = ConsoleColor.Black;
                Console.WriteLine("Current names in database");
                foreach (string name in names)
                {
                    Console.WriteLine(name);
                }
                Console.ForegroundColor = ConsoleColor.Black;
                Console.BackgroundColor = ConsoleColor.Gray;

                Console.WriteLine("---------------------------");
                Console.WriteLine("DO YOU WISH TO ENTER ANOTHER YET ANOTHER NAME MAYBE IF YOU FORGOT SOMEONE? Y/N ");
                string confirm = Console.ReadLine();

                if (confirm == "Y" || confirm == "y") continue;
                else break;
            } while (true);  
        }
    }
}
