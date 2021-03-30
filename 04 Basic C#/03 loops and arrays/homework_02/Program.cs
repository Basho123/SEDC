using System;

namespace homework_02
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("SumOfEven");
            //Make a console application called SumOfEven.
            //Inside it create an array of 6 integers.
            //Get numbers from the input, find and print the sum of the even numbers from the array:
            int[] integers = new int[6];
            int sum = 0;

            Console.WriteLine("Enter 6 numbers to find the sum of the even numbers");
            for (byte i = 0; i < integers.Length; i++)
            {

                Console.WriteLine("-----------------------");
                Console.WriteLine("Enter integer "+ (i+1));
                bool isValidNumber = int.TryParse(Console.ReadLine(), out integers[i]);
                if (isValidNumber)
                {
                    if (integers[i] % 2 == 0) sum += integers[i];
                    else continue;
                }
                else
                {
                    Console.WriteLine("Please enter a valid number");
                    i--;
                    continue;
                }
            }
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.WriteLine("The sum of all even numbers is " + sum);
            Console.ForegroundColor = ConsoleColor.White;
            Console.BackgroundColor = ConsoleColor.Black;
            Console.ReadLine();
        }
    }
}
