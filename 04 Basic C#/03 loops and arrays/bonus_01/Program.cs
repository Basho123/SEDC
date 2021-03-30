using System;

namespace bonus_01
{
    class Program
    {
        static void Main(string[] args)
        {
            // 1.Write a program to calculate the sum of all two - digit pairs numbers.
            // The resulting amount is printed on a screen.
            byte[] arrayOfNumbers = new byte[1];
            int result = 0;

            while (true)
            {
                Console.WriteLine("Enter 2 digit number, to end entering numbers, type Q");
                string digitEntered = Console.ReadLine();

                if (digitEntered.Length == 2)
                {
                    bool isNumber = byte.TryParse(digitEntered, out arrayOfNumbers[arrayOfNumbers.Length - 1]);
                    if (isNumber)
                    {
                        result += arrayOfNumbers[arrayOfNumbers.Length - 1];

                        Console.Write("CURRENT NUMBERS ARE: ");
                        foreach (byte number in arrayOfNumbers)
                        {
                            Console.Write(number + ", ");
                        }

                        Array.Resize(ref arrayOfNumbers, arrayOfNumbers.Length + 1);

                        Console.WriteLine();
                        Console.WriteLine("-----------------------");
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.BackgroundColor = ConsoleColor.Red;
                        Console.WriteLine("PLEASE ENTER NUMBERS!!!");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.BackgroundColor = ConsoleColor.Black;
                    }
                }
                else if (digitEntered == "Q" || digitEntered == "q") break;
                else
                {
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.BackgroundColor = ConsoleColor.Red;
                    Console.WriteLine("Please enter 2 digit number");
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.BackgroundColor = ConsoleColor.Black;
                }
            }
            Console.WriteLine("------------------------------");
            Console.WriteLine("The result is "+ result);
            Console.ReadLine();
        }
    }
}
