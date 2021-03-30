using System;

namespace bonus_05
{
    class Program
    {
        static void Main(string[] args)
        {
            // 5.Write a program that will determine from a range of numbers(entered from the keyboard) the
            //  numbers where the sum of all least significant digits is equal to
            //  the most significant digit.
            //  example:
            //    start = 200
            //    end = 300
            //    Result: 202(2 = 0 + 2), 211(2 = 1 + 1), 220(2 = 2 + 0)

            Console.WriteLine("ENTER A RANGE OF ANY NUMBERS FROM/TO");

            int[] digits = new int[1];

            Console.WriteLine("Enter first number:");

            string firstNumberInput = Console.ReadLine();
            string firstNumberString = firstNumberInput;

            Console.WriteLine("Enter second number:");
            string secondNumberString = Console.ReadLine();

            int firstNumber = 0;
            int secondNumber = 0;

            bool firstIsNumber = int.TryParse(firstNumberString, out firstNumber);
            bool secondIsAlsoNumber = int.TryParse(secondNumberString, out secondNumber);


            if (firstIsNumber && secondIsAlsoNumber)
            {
                Array.Resize(ref digits, secondNumberString.Length);

                // "i" IS FIRST DIMENSIONAL
                // "g" IS SECOND DIMENSIONAL
                
              
                for (int i = firstNumber; i <= secondNumber; i++)
                {
                    int resultOfOtherDigits = 0;

                    //FILL THE ARRAY OF DIGITS WITH SEPARATE DIGITS FROM THE STRING
                    for (byte g = 0; g < firstNumberString.Length; g++)
                    {
                        digits[g] = int.Parse(firstNumberString.Substring(g, 1));
                    }

                    //RESULT IS ALL THE DIGITS BUT THE FIRST, SO "g" STARTS FROM INDEX 1;
                    for (byte g = 1; g < digits.Length; g++)
                    {
                        resultOfOtherDigits += digits[g];
                    }

                    // IF FIRST DIGIT OF DIGITS NUMBER IS EQUAL TO THE RESULT OF THE OTHER DIGITS, PRINT THE NUMBER
                    if (digits[0] == resultOfOtherDigits)
                    {
                        Console.Write(i + " = ");

                        //PRINT EVERY DIGIT OF THE NUMBER
                        for (byte g = 0; g < digits.Length; g++)
                        {
                            Console.Write(digits[g]);
                            if (g != digits.Length - 1) Console.Write(" + ");
                            else continue;
                        }

                        //MAKE NEW LINE, NOTHING ELSE
                        Console.WriteLine();
                    }

                    //THE NUMBER TO BE CHECKED INCREMENTS BY 1;
                    firstNumber++;

                    //THE NUMBER TO BE CHECKED IS THEN PARSED TO STRING SO TO BE SPLIT LATER
                    firstNumberString = $"{ firstNumber}";
                }
            }
            else
            {
                Console.WriteLine("please enter valid nuber");
            }
            Console.ReadLine();
        }
    }
}
