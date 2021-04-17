using System;
using System.Collections.Generic;
using System.Linq;

namespace HomeworkLinq
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Person> people = new List<Person>()
            {
            new Person("Bill", "Smith", 41, 'M'),
            new Person("Sarah", "Jones", 22, 'F'),
            new Person("Stacy","Baker", 21, 'F'),
            new Person("Vivianne","Dexter", 19, 'F' ),
            new Person("Bob","Smith", 49, 'M' ),
            new Person("Brett","Baker", 51, 'M' ),
            new Person("Mark","Parker", 19, 'M'),
            new Person("Alice","Thompson", 18, 'F'),
            new Person("Evelyn","Thompson", 58, 'F' ),
            new Person("Mort","Martin", 58, 'M'),
            new Person("Eugene","deLauter", 84, 'M' ),
            new Person("Gail","Dawson", 19, 'F' ),
            };
            Console.WriteLine("-----------LINQ EXERCISES-----------");
            Console.WriteLine("-------------------------");
            // Task 01
            // all people aged 50 or more
            List<Person> peopleAged50OrMore = people
                                                .Where(x => x.Age >= 50)
                                                .ToList();
            Console.WriteLine("all people aged 50 or more");
            Console.WriteLine("");
            peopleAged50OrMore.ForEach(x => Console.WriteLine($"{x.FirstName} {x.LastName}: Age {x.Age}"));
            Console.WriteLine("-------------------------");

            // Task 02
            // all people name starts with B
            List<string> nameStartsWithB = people
                                        .Where(x => x.FirstName.StartsWith("B"))
                                        .Select(x => x.FirstName)
                                        .ToList();

            Console.WriteLine("all people name starts with B");
            Console.WriteLine("");
            nameStartsWithB.ForEach(x => Console.WriteLine($"{x}"));
            Console.WriteLine("-------------------------");

            // Task 03
            // first person whose surname starts with T
            Person firstPersonThatSurnameStartsWithT = people
                                                        .Where(x => x.LastName.StartsWith("T"))
                                                        .FirstOrDefault();
            Console.WriteLine("first person whose surname starts with T");
            Console.WriteLine("");
            Console.WriteLine($"{firstPersonThatSurnameStartsWithT.FirstName} {firstPersonThatSurnameStartsWithT.LastName}");
            Console.WriteLine("-------------------------");

            // Task 04
            // find youngest and oldest person

            List<Person> youngestAndOldest = people
                                    .OrderBy(x => x.Age)
                                    .ToList();

            Console.WriteLine("find youngest and oldest person first way");
            Console.WriteLine($"{youngestAndOldest.FirstOrDefault().FirstName} is youngest and {youngestAndOldest.LastOrDefault().FirstName} is oldest");
            Console.WriteLine("");
            Console.WriteLine("-------------------------");

            int youngestAge = people
                                .Select(x => x.Age)
                                .Min();
            int oldestAge = people
                                .Select(x => x.Age)
                                .Max();
            Console.WriteLine("--------------------------------------------");
            Console.WriteLine("Age of youngest person is {0} and oldest person is {1}", youngestAge, oldestAge);
            Console.WriteLine("--------------------------------------------");

            Person youngest = people
                                .Where(x => x.Age == people.Select(x => x.Age)
                                .Min())
                                .FirstOrDefault();

            Person Oldest = people
                                .Where(x => x.Age == people.Select(x => x.Age)
                                .Max())
                                .FirstOrDefault();
            Console.WriteLine("Age of youngest person is {0} and oldest person is {1}", youngest.FirstName, Oldest.FirstName);

            Console.WriteLine("--------------------------------------------");
            Console.WriteLine("--------------------------------------------");



            // Task 05
            // find all male people aged 45 or more

            // Task 06
            // find all females whose name starts with V

            // Task 07
            // find last female person older than 30 whose name starts with p

            // Task 08
            // find first male younger than 40

            // Task 09
            // print the names of the male persons that have firstName longer than lastName

            // Task 10
            // print the lastNames of the female persons that have odd number of ages


            Console.ReadLine();
        }
    }
}
