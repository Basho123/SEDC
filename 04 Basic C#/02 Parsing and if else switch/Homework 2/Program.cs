using System;

namespace task1
{
    class Program
    {
        static void Main(string[] args)
        {
            //Create new console application “RealCalculator” that takes two numbers from the input and asks what operation 
            //would the user want to be done(+, - , * , / ).Then it returns the result.
            //
            Console.ForegroundColor = ConsoleColor.Black;
            Console.BackgroundColor = ConsoleColor.White;
            Console.WriteLine("-------ATOMIC MULTIDIMENSIONAL UBER CALCULATOR--------");
            Console.ForegroundColor = ConsoleColor.White;
            Console.BackgroundColor = ConsoleColor.Black;

            int firstNumber = 0;
            int secondNumber = 0;           
            char operand;
            int result = 0;

            bool operation = true;
            Console.WriteLine("Enter the first number");
            bool parseFirstInput = int.TryParse(Console.ReadLine(), out firstNumber);
            if (parseFirstInput == true)
            {
                Console.WriteLine("Enter the second number");
                bool parseSecondtInput = int.TryParse(Console.ReadLine(), out secondNumber);
                if(parseSecondtInput == true)
                {
                    Console.WriteLine("Enter the operand to calculate the numbers");
                    bool parseThirdInput = char.TryParse(Console.ReadLine(), out operand);
                    if(parseThirdInput == true)
                    {
                        switch (operand)
                        {
                            case '+' :
                                result = firstNumber + secondNumber;
                                break;
                            case '-':
                                result = firstNumber - secondNumber;
                                break;
                            case '/':
                                result = firstNumber / secondNumber;
                                break;
                            case '*':
                                result = firstNumber * secondNumber;
                                break;
                            case '%':
                                result = firstNumber % secondNumber;
                                break;
                            default:
                                operation = false;
                                Console.WriteLine("Please enter valid operator, one of these: [*] [/] [+] [-] [%]");
                                break;
                        }     
                        if (operation == true)
                        {
                            Console.ForegroundColor = ConsoleColor.Black;
                            Console.BackgroundColor = ConsoleColor.Green;
                            Console.WriteLine("The result is " + result + ".");
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.BackgroundColor = ConsoleColor.Black;
                        }
                        else
                        {
                            Console.ForegroundColor = ConsoleColor.Black;
                            Console.BackgroundColor = ConsoleColor.Red;
                            Console.WriteLine("Operation failed");
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.BackgroundColor = ConsoleColor.Black;
                        }
                    }
                    else
                    {
                        Console.WriteLine("Please single char, and it should be an operator, one of these: [*] [/] [+] [-] [%]");
                    }
                }
                else
                {
                    Console.WriteLine("Input a number!");
                }
            }
            else
            {
                Console.WriteLine("Input a number!");
            }              

            Console.ReadLine();
        }
    }
}
