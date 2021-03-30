using System;

namespace bonus_03
{
    class Program
    {
        static void Main(string[] args)
        {
            //Write a program to calculate y = x ^ n 
            Console.WriteLine("program for calculating power of a number");

            int number = 0;
            int powerNumber = 0;

            double result = 1;

            Console.WriteLine("Please enter number to be calculated");
            bool firstIsNumber = int.TryParse(Console.ReadLine(), out number);
            Console.WriteLine("Please enter the power of the number to be calculated");
            bool secondIsAlsoNumber = int.TryParse(Console.ReadLine(), out powerNumber);

            if (firstIsNumber && secondIsAlsoNumber)
            {
               for(int i = 1; i <= powerNumber; i++)
                {
                    result *= number;
                }
            }
            else Console.WriteLine("Please enter valid number");

            Console.WriteLine("Result is "+ result);

            Console.ReadLine();            
        }
    }
}
