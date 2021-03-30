using System;

namespace homework_03
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("studentGroupApp");
            string[] studentsG1 = new string[]
            {
                "Vojdan",
                "Mateo",
                "Luka",
                "Ivor",
                "Sinadin",
            };

            string[] studentsG2 = new string[]
            {
                "Srna",
                "Ana-Marija",
                "Klarisa",
                "Malena",
                "Elisaveta"
            };

            bool isRepeating = true;
            do
            {
                Console.WriteLine("-------------------");
                Console.WriteLine("Enter 1 or 2 to see which students are in G1 or G2, type Q to quit");
                switch (Console.ReadLine())
                {
                    case "1":
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.BackgroundColor = ConsoleColor.Blue;
                        Console.WriteLine("-------------------");
                        Console.WriteLine("Students in G1 are: ");
                        foreach (string student in studentsG1){
                            Console.WriteLine(student);
                        }
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.BackgroundColor = ConsoleColor.Black;
                        break;

                    case "2":
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.BackgroundColor = ConsoleColor.Red;
                        Console.WriteLine("-------------------");
                        Console.WriteLine("Students in G2 are: ");
                        foreach (string student in studentsG2)
                        {
                            Console.WriteLine(student);
                        }
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.BackgroundColor = ConsoleColor.Black;
                        break;

                    case "q":
                    case "Q":
                        isRepeating = false;
                        break;
                    default:
                        isRepeating = true;
                        continue;
                } 
            }while (isRepeating);
        }
    }
}
