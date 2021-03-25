using System;

namespace task3
{
    class Program
    {
        static void Main(string[] args)
        {

            //Create new console application “SwapNumbers”. Input 2 numbers from the console and then swap the values of the variables so 
            //that the first variable has the second value and the second variable the first value. Please find example below:
            //Test Data:
            ///Input the First Number: 5
            ///Input the Second Number: 8
            ///Expected Output:
            ///After Swapping:
            ///First Number: 8
            ///Second Number: 5
            ///
     

            Console.BackgroundColor = ConsoleColor.Blue;
            Console.ForegroundColor = ConsoleColor.White;
            Console.Clear();          


            Console.BackgroundColor = ConsoleColor.Yellow;
            Console.ForegroundColor = ConsoleColor.Blue;           
            Console.WriteLine("THE SUPER NUMBER SWAPPER");
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.ForegroundColor = ConsoleColor.White;

            int number1 = 0;
            int number2 = 0;
            int swapNumbers = 0;

            Console.WriteLine("Please enter first NUMBER");
            bool parseFirst = int.TryParse(Console.ReadLine(), out number1);
            Console.WriteLine("Please enter second NUMBER");
            bool parseSecond = int.TryParse(Console.ReadLine(), out number2);

            if (parseFirst && parseSecond)
            {
                Console.WriteLine("█████████████████████████");
                Console.WriteLine("");
                Console.WriteLine("The variables now have the value of:");
                Console.WriteLine("int number1 = " + number1);
                Console.WriteLine("int number2 = " + number2);
                Console.WriteLine("");
                Console.WriteLine("█████████");
                Console.WriteLine("█████████████████");
                Console.WriteLine("█████████████████████████");
                Console.WriteLine("");
                swapNumbers = number2;
                number2 = number1;
                number1 = swapNumbers;
                Console.WriteLine("The variables after switching now have the value of:");
                Console.WriteLine("int number1 = " + number1);
                Console.WriteLine("int number2 = " + number2);
                Console.WriteLine("_________________________");

            }
            else
            {
                Console.BackgroundColor = ConsoleColor.Gray;
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Please enter valid numbers!!");
                Console.BackgroundColor = ConsoleColor.Blue;
                Console.ForegroundColor = ConsoleColor.White;
            }
            Console.ReadLine();
        }
    }
}
