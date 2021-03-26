using System;

namespace Bonus_Homework
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.BackgroundColor = ConsoleColor.Gray;
            Console.ForegroundColor = ConsoleColor.Black;
            Console.Clear();

            Console.BackgroundColor = ConsoleColor.Black;
            Console.ForegroundColor = ConsoleColor.Yellow;
            // write a program to check student grades for given input of exam  points
            Console.WriteLine("CALCULATE THE GRADE FOR STUDENT FOR GIVEN EXAM POINTS");
            Console.BackgroundColor = ConsoleColor.Gray;
            Console.ForegroundColor = ConsoleColor.Black;

            Console.BackgroundColor = ConsoleColor.Black;
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("type EXIT to exit program");
            Console.WriteLine("");
            Console.BackgroundColor = ConsoleColor.Gray;
            Console.ForegroundColor = ConsoleColor.Black;

            byte grade = 0;
            byte points = 0;
            byte students = 0;
            byte numberOfStudents = 0;
            char sign = ' ';
            bool canPrint = true;

            Console.BackgroundColor = ConsoleColor.Green;
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("INPUT THE NUMBER OF STUDENTS: ");
            Console.BackgroundColor = ConsoleColor.Gray;
            Console.ForegroundColor = ConsoleColor.Black;

            bool isValidNumberOfStudents = byte.TryParse(Console.ReadLine(), out numberOfStudents);

            if (isValidNumberOfStudents)
            {
                for (byte i = 1; i <= numberOfStudents; i++)
                {
                    Console.BackgroundColor = ConsoleColor.Yellow;
                    Console.ForegroundColor = ConsoleColor.Black;
                    Console.WriteLine("Input the number of points for student number " + i + " of " + numberOfStudents + " students");
                    Console.BackgroundColor = ConsoleColor.Black;
                    Console.ForegroundColor = ConsoleColor.White;
                    string numberInputed = Console.ReadLine();
                    Console.BackgroundColor = ConsoleColor.Gray;
                    Console.ForegroundColor = ConsoleColor.Black;
                    string lastNumberString = numberInputed.Substring(numberInputed.Length - 1);

                    if(numberInputed == "EXIT")
                    {
                        return;                      
                    }

                    bool isValidNumberOfPoints = byte.TryParse(numberInputed, out points);
                    if (isValidNumberOfPoints)
                    {
                        if (points < 0 || points > 100)
                        {
                            canPrint = false;                           
                        }
                        else if (points >= 91)
                        {
                            grade = 10;
                        }
                        else if (points >= 81)
                        {
                            grade = 9;
                        }
                        else if (points >= 71)
                        {
                            grade = 8;
                        }
                        else if (points >= 61)
                        {
                            grade = 7;
                        }
                        else if (points >= 51)
                        {
                            grade = 6;
                        }
                        else
                        {
                            grade = 5;
                        }
                    }
                    else
                    {
                        canPrint = false;
                    }

                    if (canPrint)
                    {
                        byte lastNumber = byte.Parse(lastNumberString);
                        if (points > 50)
                        {
                            if (lastNumber >= 1 && lastNumber <= 3)
                            {
                                sign = '-';
                            }
                            else if (lastNumber >= 8 && lastNumber <= 9 || lastNumber == 0)
                            {
                                sign = '+';
                            }
                            else
                            {
                                sign = ' ';
                            }
                        }
                        else
                        {
                            sign = ' ';
                        }

                        Console.BackgroundColor = ConsoleColor.Black;
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("██████████████████████████");
                        Console.Write("█ ");
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.Write("Student " + i + " grade is " + grade + "" + sign);
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine(" █");
                        Console.WriteLine("██████████████████████████");
                        Console.BackgroundColor = ConsoleColor.Gray;
                        Console.ForegroundColor = ConsoleColor.Black;

                    }
                    else
                    {
                        Console.BackgroundColor = ConsoleColor.Red;
                        Console.ForegroundColor = ConsoleColor.Black;
                        Console.WriteLine("PLEASE ENTER A VALID NUMBER FROM 0 TO 100!!!");
                        Console.BackgroundColor = ConsoleColor.Gray;
                        Console.ForegroundColor = ConsoleColor.Black;
                        canPrint = true;
                        i -= 1;
                    }
                }
                
            }
            else
            {
                Console.BackgroundColor = ConsoleColor.Red;
                Console.ForegroundColor = ConsoleColor.Black;
                Console.WriteLine("Please enter a valid character!!!");
                Console.BackgroundColor = ConsoleColor.Gray;
                Console.ForegroundColor = ConsoleColor.Black;
            }

            Console.ReadLine();   
        }
    }
}
