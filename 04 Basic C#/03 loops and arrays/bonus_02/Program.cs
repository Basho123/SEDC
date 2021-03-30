using System;

namespace bonus_02
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            //Write a program to calculate the sum of all odd
            //two - digit numbers.The program prints the amount on the screen in the
            //format: 11 + 13 + 15 + 17 + ... +97 + 99 = 2475

            byte[] arrayOfNumbers = new byte[1];
            int result = 0;

            while (true)
            {
                Console.WriteLine("Enter 2 digit number, to end entering numbers and show the result of all ODD numbers you have entered, type Q");
                string digitEntered = Console.ReadLine();

                if (digitEntered.Length == 2)
                {
                    byte twoDigitNumber = 00;
                    bool isNumber = byte.TryParse(digitEntered, out twoDigitNumber);
                    if (isNumber)
                    {
                        if(twoDigitNumber % 2 != 0)
                        {
                            arrayOfNumbers[arrayOfNumbers.Length - 1] = twoDigitNumber;
                            result += twoDigitNumber;
                        }
                        else
                        {
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.BackgroundColor = ConsoleColor.Blue;
                            Console.WriteLine("THIS NUMBER WILL NOT BE CALCULATED IN THE FINAL RESULT!");
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.BackgroundColor = ConsoleColor.Black;
                            continue;
                        }

                        Console.ForegroundColor = ConsoleColor.White;
                        Console.BackgroundColor = ConsoleColor.DarkGreen;
                        Console.Write("VALID NUMBERS FOR THE EQUATION UNTILL NOW ARE: ");                     
                        foreach (byte number in arrayOfNumbers)
                        {
                            Console.Write(number + ", ");
                        }
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.BackgroundColor = ConsoleColor.Black;

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
          
            Console.ForegroundColor = ConsoleColor.Black;
            Console.BackgroundColor = ConsoleColor.Yellow;
            Console.Write("The result is:");
            for (byte i = 0; i <arrayOfNumbers.Length-1;i++)
            {
                Console.Write(" "+ arrayOfNumbers[i] + " ");
                if (i != arrayOfNumbers.Length - 2) Console.Write("+");
                else continue;
            }         
            Console.Write("= " + result);
            Console.ForegroundColor = ConsoleColor.White;
            Console.BackgroundColor = ConsoleColor.Black;
            Console.ReadLine();
        }
    }
}
