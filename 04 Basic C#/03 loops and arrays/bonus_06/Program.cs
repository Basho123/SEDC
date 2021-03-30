using System;

namespace bonus_06
{
    class Program
    {
        static void Main(string[] args)
        {
            // 6. Write a program that will print all the numbers in a given range that are
            // read the same from left to right and right to left, ex. 12321 5061605

            Console.WriteLine("Enter a range of numbers from/to to check which of them is a palindrome");

            int number1 = 0;
            int number2 = 0;

            Console.WriteLine("Enter first number");
            string stringInput1 = Console.ReadLine();
            Console.WriteLine("Enter second number");
            string stringInput2 = Console.ReadLine();

            string stringNumber1 = stringInput1;
            string stringNumber2 = stringInput2;


            bool firstIsNumber = int.TryParse(stringNumber1, out number1);
            bool secondIsAlsoNumber = int.TryParse(stringNumber2, out number2);

            if (firstIsNumber && secondIsAlsoNumber && number1 < number2)
            {
                for (int i = number1; i < number2; i++)
                {
                    string numberToCompareString1 = "";
                    string numberToCompareString2 = "";
                    for (int g = 0; g < stringNumber1.Length; g++)
                    {
                        numberToCompareString1 += stringNumber1[g];                       
                    }           
                    for (int g = stringNumber1.Length-1; g >= 0; g--)
                    {
                        numberToCompareString2 += stringNumber1[g];
                    }                 

                    int numberToCompare1 = int.Parse(numberToCompareString1);
                    int numberToCompare2 = int.Parse(numberToCompareString2);

                    if(numberToCompare1 == numberToCompare2)
                    {
                        Console.WriteLine(number1 + " is palindrome");
                    }
                    number1++;
                    stringNumber1 = $"{number1}";
                }
            }
            else
            {
                Console.WriteLine("Please enter valid numbers");
            }
            Console.ReadLine();
        }
    }
}
