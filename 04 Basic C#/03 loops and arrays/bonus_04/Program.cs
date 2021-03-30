using System;

namespace bonus_04
{
    class Program
    {
        static void Main(string[] args)
        {

            //  4.Write a program that will determine from n numbers(entered from the keyboard)
            //  the number of numbers that are divisible by 3, when divided by 3 have a remainder of 1,
            //  when divided by 3 have a remainder of 2.
            Console.WriteLine("ENTER FEW NUMBERS TO CHECK SOMETHING, I PROMISE IT WON'T HURT!");
            Console.WriteLine("-------------------------------------------------------------");
            Console.WriteLine("when you are done entering numbers, press Q");


            int numbersWithRemainder0 = 0;
            int numbersWithRemainder1 = 0;
            int numbersWithRemainder2 = 0;

            //LOOP WITH A VERY VERY LONG COUNTER
            for (ulong i = 0; i >= 0; i++)
            {
                int numberToCheck = 0;

                Console.WriteLine("ENTER NUMBER " + (i + 1));

                string stringToBeConverted = Console.ReadLine(); 
                bool isNumber = int.TryParse(stringToBeConverted, out numberToCheck);

                Console.BackgroundColor = ConsoleColor.Red;
                Console.ForegroundColor = ConsoleColor.Black;
                if (i % 10 == 0) Console.WriteLine("just a reminder, press Q to stop entering numbers");
                Console.BackgroundColor = ConsoleColor.Black;
                Console.ForegroundColor = ConsoleColor.White;

                if (isNumber)
                {
                    if (numberToCheck % 3 == 0) numbersWithRemainder0++;
                    else if (numberToCheck % 3 == 1) numbersWithRemainder1++;
                    else if (numberToCheck % 3 == 2) numbersWithRemainder2++;
                    else continue;
                }
                else if(stringToBeConverted == "Q" || stringToBeConverted == "q")
                {
                    break;
                }
                else 
                {
                    i--;
                    Console.WriteLine("please enter valid number");
                }
            }

            Console.BackgroundColor = ConsoleColor.Yellow;
            Console.ForegroundColor = ConsoleColor.Black;
            Console.WriteLine("Number of numbers that have remainder of 0: " + numbersWithRemainder0);
            Console.WriteLine("Number of numbers that have remainder of 1: " + numbersWithRemainder1);
            Console.WriteLine("Number of numbers that have remainder of 2: " + numbersWithRemainder2);
            Console.BackgroundColor = ConsoleColor.Black;
            Console.ForegroundColor = ConsoleColor.White;

            Console.ReadLine();
        }
    }
}
