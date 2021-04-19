using AcademyAppLibrary.Models;
using AcademyAppServices.Models;
using AcademyAppLibrary.Enums;
using System;

namespace AcademyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Database database = new Database();

            //RANDOM STUDENT GENERATOR XOXOXO GENERATE MORE STUDENTS THAN PEOPLE ON EARTH OR MAYBE NOT
            // PANE OR KRISTINA SHOULD CHANGE THIS NUMBER TO GENERATE A WHOLE LOTTA PEOPLE, 
            int numberOf2StudentsRandomlyGenerated = 1; 

            for (int i = 0; i < numberOf2StudentsRandomlyGenerated; i++)
            {
                database.people.Add(PersonGenerator.Student(Gender.Male));
                database.people.Add(PersonGenerator.Student(Gender.Female));
            };

            while (true)
            {
                Console.Clear();
                Console.WriteLine("Hello to our academy!!!");
                Console.WriteLine("Input a number on the keyboard to login as, the login manager will recognize your account type:");
                Console.WriteLine("");
                Console.WriteLine(" 1) Login");
                Console.WriteLine(" 0) Exit program");
                char loginValue = Console.ReadKey().KeyChar;
                if (loginValue == '0') break;
                else if (loginValue == '1') Login.Person(database.people);
                else continue;
            }
        }
    }
}
