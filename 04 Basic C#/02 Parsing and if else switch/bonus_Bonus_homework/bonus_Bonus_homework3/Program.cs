using System;

namespace bonus_Bonus_homework3
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("EMPLOYEES ID GENERATOR");
            Console.WriteLine("Enter the first 7 digits of the employee's identification card ID number");
            
            string idCardIdString = Console.ReadLine();
            int idCardNumber = 0;

         


            if (idCardIdString.Length <= 7)
            {
                bool isValidNumber = int.TryParse(idCardIdString, out idCardNumber);
                if (isValidNumber)
                {

                    byte day = byte.Parse(idCardIdString.Substring(0, 2));
                    byte month = byte.Parse(idCardIdString.Substring(2, 2));
                    short year = short.Parse(idCardIdString.Substring(4, 3));
                    year += 1000;

                    int workerId = day * 100 + month * 1000 + year;

                    if (workerId >= 10000)
                    {
                        Console.WriteLine("Username number for worker ID " + idCardIdString + " is " + workerId);
                    }
                    else if (year <= 1960)
                    {
                        Console.WriteLine("Username number for worker ID " + idCardIdString + " is " + "7" + workerId);
                    }
                    else if (year <= 1980)
                    {
                        Console.WriteLine("Username number for worker ID " + idCardIdString + " is " + "8" + workerId);
                    }
                    else if (year <= 1999)
                    {
                        Console.WriteLine("Username number for worker ID " + idCardIdString + " is " + "9" + workerId);
                    }                           
                    else
                    {
                        Console.WriteLine("Something went wrong");
                    }
                }
                else
                {
                    Console.WriteLine("Please enter numbers in the field");
                }
            }
            else
            {
                Console.WriteLine("Please enter 7 characters");
            }
                Console.ReadLine();
        }
    }
}
