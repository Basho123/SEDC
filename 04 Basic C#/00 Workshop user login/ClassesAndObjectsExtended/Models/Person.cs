using System;
using System.Collections.Generic;
using System.Text;

namespace ClassesAndObjectsExtended.Models
{
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }

        // default constructor - no parameters
        public Person()
        {
        }

        //properties
        public Person(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
            FullName = $"{firstName} {lastName}";
        }
        // second constructor with parameters


        // methods
        public string PersonInfo()
        {
            return $"The person is {FullName}";
        }

    }
}
