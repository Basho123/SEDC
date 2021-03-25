using System;

namespace task2
{
    class Program
    {
        static void Main(string[] args)
        {
            //Create new console application “AverageNumber” that takes four numbers as input to calculate and print the average.

            //Test Data:
            ///Enter the First number: 10
            ///Enter the Second number: 15
            ///Enter the third number: 20
            ///Enter the four number: 30
            //Expected Output:
            ///The average of 10, 15, 20 and 30 is: 18
            Console.BackgroundColor = ConsoleColor.Red;          
            Console.WriteLine("-------THE MOST AVERAGE OF AVERAGEST NUMBER FINDER------");
            Console.BackgroundColor = ConsoleColor.Black;

            double number1 = 0;
            double number2 = 0;
            double number3 = 0;
            double number4 = 0;

            Console.BackgroundColor = ConsoleColor.White;
            Console.ForegroundColor = ConsoleColor.Black;
            Console.WriteLine("Enter four numbers to check their most average sum");
            Console.BackgroundColor = ConsoleColor.Black;
            Console.ForegroundColor = ConsoleColor.White;

            Console.WriteLine("Enter the first number");
            bool checkFirstInput = double.TryParse(Console.ReadLine(), out number1);
            Console.WriteLine("Enter the second number");
            bool checkSecondInput = double.TryParse(Console.ReadLine(), out number2);
            Console.WriteLine("Enter the third number");
            bool checkThirdInput = double.TryParse(Console.ReadLine(), out number3);
            Console.WriteLine("Enter the fourth number");
            bool checkFourthInput = double.TryParse(Console.ReadLine(), out number4);
            if (checkFirstInput && checkSecondInput && checkThirdInput && checkFourthInput)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("The average sum of these four numbers is " + (number1 + number2 + number3 + number4) / 4);
                Console.ForegroundColor = ConsoleColor.White;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.BackgroundColor = ConsoleColor.Red;
                Console.WriteLine("Input numbers you maniac, you inputed something else somewhere");
                Console.ForegroundColor = ConsoleColor.White;
                Console.BackgroundColor = ConsoleColor.Black;
            }

            Console.ReadLine();
        }
    }
}
