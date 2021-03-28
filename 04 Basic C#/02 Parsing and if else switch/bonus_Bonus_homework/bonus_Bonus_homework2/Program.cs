using System;

namespace bonus_Bonus_homework2
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("EXXXTRA DATE ULTRA-VALIDATOR");
            Console.WriteLine();
            Console.WriteLine("Enter the date to be validated in the format DD MM YYYY format");

            string[] monthNames = {"","January","Febuary", "March", "April", "May", "June","July","August","September","October","November","December"};

            string dateString = Console.ReadLine();
            if (dateString.Length >9)
            {
                string daysString = dateString.Substring(0, 2);
                string monthsString = dateString.Substring(3, 2);
                string yearsString = dateString.Substring(6, 4);


                byte days = 0;
                byte months = 0;
                short years = 0;



                bool daysAreNumbers = byte.TryParse(daysString, out days);
                bool monthsAreNumbers = byte.TryParse(monthsString, out months);
                bool yearsAreNumbers = short.TryParse(yearsString, out years);
                Console.Write(days);
                Console.Write(" "+ monthNames[months]);
                Console.WriteLine(" "+years);

                if (daysAreNumbers && monthsAreNumbers && yearsAreNumbers)
                {
                    switch (months)
                    {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12:
                            if (days < 1 || days > 31)
                            {
                                Console.WriteLine("Not a valid number of days for this month");
                            }
                            else
                            {
                                Console.WriteLine("Days are OK");
                            }
                            break;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            if (days < 1 || days > 30)
                            {
                                Console.WriteLine("Not a valid number of days for this month");
                            }
                            else
                            {
                                Console.WriteLine("Days are OK");
                            }
                            break;
                     
                        case 2:
                           if (years % 400 == 0 || years % 4 == 0 && years % 100 != 0)
                            {
                                if (days >= 1 && days <= 29)
                                {
                                    Console.WriteLine("This is a leap year and days are OK ");
                                }
                                else
                                {
                                    Console.WriteLine("Invalid number in leap year for February");
                                }
                            }
                            else if (years % 400 != 0 || years % 4 != 0 && years % 100 == 0)
                            {
                                if (days >= 1 && days <= 29)
                                {
                                    Console.WriteLine("This is NOT a leap year and days are OK ");
                                }
                                else
                                {
                                    Console.WriteLine("Invalid number in non-leap year for February");
                                }
                            }
                           else
                            {
                                Console.WriteLine("Not a valid number for days of month");
                            }
                           
                            break;
                        default:
                            {
                                Console.WriteLine("Enter a valid number for month");
                            }
                            break;
                    }     
                }
                else
                {
                    Console.WriteLine("Please enter numbers for the checking");
                }
            }
            else
            {
                Console.WriteLine("Input a date in the current DD MM YYYY format");
            }     
            Console.ReadLine();
        }
    }
}
