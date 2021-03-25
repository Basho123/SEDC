using System;

namespace task4
{
    class Program
    {
        static void Main(string[] args)
        {
            // Write a program, where for a given number entered via the keyboard, it will print:
            ///  "Tik" if divisible by 3,
            ///  "Tak" if divisible by 5,
            ///  "Tik - Tak" if divisible by 3 and 5.
            //  If the number is not divisible by 3 or 5, then print "Bad number".
            Console.BackgroundColor = ConsoleColor.DarkGreen;
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.Clear();

            Console.WriteLine("TIK TAK TIK TAK");

            int number = 0;

            Console.WriteLine("Enter a number to check if it is divisible by 3 or 5 or 3 and 5,\nand it will return some TIK TAK's ");
            bool parseCheck = int.TryParse(Console.ReadLine(), out number);
            if (parseCheck)
            {
                if (number % 3 == 0)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.Write("Tik");
                    if (number % 5 == 0)
                    {
                        Console.ForegroundColor = ConsoleColor.Blue;
                        Console.Write(" - Tak");
                    }
                }
                else if (number % 5 == 0)
                {
                    Console.ForegroundColor = ConsoleColor.Blue;
                    Console.WriteLine("Tak");
                }
                else
                {
                    Console.BackgroundColor = ConsoleColor.DarkMagenta;
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.Write("Number is not divisible by 3 or 5");
                }
            }
            else
            {
                Console.BackgroundColor = ConsoleColor.DarkCyan;
                Console.ForegroundColor = ConsoleColor.Red;
                Console.Write("Please enter valid number!!!");
            }

            Console.ReadLine();
        }
    }
}
